// 解析文章 .md 文件：frontmatter（元数据）+ 正文
// 纯函数，无 import.meta / fs 依赖，浏览器与 Node 脚本通用
export function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) return null;
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return null;

  const metaStr = raw.slice(3, end);
  const body = raw.slice(end + 4).replace(/^\n+/, "");

  const meta = {};
  for (const line of metaStr.split("\n")) {
    const m = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim();
  }
  return { meta, body };
}

export function parsePost(raw, id) {
  const parsed = parseFrontmatter(raw);
  if (!parsed) throw new Error(`文章 ${id} 缺少 frontmatter`);

  const { meta, body } = parsed;
  const title = meta.title;
  // 剥离正文首行的重复标题（与 frontmatter title 完全一致时），避免渲染出两个 h1
  const strippedBody = body
    .replace(/^\n+/, "")
    .replace(new RegExp(`^#\\s*${escapeRegExp(title)}\\s*\\n+`), "")
    .trim();

  return {
    id,
    title,
    date: meta.date,
    category: meta.category,
    tags: (meta.tags || "")
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean),
    summary: meta.summary,
    content: strippedBody,
  };
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
