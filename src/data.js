// 文章与站点数据出口
// 文章唯一数据源：content/posts/*.md（由 src/posts.js 加载解析）
// categories / tags 从文章动态派生，新增文章无需再手动维护
import { articles } from "./posts.js";
export { articles };

export { site } from "./site.js";

// 分类展示顺序：原有分类保持顺序，新分类按出现顺序追加
const CATEGORY_ORDER = ["前端", "后端", "工程化", "运维", "架构"];

const countByCategory = (name) =>
  articles.filter((a) => a.category === name).length;

export const categories = [
  ...CATEGORY_ORDER.map((name) => ({ name, count: countByCategory(name) })).filter(
    (c) => c.count > 0,
  ),
  ...[...new Set(articles.map((a) => a.category))]
    .filter((name) => !CATEGORY_ORDER.includes(name))
    .map((name) => ({ name, count: countByCategory(name) })),
];

export const tags = [...new Set(articles.flatMap((a) => a.tags))];
