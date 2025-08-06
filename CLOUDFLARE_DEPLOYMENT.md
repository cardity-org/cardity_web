# Cloudflare Pages 部署指南

本指南将帮助你使用 Cloudflare Pages 部署 Cardity 官网。

## 🚀 快速部署

### 方法一：通过 Cloudflare Dashboard（推荐）

1. **登录 Cloudflare Dashboard**
   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 登录你的账户

2. **创建 Pages 项目**
   - 点击左侧菜单的 "Pages"
   - 点击 "Create a project"
   - 选择 "Connect to Git"

3. **连接 GitHub 仓库**
   - 选择 GitHub 作为 Git 提供商
   - 授权 Cloudflare 访问你的 GitHub 账户
   - 选择 `cardity-org/cardity_web` 仓库

4. **配置构建设置**
   ```
   Project name: cardity-web
   Production branch: main
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: out
   Root directory: /
   ```

5. **环境变量配置**
   ```
   NODE_ENV: production
   NODE_VERSION: 18
   ```

6. **部署设置**
   - 点击 "Save and Deploy"
   - Cloudflare 将自动构建和部署你的网站

### 方法二：使用 Wrangler CLI

1. **安装 Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**
   ```bash
   wrangler login
   ```

3. **构建项目**
   ```bash
   npm run build
   ```

4. **部署到 Cloudflare Pages**
   ```bash
   wrangler pages deploy out
   ```

## ⚙️ 配置选项

### 自定义域名

1. **在 Cloudflare Dashboard 中**
   - 进入 Pages 项目设置
   - 点击 "Custom domains"
   - 添加你的域名（如 `cardity.org`）

2. **DNS 配置**
   - 确保域名指向 Cloudflare
   - 添加 CNAME 记录指向 Pages 项目

### 环境变量

在 Cloudflare Dashboard 的项目设置中添加：

```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://cardity.org
NEXT_PUBLIC_GITHUB_URL=https://github.com/cardity-org/cardity-core
```

### 构建优化

1. **缓存配置**
   - 静态资源自动缓存
   - 图片和 CSS/JS 文件优化

2. **性能优化**
   - 自动 CDN 分发
   - 边缘计算优化
   - 图片自动优化

## 🔧 高级配置

### 重定向规则

在 `wrangler.toml` 中配置：

```toml
[[redirects]]
from = "/docs"
to = "/docs/getting-started"
status = 301

[[redirects]]
from = "/old-page"
to = "/new-page"
status = 302
```

### 安全头部

```toml
[[headers]]
for = "/*"
[headers.values]
X-Frame-Options = "DENY"
X-Content-Type-Options = "nosniff"
Referrer-Policy = "strict-origin-when-cross-origin"
Strict-Transport-Security = "max-age=31536000; includeSubDomains"
```

### 缓存策略

```toml
[[headers]]
for = "/_next/static/*"
[headers.values]
Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
for = "/images/*"
[headers.values]
Cache-Control = "public, max-age=86400"
```

## 📊 监控和分析

### 性能监控

1. **Web Vitals**
   - 自动收集 Core Web Vitals
   - 性能指标监控

2. **错误追踪**
   - 自动错误报告
   - 实时监控

### 分析工具

1. **Cloudflare Analytics**
   - 内置分析工具
   - 隐私友好的统计

2. **Google Analytics**
   - 可集成 GA4
   - 自定义事件追踪

## 🔄 持续部署

### 自动部署

1. **GitHub 集成**
   - 推送到 `main` 分支自动部署
   - 预览分支自动创建

2. **分支策略**
   - `main` → 生产环境
   - `develop` → 预览环境
   - `feature/*` → 功能预览

### 部署检查

1. **构建状态**
   - 自动构建检查
   - 部署状态通知

2. **回滚功能**
   - 一键回滚到之前版本
   - 部署历史记录

## 🛠️ 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 检查构建日志
   npm run build
   
   # 清理缓存
   rm -rf .next out
   npm run build
   ```

2. **部署失败**
   - 检查 `wrangler.toml` 配置
   - 验证环境变量
   - 查看构建日志

3. **性能问题**
   - 检查图片优化
   - 验证缓存配置
   - 分析 Core Web Vitals

### 调试工具

1. **本地测试**
   ```bash
   npm run build
   npx serve out
   ```

2. **Cloudflare 调试**
   - 使用 Cloudflare 开发者工具
   - 检查网络请求
   - 验证缓存命中

## 📈 性能优化

### 最佳实践

1. **图片优化**
   - 使用 WebP 格式
   - 启用自动优化
   - 配置响应式图片

2. **代码分割**
   - 自动代码分割
   - 懒加载组件
   - 预加载关键资源

3. **缓存策略**
   - 静态资源长期缓存
   - 动态内容适当缓存
   - 缓存失效策略

### 监控指标

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## 🔐 安全配置

### 安全头部

```toml
[[headers]]
for = "/*"
[headers.values]
X-Frame-Options = "DENY"
X-Content-Type-Options = "nosniff"
Referrer-Policy = "strict-origin-when-cross-origin"
X-XSS-Protection = "1; mode=block"
Strict-Transport-Security = "max-age=31536000; includeSubDomains"
Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
```

### SSL/TLS 配置

- 自动 SSL 证书
- 强制 HTTPS
- HSTS 头部

## 📞 支持

### 资源链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)

### 联系支持

- Cloudflare 支持: [support.cloudflare.com](https://support.cloudflare.com)
- 项目问题: [GitHub Issues](https://github.com/cardity-org/cardity_web/issues)

---

**部署完成后，你的网站将在 Cloudflare 的全球 CDN 网络上运行，享受极快的加载速度和强大的安全保护！** 🚀 