---
title: 'Nuxt.js 入门指南'
description: '学习如何使用 Nuxt.js 构建现代化的 Vue.js 应用程序'
date: 2024-01-20
category: '前端开发'
tags: ['Nuxt.js', 'Vue.js', '教程']
author: 'ZX'
image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800'
---

# Nuxt.js 入门指南

Nuxt.js 是一个基于 Vue.js 的通用应用框架，它提供了许多开箱即用的功能，帮助你快速构建现代化的 Web 应用程序。

## 什么是 Nuxt.js？

Nuxt.js 是一个基于 Vue.js 的渐进式框架，它提供了以下特性：

- **自动路由** - 基于 `pages/` 目录自动生成路由
- **服务端渲染 (SSR)** - 提升首屏加载速度和 SEO
- **静态站点生成 (SSG)** - 生成静态 HTML 文件
- **模块系统** - 丰富的生态系统
- **TypeScript 支持** - 完整的类型支持

## 安装 Nuxt.js

使用 npm 创建新的 Nuxt.js 项目：

```bash
npx nuxi@latest init my-nuxt-app
cd my-nuxt-app
npm install
npm run dev
```

## 项目结构

Nuxt.js 的项目结构如下：

```
my-nuxt-app/
├── assets/          # 静态资源
├── components/      # Vue 组件
├── layouts/         # 布局组件
├── pages/           # 页面组件
├── public/          # 公共静态文件
├── server/          # 服务端代码
├── nuxt.config.ts   # 配置文件
└── package.json     # 依赖管理
```

## 创建页面

在 `pages/` 目录下创建 `.vue` 文件，Nuxt.js 会自动生成对应的路由：

```vue
<template>
  <div>
    <h1>Hello World!</h1>
  </div>
</template>
```

## 使用组件

在 `components/` 目录下创建的组件可以自动导入使用：

```vue
<template>
  <div>
    <MyComponent />
  </div>
</template>
```

## 数据获取

使用 `useFetch` 或 `useAsyncData` 获取数据：

```vue
<script setup>
const { data } = await useFetch('/api/posts')
</script>
```

## 部署

构建生产版本：

```bash
npm run build
```

部署到 Vercel、Netlify 或其他平台。

## 总结

Nuxt.js 是一个强大的框架，可以帮助你快速构建现代化的 Vue.js 应用程序。开始你的 Nuxt.js 之旅吧！
