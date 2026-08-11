---
title: Git Worktree 工作流：并行分支开发体验
date: 2026-07-03
category: 工程化
tags: Git, 工作流
summary: 介绍 git worktree 解决多分支并行开发的痛点，配合交互式 rebase 保持提交历史的整洁。
---

# Git Worktree 工作流：并行分支开发体验

同时开发多个特性分支时，频繁 stash 和切换让人抓狂。git worktree 提供了优雅的解法。

## 一、基本用法

```bash
git worktree add ../feature-a -b feature-a
```

## 二、多目录并行开发

每个分支独立工作目录，互不干扰，构建缓存互不污染。

![多分支并行工作区](/covers/git-worktree-workflow.svg)

## 三、清理与规范

开发完成后及时移除 worktree，避免目录堆积。

## 四、配合 CI 验证

## 结语

worktree 让"并行分支"从口号变成日常操作。
