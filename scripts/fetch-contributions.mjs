// 刷新 GitHub 提交热力图数据
// 用法：node scripts/fetch-contributions.mjs <github用户名> [输出路径]
import { writeFile } from "node:fs/promises";

const username = process.argv[2];
if (!username) {
  console.error("用法：node scripts/fetch-contributions.mjs <github用户名>");
  process.exit(1);
}

const out = process.argv[3] ?? "public/contributions.json";

const res = await fetch(
  `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
);
if (!res.ok) {
  console.error(`拉取失败：HTTP ${res.status}`);
  process.exit(1);
}

const data = await res.json();
const { total, contributions } = data;
await writeFile(out, JSON.stringify({ username, fetchedAt: new Date().toISOString(), total, contributions }));
console.log(
  `已写入 ${out}：${contributions.length} 天，最近一年 ${total.lastYear} 次提交`,
);
