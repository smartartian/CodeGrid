---
title: React 状态管理方案演进：从 Redux 到原子化
date: 2026-08-10
category: 前端
tags: React, 状态管理
summary: 回顾 React 状态管理库十余年演进，对比 Redux、MobX、Zustand、Jotai 的适用场景，给出个人技术栈选型建议。
---

# React 状态管理方案演进：从 Redux 到原子化

状态管理是 React 生态中争论最久的话题之一。本文从个人实践出发，梳理各类方案的定位与取舍。

## 一、Redux 时代：约定大于自由

2015 年 Redux 出现时，解决了"组件树数据流不可预测"的痛点。单一 store、纯函数 reducer、单向数据流，这些约定让大型应用的状态变化可追踪、可回放。

```js
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
};
```

## 二、Context + Hook：轻量替代

React 16.8 引入 Hook 后，useReducer + useContext 组合可以覆盖中小型应用的状态需求，无需额外依赖。

## 三、原子化方案：Zustand 与 Jotai

- **Zustand**：store 即 Hook，无 Provider 包裹，选择器粒度细，适合中大型应用。
- **Jotai**：原子粒度最小，按需订阅，天然支持派生状态。

## 结语

没有银弹。我的建议是：小型应用用本地 state + Context；中大型应用直接上 Zustand；只有极复杂的全局状态流才考虑 Redux Toolkit。
