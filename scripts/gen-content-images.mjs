// 生成文章正文内容插图 SVG（public/images/）
// 用法：node scripts/gen-content-images.mjs
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("public/images", { recursive: true });

// 1. 系统设计分层架构图
const layered = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="400" viewBox="0 0 720 400">
  <rect width="720" height="400" fill="#f0f4f8"/>
  <text x="30" y="38" font-family="'Microsoft YaHei',sans-serif" font-size="16" font-weight="700" fill="#0d4a8a">系统分层架构</text>
  <rect x="30" y="52" width="660" height="1" fill="#c41e2a"/>
  <g font-family="'Microsoft YaHei',sans-serif">
    <rect x="60" y="80" width="600" height="44" fill="#0d4a8a"/>
    <text x="80" y="107" font-size="14" fill="#fff" font-weight="700">客户端层 · 浏览器 / App</text>
    <rect x="60" y="140" width="600" height="44" fill="#1a4b8c"/>
    <text x="80" y="167" font-size="14" fill="#fff" font-weight="700">接入层 · DNS / CDN / 负载均衡</text>
    <rect x="60" y="200" width="600" height="44" fill="#0d5eaf"/>
    <text x="80" y="227" font-size="14" fill="#fff" font-weight="700">应用层 · 网关 / 微服务 / 业务逻辑</text>
    <rect x="60" y="260" width="600" height="44" fill="#4f86c2"/>
    <text x="80" y="287" font-size="14" fill="#fff" font-weight="700">数据层 · 缓存 / 数据库 / 消息队列</text>
    <rect x="60" y="320" width="600" height="44" fill="#c41e2a"/>
    <text x="80" y="347" font-size="14" fill="#fff" font-weight="700">基础设施 · 监控 / 日志 / 部署平台</text>
  </g>
</svg>`;

// 2. PostgreSQL B+ 树索引示意图
const btree = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="380" viewBox="0 0 720 380">
  <rect width="720" height="380" fill="#f0f4f8"/>
  <text x="30" y="38" font-family="'Microsoft YaHei',sans-serif" font-size="16" font-weight="700" fill="#0d4a8a">B+ 树索引结构</text>
  <rect x="30" y="52" width="660" height="1" fill="#c41e2a"/>
  <g font-family="'Microsoft YaHei',sans-serif" text-anchor="middle">
    <rect x="310" y="80" width="100" height="36" fill="#0d4a8a"/>
    <text x="360" y="103" font-size="13" fill="#fff">50</text>
    <rect x="130" y="150" width="90" height="36" fill="#1a4b8c"/>
    <rect x="250" y="150" width="90" height="36" fill="#1a4b8c"/>
    <rect x="370" y="150" width="90" height="36" fill="#1a4b8c"/>
    <rect x="490" y="150" width="90" height="36" fill="#1a4b8c"/>
    <text x="175" y="173" font-size="12" fill="#fff">10 20</text>
    <text x="295" y="173" font-size="12" fill="#fff">30 40</text>
    <text x="415" y="173" font-size="12" fill="#fff">60 70</text>
    <text x="535" y="173" font-size="12" fill="#fff">80 90</text>
    <g stroke="#0d4a8a" stroke-width="1.5" fill="none">
      <line x1="360" y1="116" x2="175" y2="150"/>
      <line x1="360" y1="116" x2="295" y2="150"/>
      <line x1="360" y1="116" x2="415" y2="150"/>
      <line x1="360" y1="116" x2="535" y2="150"/>
    </g>
    <g fill="#0d4a8a">
      <circle cx="175" cy="235" r="16"/>
      <circle cx="295" cy="235" r="16"/>
      <circle cx="415" cy="235" r="16"/>
      <circle cx="535" cy="235" r="16"/>
      <circle cx="175" cy="295" r="16"/>
      <circle cx="295" cy="295" r="16"/>
    </g>
    <text x="175" y="240" font-size="11" fill="#fff">P1</text>
    <text x="295" y="240" font-size="11" fill="#fff">P2</text>
    <text x="415" y="240" font-size="11" fill="#fff">P3</text>
    <text x="535" y="240" font-size="11" fill="#fff">P4</text>
    <text x="175" y="300" font-size="11" fill="#fff">行1</text>
    <text x="295" y="300" font-size="11" fill="#fff">行2</text>
    <g stroke="#8fb4de" stroke-width="1.2">
      <line x1="175" y1="186" x2="175" y2="219"/>
      <line x1="295" y1="186" x2="295" y2="219"/>
      <line x1="415" y1="186" x2="415" y2="219"/>
      <line x1="535" y1="186" x2="535" y2="219"/>
      <line x1="159" y1="235" x2="159" y2="279"/>
      <line x1="191" y1="235" x2="191" y2="279"/>
      <line x1="279" y1="235" x2="279" y2="279"/>
      <line x1="311" y1="235" x2="311" y2="279"/>
    </g>
    <text x="360" y="345" font-size="13" fill="#0d4a8a">叶子节点保存指针，双向链表连接，范围查询高效</text>
  </g>
</svg>`;

await writeFile("public/images/system-architecture.svg", layered);
await writeFile("public/images/btree-index.svg", btree);
console.log("生成 public/images/system-architecture.svg 与 public/images/btree-index.svg");
