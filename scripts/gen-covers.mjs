// 生成政务风文章封面 SVG
// 用法：node scripts/gen-covers.mjs
import { mkdir, writeFile } from "node:fs/promises";

const covers = [
  { id: "react-state-management", cat: "前端", w: "#1a4b8c", h: "#0d4a8a" },
  { id: "vite-build-optimization", cat: "工程化", w: "#0d4a8a", h: "#083a6d" },
  { id: "typescript-generics-practical", cat: "后端", w: "#1a5aa8", h: "#0d4a8a" },
  { id: "nginx-gateway-config", cat: "运维", w: "#083a6d", h: "#0d4a8a" },
  { id: "postgresql-index-design", cat: "后端", w: "#0d5eaf", h: "#1a4b8c" },
  { id: "git-worktree-workflow", cat: "工程化", w: "#0d4a8a", h: "#0a3f77" },
  { id: "system-design-interview", cat: "架构", w: "#1a4b8c", h: "#0d4a8a" },
  { id: "rust-learning-notes", cat: "后端", w: "#0a3f77", h: "#083a6d" },
];

await mkdir("public/covers", { recursive: true });

for (const c of covers) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c.w}"/>
      <stop offset="1" stop-color="${c.h}"/>
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
  <rect x="40" y="30" width="${40 + c.cat.length * 16}" height="24" rx="3" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.35)"/>
  <text x="52" y="46" font-family="'Microsoft YaHei',sans-serif" font-size="14" fill="#fff">${c.cat}</text>
  <!-- 大标题首字 -->
  <text x="40" y="290" font-family="'Microsoft YaHei',sans-serif" font-size="150" font-weight="700" fill="rgba(255,255,255,0.10)">${c.cat[0]}</text>
  <!-- 底部装饰 -->
  <rect x="40" y="316" width="560" height="2" fill="rgba(255,255,255,0.25)"/>
</svg>`;
  await writeFile(`public/covers/${c.id}.svg`, svg);
  console.log(`generated covers/${c.id}.svg`);
}
console.log("done");
