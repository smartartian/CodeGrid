// 博客文章数据（占位内容）
export const articles = [
  {
    id: "react-state-management",
    title: "React 状态管理方案演进：从 Redux 到原子化",
    date: "2026-08-10",
    category: "前端",
    tags: ["React", "状态管理"],
    summary:
      "回顾 React 状态管理库十余年演进，对比 Redux、MobX、Zustand、Jotai 的适用场景，给出个人技术栈选型建议。",
    content: `
# React 状态管理方案演进：从 Redux 到原子化

状态管理是 React 生态中争论最久的话题之一。本文从个人实践出发，梳理各类方案的定位与取舍。

## 一、Redux 时代：约定大于自由

2015 年 Redux 出现时，解决了"组件树数据流不可预测"的痛点。单一 store、纯函数 reducer、单向数据流，这些约定让大型应用的状态变化可追踪、可回放。

\`\`\`js
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
};
\`\`\`

## 二、Context + Hook：轻量替代

React 16.8 引入 Hook 后，useReducer + useContext 组合可以覆盖中小型应用的状态需求，无需额外依赖。

## 三、原子化方案：Zustand 与 Jotai

- **Zustand**：store 即 Hook，无 Provider 包裹，选择器粒度细，适合中大型应用。
- **Jotai**：原子粒度最小，按需订阅，天然支持派生状态。

## 结语

没有银弹。我的建议是：小型应用用本地 state + Context；中大型应用直接上 Zustand；只有极复杂的全局状态流才考虑 Redux Toolkit。
`,
  },
  {
    id: "vite-build-optimization",
    title: "Vite 构建优化实践：从 3 分钟到 30 秒",
    date: "2026-08-06",
    category: "工程化",
    tags: ["Vite", "性能优化"],
    summary:
      "记录一次真实项目的构建提速过程：依赖预构建、代码分割、缓存策略与并行构建四项措施的效果对比。",
    content: `
# Vite 构建优化实践：从 3 分钟到 30 秒

构建速度直接影响开发体验与 CI 效率。本文记录一次生产构建从 3 分钟优化到 30 秒的过程。

## 一、先定位瓶颈

使用 vite build --debug 查看各阶段耗时，发现依赖预构建（Optimize Dependencies）与压缩（Terser）占了大头。

## 二、四项优化措施

### 1. 依赖预构建缓存
锁定 dependencies 版本，避免 lockfile 变化触发重复预构建。

![构建提速效果](/covers/vite-build-optimization.svg)

### 2. 代码分割
将第三方库按需拆包，利用浏览器 HTTP 缓存减少重复下载。

\`\`\`js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["axios", "lodash-es"],
        },
      },
    },
  },
});
\`\`\`

### 3. 压缩器更换
使用 esbuild 替代 terser 压缩，体积略增 3%，速度提升约 6 倍。

### 4. CI 缓存
在 GitHub Actions 中缓存 node_modules 与 .vite 缓存目录，冷启动时间减半。

## 结果对比

| 阶段 | 优化前 | 优化后 |
| ---- | ------ | ------ |
| 依赖预构建 | 40s | 8s |
| 代码压缩 | 90s | 15s |
| 总时长 | 182s | 30s |

## 小结

构建优化是"定位—验证—迭代"的循环，先测量再动手，避免拍脑袋优化。
`,
  },
  {
    id: "typescript-generics-practical",
    title: "TypeScript 泛型实战：写出可复用的类型工具",
    date: "2026-07-28",
    category: "后端",
    tags: ["TypeScript", "类型系统"],
    summary:
      "通过 5 个真实场景示例，掌握条件类型、映射类型、infer 推断等泛型进阶技巧。",
    content: `
# TypeScript 泛型实战：写出可复用的类型工具

泛型是 TypeScript 类型系统最强大的部分。本文用 5 个实战场景讲解进阶用法。

## 一、从对象中提取键的联合类型

\`\`\`ts
type Keys = keyof typeof config;
\`\`\`

## 二、条件类型与 infer

从函数签名中提取返回值类型：

\`\`\`ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
\`\`\`

## 三、映射类型改造对象

将对象的所有属性变为可选且保留元数据：

\`\`\`ts
type PartialWithMeta<T> = {
  [K in keyof T]?: T[K] & { updatedAt: Date };
};
\`\`\`

## 四、递归泛型处理嵌套结构

## 五、实战：类型安全的 API 封装

## 结语

泛型能力的提升没有捷径，多读开源库的类型定义是最快的学习路径。
`,
  },
  {
    id: "nginx-gateway-config",
    title: "Nginx 网关配置踩坑记：转发、缓存与安全头",
    date: "2026-07-20",
    category: "运维",
    tags: ["Nginx", "DevOps"],
    summary:
      "从一次线上事故出发，梳理 Nginx 反向代理配置中的常见陷阱：路径转发、缓存控制与安全响应头。",
    content: `
# Nginx 网关配置踩坑记：转发、缓存与安全头

一次线上 502 事故，让我重新审视 Nginx 网关配置的每个细节。

## 一、路径转发的经典陷阱

location 匹配优先级、proxy_pass 带不带斜杠，差一个字符行为完全不同。

## 二、缓存控制策略

静态资源长缓存、API 不缓存，通过 header 与 proxy_cache 组合实现。

## 三、安全响应头

添加 X-Frame-Options、CSP、HSTS 等安全头，低成本提升安全性。

## 四、日志与监控

结合 access log 的请求耗时与上游响应码，快速定位故障。
`,
  },
  {
    id: "postgresql-index-design",
    title: "PostgreSQL 索引设计：从执行计划说起",
    date: "2026-07-12",
    category: "后端",
    tags: ["PostgreSQL", "数据库"],
    summary:
      "不背 B+ 树原理，直接通过 EXPLAIN ANALYZE 理解索引何时生效、何时失效，以及覆盖索引的威力。",
    content: `
# PostgreSQL 索引设计：从执行计划说起

索引优化的正确姿势是先看执行计划，而不是凭感觉建索引。

## 一、读懂 EXPLAIN ANALYZE

关注 Seq Scan 与 Index Scan 的代价估算与实际耗时，理解 rows 估算偏差的危害。

![B+ 树索引结构](/images/btree-index.svg)

## 二、联合索引的列序

等值条件优先、范围条件靠后，这是联合索引设计的第一原则。

## 三、覆盖索引

通过 INCLUDE 列避免回表，在高频查询中收益显著。

## 四、索引失效场景

函数包裹列、隐式类型转换、LIKE 前导通配符——这些场景索引会失效。

## 小结

每个生产查询都应该跑一遍 EXPLAIN ANALYZE，让执行计划说话。
`,
  },
  {
    id: "git-worktree-workflow",
    title: "Git Worktree 工作流：并行分支开发体验",
    date: "2026-07-03",
    category: "工程化",
    tags: ["Git", "工作流"],
    summary:
      "介绍 git worktree 解决多分支并行开发的痛点，配合交互式 rebase 保持提交历史的整洁。",
    content: `
# Git Worktree 工作流：并行分支开发体验

同时开发多个特性分支时，频繁 stash 和切换让人抓狂。git worktree 提供了优雅的解法。

## 一、基本用法

\`\`\`bash
git worktree add ../feature-a -b feature-a
\`\`\`

## 二、多目录并行开发

每个分支独立工作目录，互不干扰，构建缓存互不污染。

![多分支并行工作区](/covers/git-worktree-workflow.svg)

## 三、清理与规范

开发完成后及时移除 worktree，避免目录堆积。

## 四、配合 CI 验证

## 结语

worktree 让"并行分支"从口号变成日常操作。
`,
  },
  {
    id: "system-design-interview",
    title: "系统设计面试：从 URL 输入到页面渲染",
    date: "2026-06-25",
    category: "架构",
    tags: ["系统设计", "网络"],
    summary:
      "一道经典系统设计题的全链路拆解：DNS、CDN、负载均衡、网关、缓存、数据库分层。",
    content: `
# 系统设计面试：从 URL 输入到页面渲染

"输入 URL 后发生了什么"是面试高频题，也是理解分层架构的最佳入口。

![系统分层架构总览](/images/system-architecture.svg)

## 一、DNS 解析与 CDN

## 二、负载均衡层

L4 与 L7 负载均衡的区别与选择。

## 三、网关与安全

## 四、缓存分层

浏览器缓存、CDN 缓存、应用缓存、数据库缓存，各层失效策略。

## 五、数据库读写分离与分库分表

## 结语

系统设计没有标准答案，考察的是分层思维与权衡能力。
`,
  },
  {
    id: "rust-learning-notes",
    title: "Rust 学习笔记：所有权与生命周期的直觉理解",
    date: "2026-06-18",
    category: "后端",
    tags: ["Rust", "编程语言"],
    summary:
      '用"资源的所有者"这一比喻建立直觉，快速理解所有权转移、借用规则与生命周期标注。',
    content: `
# Rust 学习笔记：所有权与生命周期的直觉理解

Rust 的所有权系统劝退了很多人。本文尝试用比喻建立直觉。

## 一、所有权：资源只有一个主人

## 二、借用：临时使用不转移

## 三、生命周期：借用不能超过所有者的存活期

## 四、实战：自引用结构为什么难写

## 结语

所有权不是限制，而是编译期就消灭内存错误的承诺。
`,
  },
];

export const categories = [
  { name: "前端", count: 1 },
  { name: "后端", count: 3 },
  { name: "工程化", count: 2 },
  { name: "运维", count: 1 },
  { name: "架构", count: 1 },
];

export const tags = ["React", "Vite", "TypeScript", "Nginx", "PostgreSQL", "Git", "Rust", "系统设计", "性能优化"];

export const site = {
  name: "CodeGrid",
  enName: "CodeGrid 技术博客",
  slogan: "记录技术思考与工程实践",
  email: "webmaster@codegrid.cn",
  icp: "京ICP备2026000000号-1",
  baseUrl: "https://codegrid.cn",
  today: "2026年08月11日 星期二",
};
