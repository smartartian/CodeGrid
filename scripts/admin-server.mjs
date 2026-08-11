// CodeGrid 本地管理后台服务器
// 零依赖（Node 内置 http），仅绑定 127.0.0.1，安全只限本机
// 用法：npm run admin   → 打开 http://localhost:4000
import { createServer } from "node:http";
import { readFile, readdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { parseFrontmatter } from "../src/lib/parse-post.js";

const exec = promisify(execFile);
const HOST = "127.0.0.1";
const PORT = 4000;
const POSTS_DIR = path.resolve("content/posts");
const ADMIN_HTML = path.resolve("scripts/admin.html");

async function listPosts() {
  const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".md"));
  return Promise.all(
    files.map(async (f) => {
      const raw = await readFile(path.join(POSTS_DIR, f), "utf8");
      const parsed = parseFrontmatter(raw);
      return {
        id: f.replace(/\.md$/, ""),
        title: parsed?.meta?.title || f,
        date: parsed?.meta?.date || "",
        category: parsed?.meta?.category || "",
        tags: parsed?.meta?.tags || "",
        summary: parsed?.meta?.summary || "",
      };
    }),
  );
}

async function runBuild() {
  try {
    const { stdout, stderr } = await exec("npm", ["run", "build"]);
    return { ok: true, message: (stdout + stderr).slice(-400) };
  } catch (err) {
    return { ok: false, error: String(err.stderr || err.message).slice(-400) };
  }
}

async function gitPush(commitMsg) {
  try {
    // 后台只管理文章相关文件，避免误提交其他改动
    await exec("git", ["add", "content/posts", "public/covers", "public/feed.xml"]);
    await exec("git", ["commit", "-m", commitMsg]);
    await exec("git", ["push"]);
    return { ok: true, message: "已提交并推送到远程仓库" };
  } catch (err) {
    // 无改动时 commit 会失败，这是正常情况
    if (String(err.stderr || err.message).includes("nothing to commit")) {
      return { ok: true, message: "没有需要推送的改动" };
    }
    return { ok: false, message: String(err.stderr || err.message).slice(0, 500) };
  }
}

function sendJson(res, code, data) {
  const body = JSON.stringify(data);
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(body);
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  const { pathname } = url;

  try {
    // 后台页面
    if (pathname === "/" || pathname === "/admin") {
      const html = await readFile(ADMIN_HTML, "utf8");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
      return;
    }

    // API
    if (pathname === "/api/posts" && req.method === "GET") {
      sendJson(res, 200, { posts: await listPosts() });
      return;
    }

    if (pathname === "/api/posts" && req.method === "POST") {
      const { id, content } = JSON.parse(await readBody(req));
      if (!/^[a-z0-9\u4e00-\u9fa5-]{1,60}$/.test(id)) {
        sendJson(res, 400, { error: "文章 id 不合法（仅字母数字中文和连字符）" });
        return;
      }
      const file = path.join(POSTS_DIR, `${id}.md`);
      await writeFile(file, content, { flag: "wx" });
      sendJson(res, 201, { ok: true });
      return;
    }

    const m = pathname.match(/^\/api\/posts\/([^/]+)$/);
    if (m) {
      const id = decodeURIComponent(m[1]);
      const file = path.join(POSTS_DIR, `${id}.md`);
      if (req.method === "GET") {
        const content = await readFile(file, "utf8");
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(content);
        return;
      }
      if (req.method === "PUT") {
        const { content } = JSON.parse(await readBody(req));
        await writeFile(file, content);
        sendJson(res, 200, { ok: true });
        return;
      }
      if (req.method === "DELETE") {
        await rm(file, { force: true });
        sendJson(res, 200, { ok: true });
        return;
      }
    }

    if (pathname === "/api/push" && req.method === "POST") {
      const { message, build } = JSON.parse(await readBody(req));
      if (build) {
        const { buildResult } = await runBuild();
        if (!buildResult) {
          sendJson(res, 500, { error: "构建失败，已取消推送，请检查内容" });
          return;
        }
      }
      sendJson(res, 200, await gitPush(message || "docs: 更新文章"));
      return;
    }

    if (pathname === "/api/build" && req.method === "POST") {
      sendJson(res, 200, await runBuild());
      return;
    }

    sendJson(res, 404, { error: "Not Found" });
  } catch (err) {
    sendJson(res, 500, { error: String(err.message || err).slice(0, 300) });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`CodeGrid 管理后台已启动：http://localhost:${PORT}`);
  console.log(`文章目录：${POSTS_DIR}`);
});
