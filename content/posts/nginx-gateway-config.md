---
title: Nginx 网关配置踩坑记：转发、缓存与安全头
date: 2026-07-20
category: 运维
tags: Nginx, DevOps
summary: 从一次线上事故出发，梳理 Nginx 反向代理配置中的常见陷阱：路径转发、缓存控制与安全响应头。
---

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
