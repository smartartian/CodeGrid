---
title: PostgreSQL 索引设计：从执行计划说起
date: 2026-07-12
category: 后端
tags: PostgreSQL, 数据库
summary: 不背 B+ 树原理，直接通过 EXPLAIN ANALYZE 理解索引何时生效、何时失效，以及覆盖索引的威力。
---

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
