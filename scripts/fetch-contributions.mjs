// 刷新 GitHub 提交热力图数据（多年度，按年存储）
// 用法：node scripts/fetch-contributions.mjs <github用户名> [输出路径]
import { writeFile } from "node:fs/promises";

const username = process.argv[2];
if (!username) {
  console.error("用法：node scripts/fetch-contributions.mjs <github用户名>");
  process.exit(1);
}

const out = process.argv[3] ?? "public/contributions.json";

// 抓取近 4 年（含当年），供年份切换使用
const currentYear = new Date().getFullYear();
const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

const yearsData = {};
for (const y of years) {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=${y}`,
  );
  if (!res.ok) {
    console.error(`拉取 ${y} 年失败：HTTP ${res.status}`);
    process.exit(1);
  }
  const data = await res.json();
  yearsData[y] = {
    total: data.total?.[y] ?? 0,
    contributions: data.contributions,
  };
  console.log(`${y}: ${data.contributions.length} 天，${yearsData[y].total} 次提交`);
}

await writeFile(
  out,
  JSON.stringify({ username, fetchedAt: new Date().toISOString(), years: yearsData }),
);
console.log(`已写入 ${out}：${years.length} 年数据`);
