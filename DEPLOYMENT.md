# ZX Blog 部署指南

本指南将帮助你将 ZX Blog 部署到各种平台。

## 目录

- [准备工作](#准备工作)
- [部署到 Vercel](#部署到-vercel)
- [部署到 Netlify](#部署到-netlify)
- [部署到 GitHub Pages](#部署到-github-pages)
- [部署到 Cloudflare Pages](#部署到-cloudflare-pages)
- [部署到自己的服务器](#部署到自己的服务器)
- [环境变量配置](#环境变量配置)
- [常见问题](#常见问题)

## 准备工作

在部署之前，请确保：

1. ✅ 代码已推送到 Git 仓库（GitHub、GitLab 或 Bitbucket）
2. ✅ 本地测试通过，项目可以正常运行
3. ✅ 已安装 Node.js 18.x 或更高版本
4. ✅ 已运行 `npm run build` 确保构建成功

## 部署到 Vercel

Vercel 是一个流行的静态网站托管平台，对 Nuxt.js 有很好的支持。

### 步骤 1：准备代码

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/zx-blog.git
git push -u origin main
```

### 步骤 2：在 Vercel 中导入项目

1. 访问 [vercel.com](https://vercel.com)
2. 登录或注册账号
3. 点击 "Add New" → "Project"
4. 选择你的 GitHub 仓库
5. 配置项目设置：

```yaml
Framework Preset: Nuxt.js
Build Command: npm run build
Output Directory: .output/public
Install Command: npm install
```

### 步骤 3：环境变量（可选）

如果需要配置环境变量，在项目设置中添加：

- `NUXT_PUBLIC_SITE_URL`: 你的网站 URL

### 步骤 4：部署

点击 "Deploy" 按钮，Vercel 会自动构建和部署你的网站。

### 步骤 5：配置自定义域名（可选）

1. 在项目设置中点击 "Domains"
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录

## 部署到 Netlify

Netlify 是另一个优秀的静态网站托管平台。

### 步骤 1：准备代码

同 Vercel，将代码推送到 Git 仓库。

### 步骤 2：在 Netlify 中导入项目

1. 访问 [netlify.com](https://netlify.com)
2. 登录或注册账号
3. 点击 "Add new site" → "Import an existing project"
4. 选择你的 Git 提供商
5. 选择你的仓库

### 步骤 3：配置构建设置

在 "Build settings" 中配置：

```yaml
Build command: npm run build
Publish directory: .output/public
```

### 步骤 4：环境变量（可选）

在 "Site settings" → "Environment variables" 中添加环境变量。

### 步骤 5：部署

点击 "Deploy site" 按钮。

### 步骤 6：配置自定义域名（可选）

1. 在 "Domain settings" 中添加自定义域名
2. 配置 DNS 记录

## 部署到 GitHub Pages

GitHub Pages 是 GitHub 提供的免费静态网站托管服务。

### 步骤 1：配置 package.json

修改 `package.json` 中的脚本：

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "deploy": "npm run generate && gh-pages -d .output/public"
  }
}
```

### 步骤 2：安装 gh-pages

```bash
npm install --save-dev gh-pages
```

### 步骤 3：配置 nuxt.config.ts

修改 `nuxt.config.ts`：

```typescript
export default defineNuxtConfig({
  // ... 其他配置
  
  app: {
    baseURL: '/your-repo-name/', // 替换为你的仓库名
    head: {
      title: 'ZX Blog',
      // ... 其他配置
    }
  }
})
```

### 步骤 4：部署

```bash
npm run deploy
```

### 步骤 5：启用 GitHub Pages

1. 进入仓库的 "Settings"
2. 点击 "Pages"
3. 在 "Source" 下选择 "gh-pages" 分支
4. 保存后等待几分钟，你的网站将在 `https://your-username.github.io/your-repo-name/` 上线

## 部署到 Cloudflare Pages

Cloudflare Pages 提供快速的全球 CDN 网络。

### 步骤 1：准备代码

将代码推送到 Git 仓库。

### 步骤 2：在 Cloudflare Pages 中创建项目

1. 访问 [dash.cloudflare.com](https://dash.cloudflare.com)
2. 登录并选择 "Pages"
3. 点击 "Create a project"
4. 连接你的 Git 仓库

### 步骤 3：配置构建设置

```yaml
Build command: npm run build
Build output directory: .output/public
```

### 步骤 4：环境变量（可选）

添加需要的环境变量。

### 步骤 5：部署

点击 "Save and Deploy"。

## 部署到自己的服务器

如果你有自己的 VPS 或服务器，可以手动部署。

### 步骤 1：构建项目

```bash
npm run build
```

### 步骤 2：上传文件

将 `.output/public` 目录的内容上传到服务器的 web 根目录。

使用 SCP：

```bash
scp -r .output/public/* user@your-server:/var/www/html/
```

或使用 rsync：

```bash
rsync -avz .output/public/ user@your-server:/var/www/html/
```

### 步骤 3：配置 Web 服务器

#### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

#### Apache 配置示例

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/html

    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

### 步骤 4：使用 PM2 运行（可选）

如果需要运行 Node.js 版本：

```bash
npm install -g pm2
pm2 start .output/server/index.mjs --name "zx-blog"
pm2 save
pm2 startup
```

### 步骤 5：配置 SSL（推荐）

使用 Let's Encrypt 免费证书：

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 环境变量配置

### 在 nuxt.config.ts 中使用环境变量

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://api.example.com'
    }
  }
})
```

### 在组件中使用

```vue
<script setup>
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl
</script>
```

### 在不同平台设置环境变量

#### Vercel

在项目设置 → Environment Variables 中添加。

#### Netlify

在 Site settings → Environment variables 中添加。

#### GitHub Actions

在仓库设置 → Secrets 中添加。

## 常见问题

### 1. 构建失败

**问题**：部署时构建失败

**解决方案**：
- 检查 Node.js 版本是否符合要求
- 确保 `npm install` 成功运行
- 查看构建日志中的错误信息
- 确保 `nuxt.config.ts` 配置正确

### 2. 路由 404

**问题**：刷新页面后出现 404 错误

**解决方案**：
- 配置服务器的重写规则
- 确保所有路由都指向 `index.html`
- 参考上文中的 Nginx 或 Apache 配置

### 3. 图片无法加载

**问题**：部署后图片无法显示

**解决方案**：
- 检查图片路径是否正确
- 确保图片文件已上传到服务器
- 检查图片 URL 是否使用正确的域名

### 4. 样式丢失

**问题**：部署后样式没有加载

**解决方案**：
- 确保 CSS 文件已正确构建
- 检查浏览器控制台的错误信息
- 清除浏览器缓存后重试

### 5. 性能问题

**问题**：网站加载速度慢

**解决方案**：
- 启用 CDN
- 压缩图片资源
- 启用 Gzip 压缩
- 使用浏览器缓存
- 优化代码分割

## 性能优化建议

### 1. 启用 CDN

使用 Cloudflare、AWS CloudFront 或其他 CDN 服务加速内容分发。

### 2. 图片优化

- 使用 WebP 格式
- 实现图片懒加载
- 使用适当的图片尺寸

### 3. 缓存策略

配置适当的缓存头：

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 4. 代码分割

Nuxt.js 会自动进行代码分割，确保按需加载。

### 5. 预渲染关键路由

在 `nuxt.config.ts` 中配置：

```typescript
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    }
  }
})
```

## 监控和分析

### 1. Google Analytics

在 `nuxt.config.ts` 中添加：

```typescript
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `
        }
      ]
    }
  }
})
```

### 2. 错误监控

集成 Sentry 或其他错误监控服务。

## 备份策略

定期备份你的内容：

```bash
# 备份 content 目录
tar -czf content-backup-$(date +%Y%m%d).tar.gz content/

# 备份到远程服务器
scp content-backup-*.tar.gz user@backup-server:/backups/
```

## 更新和维护

### 更新依赖

```bash
npm update
npm run build
npm run generate
```

### 部署更新

根据你的部署方式，重新部署更新后的代码。

---

祝你部署顺利！如有问题，请参考各平台的官方文档或提交 Issue。
