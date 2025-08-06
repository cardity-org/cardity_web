# Cardity 官网部署指南

## 本地开发

### 环境要求

- Node.js 18+ 
- npm 或 yarn

### 安装和运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

## 生产部署

### Vercel (推荐)

1. **准备代码**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **部署到 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 导入 GitHub 仓库
   - 自动部署完成

### Netlify

1. **构建项目**
   ```bash
   npm run build
   npm run export
   ```

2. **部署到 Netlify**
   - 上传 `out` 目录到 Netlify
   - 或连接 GitHub 仓库自动部署

### 传统服务器

1. **构建项目**
   ```bash
   npm run build
   ```

2. **启动生产服务器**
   ```bash
   npm start
   ```

3. **使用 PM2 管理进程**
   ```bash
   npm install -g pm2
   pm2 start npm --name "cardity-website" -- start
   ```

## 环境变量

创建 `.env.local` 文件：

```env
# 网站配置
NEXT_PUBLIC_SITE_URL=https://cardity.org
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# 社交媒体链接
NEXT_PUBLIC_GITHUB_URL=https://github.com/cardity
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/carditylang
NEXT_PUBLIC_EMAIL=hello@cardity.org
```

## 自定义域名

### Vercel

1. 在 Vercel 项目设置中添加自定义域名
2. 配置 DNS 记录指向 Vercel

### 其他平台

根据平台要求配置 DNS 和 SSL 证书。

## 性能优化

### 图片优化

- 使用 Next.js Image 组件
- 压缩图片文件
- 使用 WebP 格式

### 代码分割

- Next.js 自动代码分割
- 使用动态导入减少包大小

### CDN

- 配置 CDN 加速静态资源
- 启用 Gzip 压缩

## 监控和分析

### 错误监控

- 集成 Sentry 进行错误追踪
- 配置日志收集

### 性能监控

- 使用 Google Analytics
- 配置 Core Web Vitals 监控

## 安全配置

### 安全头

在 `next.config.js` 中配置安全头：

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

### HTTPS

- 确保生产环境使用 HTTPS
- 配置 HSTS 头

## 备份策略

### 代码备份

- 使用 Git 版本控制
- 定期推送到远程仓库

### 数据备份

- 备份环境变量
- 备份配置文件

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本
   - 清理 node_modules 重新安装

2. **样式问题**
   - 检查 Tailwind CSS 配置
   - 确保所有依赖正确安装

3. **部署失败**
   - 检查环境变量配置
   - 查看构建日志

### 日志查看

```bash
# Vercel
vercel logs

# PM2
pm2 logs cardity-website
```

## 更新维护

### 定期更新

- 更新依赖包
- 检查安全漏洞
- 更新内容

### 版本管理

- 使用语义化版本
- 维护更新日志
- 测试新功能

## 联系支持

如有部署问题，请联系：

- GitHub Issues: [cardity/cardity-website](https://github.com/cardity/cardity-website/issues)
- Email: hello@cardity.org 