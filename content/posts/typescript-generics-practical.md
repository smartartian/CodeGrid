---
title: TypeScript 泛型实战：写出可复用的类型工具
date: 2026-07-28
category: 后端
tags: TypeScript, 类型系统
summary: 通过 5 个真实场景示例，掌握条件类型、映射类型、infer 推断等泛型进阶技巧。
---

# TypeScript 泛型实战：写出可复用的类型工具

泛型是 TypeScript 类型系统最强大的部分。本文用 5 个实战场景讲解进阶用法。

## 一、从对象中提取键的联合类型

```ts
type Keys = keyof typeof config;
```

## 二、条件类型与 infer

从函数签名中提取返回值类型：

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

## 三、映射类型改造对象

将对象的所有属性变为可选且保留元数据：

```ts
type PartialWithMeta<T> = {
  [K in keyof T]?: T[K] & { updatedAt: Date };
};
```

## 四、递归泛型处理嵌套结构

## 五、实战：类型安全的 API 封装

## 结语

泛型能力的提升没有捷径，多读开源库的类型定义是最快的学习路径。
