# Cardity Web

这是 Cardity Core 的官方网站，使用 Next.js 静态导出和 Cloudflare Pages 部署。

## 当前定位

Cardity 是 AI Agent 生成系统前的协议契约层。官网负责解释并展示：

- `.car` protocol
- Compiler / Protocol JSON / ABI
- Agent OS Manifest
- Action Contract
- Projection Contract
- Conformance
- Registry / Package / Runtime compatibility
- Hosted API / MCP / WASM

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **代码高亮**: React Syntax Highlighter
- **类型检查**: TypeScript

## 生产部署地图

| 项目 | 值 |
| --- | --- |
| GitHub repo | `cardity-org/cardity_web` |
| Cloudflare account | `Seven.psong@gmail.com's Account` |
| 正式 Pages project | `cardity-org-web` |
| 正式域名 | `https://cardity.org` |
| www 跳转 | `https://www.cardity.org` -> `https://cardity.org` |
| Pages 预览域 | `https://cardity-org-web.pages.dev` |
| 构建输出 | `out/` |
| Pages headers | `public/_headers` |
| Pages redirects | `public/_redirects` |

注意：Cloudflare 上还存在旧项目 `cardity-web`，它没有绑定正式域名。不要把生产官网手动部署到 `cardity-web`。

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
├── public/                # 静态资源、_headers、_redirects
├── locales/               # 中英文文案
└── package.json           # 项目配置
```

## 页面结构

- **首页** (`/`) - 介绍 Cardity Core 和协议契约层能力
- **文档** (`/docs`) - 完整的开发文档
  - 快速开始 (`/docs/getting-started`)
  - 语言参考 (`/docs/reference`)
  - 标准库 (`/docs/standard-library`)
  - CLI 工具 (`/docs/cli`)
  - 部署指南 (`/docs/deploy`)
  - 开发者指南 (`/docs/developer-guide`)
- **示例** (`/examples`) - 代码示例和教程
- **Registry** (`/registry`) - 生态注册表、schemas、runtime badges、packages
- **Visualizer** (`/visualizer`) - 粘贴 Agent OS manifest 并预览三层契约图
- **关于** (`/about`) - 项目信息和团队介绍

## 部署

### 正式部署

```bash
npm run deploy:cloudflare
```

该命令会构建并部署到正式 Pages project：

```bash
wrangler pages deploy out --project-name=cardity-org-web --branch=main
```

### Staging 部署

```bash
npm run deploy:cloudflare:staging
```

### 手动验证

部署后至少验证：

```bash
curl -sSI https://cardity.org/
curl -sSI https://cardity.org/docs
curl -sSI https://www.cardity.org/
```

预期：

- `https://cardity.org/` 返回 `200`
- `https://cardity.org/docs` 返回 `301` 到 `/docs/getting-started`
- `https://www.cardity.org/` 返回 `301` 到 `https://cardity.org/`
- 响应包含 `Strict-Transport-Security`、`X-Frame-Options`、`X-Content-Type-Options`

## 开发约定

- 默认修改 `locales/en/*.json` 和 `locales/zh/*.json`，保持双语内容同步。
- 新增公开页面时同步检查 header/footer 导航。
- 不要在 `wrangler.toml` 里放 Pages `headers` / `redirects`，使用 `public/_headers` 和 `public/_redirects`。
- 页面上线前至少运行：

```bash
npm run build
git diff --check
```

## 贡献

我们欢迎社区贡献！请查看以下指南：

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License.

## 联系我们

- GitHub: [@cardity](https://github.com/cardity)
- X: [@song_doge](https://x.com/song_doge)
- Email: hello@cardity.org
