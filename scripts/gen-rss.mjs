// 从 content/posts/ 的 .md 文章生成 RSS 2.0 feed（public/feed.xml）
// 用法：node scripts/gen-rss.mjs
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { parsePost } from "../src/lib/parse-post.js";
import { site } from "../src/site.js";

const baseUrl = site.baseUrl.replace(/\/+$/, "");
const postsDir = "content/posts";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 用正文前 150 字生成摘要
function excerpt(md) {
  const text = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*`|]/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 150 ? text.slice(0, 150) + "…" : text;
}

// 确保目录存在（空仓库下 content/posts 不被 git 跟踪，可能缺失）
await mkdir(postsDir, { recursive: true });
const files = (await readdir(postsDir)).filter((f) => f.endsWith(".md"));
const articles = [];
for (const f of files) {
  const raw = await readFile(`${postsDir}/${f}`, "utf8");
  articles.push(parsePost(raw, f.replace(/\.md$/, "")));
}

const items = [...articles]
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .map((a) => {
    const link = `${baseUrl}/article/${a.id}`;
    const date = new Date(`${a.date}T00:00:00+08:00`);
    return `    <item>
      <title>${esc(a.title)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="false">${esc(link)}</guid>
      <pubDate>${date.toUTCString()}</pubDate>
      <category>${esc(a.category)}</category>
      <description>${esc(excerpt(a.content))}</description>
      ${a.tags.map((t) => `<category>${esc(t)}</category>`).join("\n      ")}
    </item>`;
  })
  .join("\n");

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${esc(baseUrl)}</link>
    <description>${esc(site.slogan)}</description>
    <language>zh-cn</language>
    <generator>mimocode-blog</generator>
    <atom:link href="${esc(baseUrl)}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

await writeFile("public/feed.xml", feed);
console.log(`已生成 public/feed.xml：${articles.length} 篇文章`);
