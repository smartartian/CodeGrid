// 新建文章脚手架：生成带 frontmatter 模板的 .md 文件
// 用法：node scripts/new-post.mjs [文章标题] [分类]
// 例：node scripts/new-post.mjs "我的第一篇文章" "前端"
import { writeFile } from "node:fs/promises";
import path from "node:path";

const title = process.argv[2];
const category = process.argv[3] || "未分类";

if (!title) {
  console.error("用法：npm run new -- \"文章标题\" [分类]");
  process.exit(1);
}

// slug：转小写、非字母数字转连字符（保留中英文），截断到 40 字符
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 40);

const date = new Date().toISOString().slice(0, 10);
const file = path.join("content/posts", `${slug}.md`);

const template = `---
title: ${title}
date: ${date}
category: ${category}
tags: 
summary: 
---

# ${title}

开始写作吧...
`;

await writeFile(file, template, { flag: "wx" });
console.log(`已创建 ${file}`);
console.log("提示：保存后运行 npm run build 自动生成封面与 RSS；或直接在浏览器打开后台管理。");
