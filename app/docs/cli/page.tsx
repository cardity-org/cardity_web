"use client"

import DocArticle from '../components/DocArticle'
import { useTranslations } from '../../../lib/i18n'

export default function CLIPage() {
  const { locale } = useTranslations()
  const isZh = locale === 'zh'

  return (
    <DocArticle
      title={isZh ? 'CLI 与 MCP' : 'CLI and MCP'}
      subtitle={isZh
        ? 'Cardity 不要求协议层必须是 MCP server 或 CLI；公网 agent 优先使用 hosted MCP，本地和 CI 再使用 CLI wrapper。'
        : 'Cardity does not require the protocol layer to be MCP or CLI. Public agents can prefer hosted MCP; local and CI flows can use the CLI wrapper.'}
      sections={[
        {
          title: isZh ? '核心命令模型' : 'Core Command Model',
          body: isZh
            ? 'CLI 应保持很薄：读取协议源，调用编译器，输出 ABI、protocol JSON、Agent OS manifest 和可选 .carc。业务编排留给 agent 或上层系统。'
            : 'Keep the CLI thin: read protocol source, call the compiler, and emit ABI, protocol JSON, Agent OS manifest, and optional .carc artifacts. Orchestration belongs to agents or higher-level systems.',
          code: {
            language: 'bash',
            code: `node bin/cardity_agent.js compile ./protocols/member_points.car \\
  --out-dir ./dist \\
  --name member_points \\
  --include-manifest \\
  --include-protocol \\
  --include-abi`
          }
        },
        {
          title: isZh ? 'Hosted MCP 配置' : 'Hosted MCP Configuration',
          body: isZh
            ? '支持远程 MCP 的 agent 可以直接挂载 api.cardity.org。'
            : 'Agents that support remote MCP can mount api.cardity.org directly.',
          code: {
            language: 'json',
            code: `{
  "mcpServers": {
    "cardity_core": {
      "url": "https://api.cardity.org/mcp"
    }
  }
}`
          }
        },
        {
          title: isZh ? '本地 MCP wrapper' : 'Local MCP Wrapper',
          body: isZh
            ? '如果 agent 需要访问本地文件、私有 workspace 或离线环境，可以运行本地 MCP wrapper。'
            : 'If an agent needs local files, private workspaces, or offline operation, run the local MCP wrapper.',
          code: {
            language: 'json',
            code: `{
  "mcpServers": {
    "cardity_core_local": {
      "command": "node",
      "args": ["/path/to/cardity-core/bin/cardity_mcp_server.js"]
    }
  }
}`
          }
        },
        {
          title: isZh ? 'CI 中的协议检查' : 'Protocol Checks in CI',
          bullets: isZh
            ? [
                '协议源能编译。',
                'ABI 没有破坏性变更，或者变更被显式批准。',
                'Agent OS manifest 能被 pmtsoul-agent 解析。',
                'Projection contract v1.1 字段完整：tables、read_models、projections、queries。',
                '示例输入能生成稳定的系统蓝图。'
              ]
            : [
                'Protocol source compiles.',
                'ABI has no breaking changes unless explicitly approved.',
                'Agent OS manifest can be parsed by pmtsoul-agent.',
                'Projection contract v1.1 fields are complete: tables, read_models, projections, queries.',
                'Example inputs produce stable system blueprints.'
              ],
          code: {
            language: 'bash',
            code: `node bin/cardity_agent.js compile ./examples/03_merchant_erp_agent.car \\
  --out-dir ./dist --name merchant_erp --include-manifest --include-protocol --include-abi

jq '.manifest.system.database | keys' ./dist/merchant_erp.compile.json`
          }
        }
      ]}
      links={[
        { label: isZh ? '部署与发布' : 'Deployment and Publishing', href: `/docs/deploy?lang=${locale}` },
        { label: isZh ? '开发者集成' : 'Developer Integration', href: `/docs/developer-guide?lang=${locale}` }
      ]}
    />
  )
}
