# Cardity 官网

这是 Cardity 编程语言的官方网站，使用 Next.js 和 Tailwind CSS 构建。

## 特性

- 🎨 现代化的响应式设计
- 📚 完整的文档系统
- 💻 代码高亮和示例
- 🔍 SEO 优化
- ⚡ 快速加载和性能优化

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **代码高亮**: React Syntax Highlighter
- **类型检查**: TypeScript

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 项目结构

```
cardity_web/
├── app/                    # Next.js App Router
│   ├── docs/              # 文档页面
│   ├── examples/          # 示例页面
│   ├── about/             # 关于页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── Header.tsx         # 网站头部
│   ├── Footer.tsx         # 网站底部
│   └── CodeBlock.tsx      # 代码块组件
├── public/                # 静态资源
└── package.json           # 项目配置
```

## 页面结构

- **首页** (`/`) - 介绍 Cardity 语言和核心特性
- **文档** (`/docs`) - 完整的开发文档
  - 快速开始 (`/docs/getting-started`)
  - 语言参考 (`/docs/reference`)
  - 标准库 (`/docs/standard-library`)
  - CLI 工具 (`/docs/cli`)
  - 部署指南 (`/docs/deploy`)
  - 开发者指南 (`/docs/developer-guide`)
- **示例** (`/examples`) - 代码示例和教程
- **关于** (`/about`) - 项目信息和团队介绍

## 自定义

### 颜色主题

在 `tailwind.config.js` 中修改颜色配置：

```javascript
colors: {
  cardity: {
    50: '#f0f9ff',
    // ... 其他色阶
  }
}
```

### 添加新页面

1. 在 `app/` 目录下创建新的文件夹
2. 添加 `page.tsx` 文件
3. 在导航组件中添加链接

### 添加新组件

1. 在 `components/` 目录下创建新的组件文件
2. 使用 TypeScript 定义接口
3. 添加适当的样式和功能

## 部署

### Vercel (推荐)

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署

### 其他平台

```bash
npm run build
npm start
```

## 贡献

我们欢迎社区贡献！请查看以下指南：

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系我们

- GitHub: [@cardity](https://github.com/cardity)
- Twitter: [@carditylang](https://twitter.com/carditylang)
- Email: hello@cardity.org 