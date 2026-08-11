// 从 content/posts/ 加载全部文章（.md 是唯一数据源）
// 依赖 Vite 的 import.meta.glob，仅供浏览器端使用
import { parsePost } from "./lib/parse-post.js";

const modules = import.meta.glob("../content/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const articles = Object.entries(modules)
  .map(([path, raw]) => {
    const id = path.split("/").pop().replace(/\.md$/, "");
    return parsePost(raw, id);
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));
