# GitHub Actions 自动部署配置

## 使用 GitHub Actions 自动部署到 Vercel

### 第一步：获取 Vercel 凭证

1. 访问 [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. 点击 **"Create"**
3. 输入 token 名称（如：`GitHub Actions`）
4. 点击 **"Create"**
5. 复制生成的 token

### 第二步：获取项目 ID

1. 访问 [vercel.com](https://vercel.com)
2. 进入你的 `zx-blog` 项目
3. 点击 **"Settings"** → **"General"**
4. 找到 **"Project ID"** 并复制

### 第三步：配置 GitHub Secrets

1. 访问你的 GitHub 仓库：`https://github.com/zhouxinnana/zx-blog/settings/secrets/actions`
2. 点击 **"New repository secret"**
3. 添加以下 secrets：

   **Secret 1:**
   - Name: `VERCEL_TOKEN`
   - Value: 粘贴第一步复制的 token

   **Secret 2:**
   - Name: `ORG_ID`
   - Value: 粘贴第二步复制的组织 ID（如果有的话，否则留空）

   **Secret 3:**
   - Name: `PROJECT_ID`
   - Value: 粘贴第二步复制的项目 ID

### 第四步：推送代码

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions for auto deployment"
git push
```

### 第五步：完成！

现在每次你推送代码到 `main` 分支，GitHub Actions 会自动：
1. 检出代码
2. 安装依赖
3. 构建项目
4. 部署到 Vercel

你可以在 GitHub 仓库的 **"Actions"** 标签页查看部署状态。

---

## 手动触发部署

如果需要手动触发部署（不推送代码）：

1. 访问 GitHub 仓库的 **"Actions"** 标签页
2. 选择 **"Deploy to Vercel"** workflow
3. 点击 **"Run workflow"** 按钮
4. 点击 **"Run workflow"** 确认

---

## 推荐方案对比

### 方案 1：Vercel 原生自动部署（最简单）
- ✅ 零配置，导入项目即自动部署
- ✅ Webhook 自动触发
- ✅ 每个 PR 都有预览链接
- ❌ 需要在 Vercel 控制台查看部署日志

### 方案 2：GitHub Actions 自动部署（更灵活）
- ✅ 在 GitHub 查看部署日志
- ✅ 可以自定义部署流程
- ✅ 支持手动触发
- ❌ 需要配置 secrets
- ❌ 需要创建 workflow 文件

---

## 我的建议

**如果你想要最简单的方式：使用 Vercel 原生自动部署**

直接在 Vercel 导入项目，不需要任何额外配置，每次推送代码自动部署。

**如果你想要更多控制：使用 GitHub Actions**

按照上面的步骤配置 secrets，推送代码后自动部署。
