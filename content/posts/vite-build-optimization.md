---
title: Vite 构建优化实践：从 3 分钟到 30 秒
date: 2026-08-06
category: 工程化
tags: Vite, 性能优化
summary: 记录一次真实项目的构建提速过程：依赖预构建、代码分割、缓存策略与并行构建四项措施的效果对比。
---

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

```js
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
```

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
