"use client"

import DocArticle from '../components/DocArticle'
import { useTranslations } from '../../../lib/i18n'

export default function ReferencePage() {
  const { locale } = useTranslations()
  const isZh = locale === 'zh'

  return (
    <DocArticle
      title={isZh ? 'API 与协议参考' : 'API and Protocol Reference'}
      subtitle={isZh
        ? 'Cardity Core 的稳定接口围绕 manifest、compile、ABI、协议 JSON 和 Agent OS manifest。'
        : 'Cardity Core exposes stable interfaces around manifest, compile, ABI, protocol JSON, and Agent OS manifests.'}
      sections={[
        {
          title: isZh ? '服务发现' : 'Service Discovery',
          body: isZh
            ? '先读取 manifest，agent 可以知道当前 API 版本、工具列表和推荐调用方式。'
            : 'Start with the manifest so agents can discover API version, tools, and recommended invocation shape.',
          code: {
            language: 'bash',
            code: `curl -sS https://api.cardity.org/v1/manifest`
          }
        },
        {
          title: isZh ? '编译协议' : 'Compile a Protocol',
          body: isZh
            ? '输入 Cardity 协议源，输出一组 deterministic artifacts。协议源越精确，agent 生成的系统越稳定。'
            : 'Submit Cardity protocol source and receive deterministic artifacts. More precise protocol source produces more stable agent-generated systems.',
          code: {
            language: 'json',
            code: `{
  "source": "protocol CRM { entity Lead { id: string; email: string; } action qualify(email: string) -> lead: Lead; }",
  "artifacts": ["abi", "protocol_json", "agent_os_manifest"]
}`
          }
        },
        {
          title: isZh ? '协议源结构' : 'Protocol Source Structure',
          bullets: isZh
            ? [
                'entity 定义系统对象。',
                'action 定义 agent 可以执行的能力。',
                'policy 定义权限、审计和约束。',
                'view 定义可生成的页面或面板。',
                'workflow 定义多步骤自动化。'
              ]
            : [
                'entity defines system objects.',
                'action defines capabilities agents can execute.',
                'policy defines permissions, audit rules, and constraints.',
                'view defines pages or panels that can be generated.',
                'workflow defines multi-step automations.'
              ],
          code: {
            language: 'typescript',
            code: `protocol CRM {
  entity Lead {
    id: string;
    email: string;
    stage: "new" | "qualified" | "lost";
  }

  action qualify(email: string) -> lead: Lead;
  action assign(lead_id: string, owner_id: string) -> status: string;

  policy require_audit for action assign;
  view lead_pipeline uses Lead;
}`
          }
        },
        {
          title: isZh ? 'MCP 工具' : 'MCP Tools',
          body: isZh
            ? '支持 MCP 的 agent 可以通过远程 MCP endpoint 调用同样的能力，不需要单独集成 REST 客户端。'
            : 'MCP-capable agents can call the same capabilities through the remote MCP endpoint without a separate REST client.',
          code: {
            language: 'bash',
            code: `curl -sS https://api.cardity.org/mcp \\
  -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'`
          }
        }
      ]}
      links={[
        { label: isZh ? '快速开始' : 'Getting Started', href: `/docs/getting-started?lang=${locale}` },
        { label: isZh ? 'Agent 集成指南' : 'Agent Integration Guide', href: `/docs/developer-guide?lang=${locale}` }
      ]}
    />
  )
}
