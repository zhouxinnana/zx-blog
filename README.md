# ZX Blog

一个基于 Nuxt.js 3 构建的现代化博客系统，支持 Markdown 文章编写、分类标签管理、搜索功能和响应式设计。

## 功能特性

- 📝 **Markdown 支持** - 使用 Markdown 编写和管理文章
- 🏷️ **标签系统** - 为文章添加标签，方便分类和筛选
- 📂 **分类管理** - 按分类组织你的文章内容
- 🔍 **搜索功能** - 实时搜索文章标题、描述和标签
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ⚡ **静态站点生成 (SSG)** - 优化 SEO 和加载性能
- 🎨 **现代化 UI** - 简洁美观的设计风格
- 🔧 **文章管理** - 创建、编辑和删除文章的完整功能

## 技术栈

- **Nuxt.js 3** - Vue.js 框架
- **Vue.js 3** - 渐进式 JavaScript 框架
- **@nuxt/content** - Markdown 内容管理
- **Sass** - CSS 预处理器
- **TypeScript** - 类型安全

## 项目结构

```
zx-blog/
├── assets/
│   └── css/
│       └── main.scss          # 主样式文件
├── components/
│   ├── ArticleCard.vue        # 文章卡片组件
│   ├── ConfirmModal.vue       # 确认对话框组件
│   ├── Footer.vue             # 页脚组件
│   ├── Header.vue             # 页头组件
│   └── PostModal.vue          # 文章编辑模态框
├── content/
│   └── posts/                 # Markdown 文章目录
│       ├── welcome.md
│       ├── nuxtjs-guide.md
│       └── vue3-composition-api.md
├── layouts/
│   └── default.vue           # 默认布局
├── pages/
│   ├── index.vue              # 首页（文章列表）
│   ├── admin/
│   │   └── index.vue          # 管理页面
│   ├── categories/
│   │   ├── index.vue          # 分类列表
│   │   └── [category].vue     # 单个分类
│   ├── tags/
│   │   ├── index.vue          # 标签列表
│   │   └── [tag].vue          # 单个标签
│   └── posts/
│       └── [slug].vue         # 文章详情
├── public/                    # 静态资源
├── server/
│   └── api/
│       └── posts/             # API 路由
│           ├── index.post.ts  # 创建文章
│           └── [slug].delete.ts # 删除文章
├── nuxt.config.ts             # Nuxt 配置文件
├── package.json               # 依赖管理
└── tsconfig.json              # TypeScript 配置
```

## 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看你的博客。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 生成静态站点

```bash
npm run generate
```

生成的静态文件将在 `.output/public` 目录中。

## 使用指南

### 创建文章

有两种方式创建文章：

#### 方式 1：通过管理界面

1. 访问 `/admin` 页面
2. 点击"创建新文章"按钮
3. 填写文章信息（标题、URL 别名、内容等）
4. 点击保存

#### 方式 2：手动创建 Markdown 文件

在 `content/posts/` 目录下创建新的 `.md` 文件：

```markdown
---
title: '文章标题'
description: '文章描述'
date: 2024-01-15
category: '分类名称'
tags: ['标签1', '标签2']
author: '作者名称'
image: 'https://example.com/image.jpg'
---

# 文章内容

使用 Markdown 语法编写文章内容...
```

### 文章 Frontmatter

每篇文章必须包含以下 frontmatter 字段：

- `title` (必需) - 文章标题
- `description` - 文章描述
- `date` (必需) - 发布日期 (YYYY-MM-DD)
- `category` - 文章分类
- `tags` - 标签数组
- `author` - 作者名称
- `image` - 封面图片 URL

### Markdown 语法

支持标准 Markdown 语法，包括：

- 标题 (# ## ###)
- 列表 (- 或 1.)
- 代码块 (```language)
- 引用 (>)
- 链接 ([text](url))
- 图片 (
![alt](url)
)
- 粗体 (**text**) 和斜体 (*text*)

## 部署指南

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置构建设置：
   - Framework Preset: Nuxt.js
   - Build Command: `npm run build`
   - Output Directory: `.output/public`
4. 点击部署

### 部署到 Netlify

1. 将代码推送到 GitHub
2. 在 Netlify 中导入项目
3. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `.output/public`
4. 点击部署

### 部署到静态托管服务

1. 运行 `npm run generate` 生成静态文件
2. 将 `.output/public` 目录的内容上传到任何静态托管服务
3. 配置自定义域名（可选）

### 部署到 Node.js 服务器

1. 运行 `npm run build`
2. 使用 PM2 或其他进程管理器运行：

```bash
npm install -g pm2
pm2 start .output/server/index.mjs --name "zx-blog"
```

## 自定义配置

### 修改网站信息

编辑 `nuxt.config.ts` 文件：

```typescript
app: {
  head: {
    title: '你的博客名称',
    meta: [
      { name: 'description', content: '你的博客描述' },
      { name: 'keywords', content: '关键词1, 关键词2' }
    ]
  }
}
```

### 修改样式

编辑 `assets/css/main.scss` 文件来自定义样式：

```scss
$primary-color: #3b82f6;  // 主色调
$secondary-color: #10b981; // 次要色调
$text-color: #1f2937;      // 文字颜色
```

### 添加自定义组件

在 `components/` 目录下创建新的 Vue 组件，Nuxt.js 会自动注册。

## 性能优化

项目已包含以下性能优化：

- 静态站点生成 (SSG)
- 图片懒加载
- 代码分割
- CSS 优化
- SEO 优化

## 常见问题

### 如何修改网站 Logo？

替换 `public/favicon.svg` 文件为你自己的 Logo。

### 如何添加自定义页面？

在 `pages/` 目录下创建新的 `.vue` 文件，Nuxt.js 会自动生成路由。

### 如何修改文章列表的排序？

编辑 `pages/index.vue` 文件，修改 `sort({ date: -1 })` 参数。

### 如何添加评论功能？

可以集成第三方评论服务，如：
- Disqus
- Giscus
- Utterances
- Waline

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动浏览器 (iOS Safari, Chrome Mobile)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件

---

祝你使用愉快！🎉
