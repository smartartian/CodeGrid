// 生成政务风文章封面 SVG（自动扫描 content/posts/，无需手动维护列表）
// 用法：node scripts/gen-covers.mjs
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseFrontmatter } from "../src/lib/parse-post.js";

const POSTS_DIR = "content/posts";
const COVERS_DIR = "public/covers";

// 分类 → 渐变配色（深蓝系，红点缀）
const CAT_COLORS = {
  前端: ["#1a4b8c", "#0d4a8a"],
  后端: ["#1a5aa8", "#0d4a8a"],
  工程化: ["#0d4a8a", "#083a6d"],
  运维: ["#083a6d", "#0d4a8a"],
  架构: ["#1a4b8c", "#0d4a8a"],
};
const FALLBACK = ["#0d4a8a", "#083a6d"];

function coverSvg(cat) {
  const [w, h] = CAT_COLORS[cat] ?? FALLBACK;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${w}"/>
      <stop offset="1" stop-color="${h}"/>
    </linearGradient>
  </defs>
  <rect width="640" height="360" fill="url(#g)"/>
  <!-- 网格线纹理 -->
  <g stroke="rgba(255,255,255,0.08)" stroke-width="1">
    ${Array.from({ length: 8 }, (_, i) => `<line x1="${(i + 1) * 80}" y1="0" x2="${(i + 1) * 80}" y2="360"/>`).join("\n    ")}
    ${Array.from({ length: 5 }, (_, i) => `<line x1="0" y1="${(i + 1) * 60}" x2="640" y2="${(i + 1) * 60}"/>`).join("\n    ")}
  </g>
  <!-- 红色装饰线 -->
  <rect x="40" y="64" width="42" height="5" fill="#c41e2a"/>
  <rect x="40" y="76" width="560" height="1" stroke="#c41e2a" stroke-dasharray="4 4" fill="none" opacity="0.7"/>
  <!-- 分类标签 -->
  <rect x="40" y="30" width="${40 + cat.length * 16}" height="24" rx="3" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.35)"/>
  <text x="52" y="46" font-family="'Microsoft YaHei',sans-serif" font-size="14" fill="#fff">${cat}</text>
  <!-- 大标题首字 -->
  <text x="40" y="290" font-family="'Microsoft YaHei',sans-serif" font-size="150" font-weight="700" fill="rgba(255,255,255,0.10)">${(cat[0] || "C")}</text>
  <!-- 底部装饰 -->
  <rect x="40" y="316" width="560" height="2" fill="rgba(255,255,255,0.25)"/>
</svg>`;
}

await mkdir(COVERS_DIR, { recursive: true });

const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".md"));
const generated = new Set();

for (const file of files) {
  const raw = await readFile(path.join(POSTS_DIR, file), "utf8");
  const parsed = parseFrontmatter(raw);
  const cat = parsed?.meta?.category?.trim() || "未分类";
  const id = file.replace(/\.md$/, "");
  await writeFile(path.join(COVERS_DIR, `${id}.svg`), coverSvg(cat));
  generated.add(`${id}.svg`);
  console.log(`generated covers/${id}.svg (${cat})`);
}

// 清理已删除文章遗留的旧封面
const existing = (await readdir(COVERS_DIR)).filter((f) => f.endsWith(".svg"));
for (const f of existing) {
  if (!generated.has(f)) {
    await rm(path.join(COVERS_DIR, f), { force: true });
    console.log(`removed stale covers/${f}`);
  }
}

console.log(`done: ${generated.size} covers`);
