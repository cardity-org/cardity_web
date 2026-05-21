"use client"

import DocArticle from '../components/DocArticle'
import { useTranslations } from '../../../lib/i18n'

export default function CLIPage() {
  const { locale } = useTranslations()
  const isZh = locale === 'zh'

  return (
    <DocArticle
      title={isZh ? 'CLI 与本地封装' : 'CLI and Local Wrappers'}
      subtitle={isZh
        ? 'CLI 不是协议层的唯一形态，但它适合本地开发、CI、私有 agent，以及把 Cardity 接入现有 Agent OS。'
        : 'The CLI is not the only shape of the protocol layer, but it is useful for local development, CI, private agents, and Agent OS integration.'}
      sections={[
        {
          title: isZh ? '核心命令模型' : 'Core Command Model',
          body: isZh
            ? 'CLI 应保持很薄：读取协议源，调用编译器，输出标准化产物。业务编排留给 agent 或上层系统。'
            : 'Keep the CLI thin: read protocol source, call the compiler, and emit standard artifacts. Orchestration belongs to agents or higher-level systems.',
          code: {
            language: 'bash',
            code: `cardity compile ./protocols/support.car \\
  --out ./dist/support.protocol.json \\
  --abi ./dist/support.abi.json \\
  --agent-os ./dist/support.agentos.json`
          }
        },
        {
          title: isZh ? 'MCP wrapper 形态' : 'MCP Wrapper Shape',
          body: isZh
            ? '如果目标 agent 不方便直接访问公网 API，可以用本地 MCP server 包装同一组能力。'
            : 'If an agent should not call the public API directly, wrap the same capabilities in a local MCP server.',
          code: {
            language: 'json',
            code: `{
  "mcpServers": {
    "cardity": {
      "command": "cardity-mcp",
      "args": ["--api", "https://api.cardity.org"]
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
                '示例输入能生成稳定的系统蓝图。'
              ]
            : [
                'Protocol source compiles.',
                'ABI has no breaking changes unless explicitly approved.',
                'Agent OS manifest can be parsed by pmtsoul-agent.',
                'Example inputs produce stable system blueprints.'
              ],
          code: {
            language: 'bash',
            code: `cardity validate ./protocols
cardity diff ./dist/main.abi.json ./baseline/main.abi.json
cardity agent-os check ./dist/main.agentos.json`
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
