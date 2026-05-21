"use client"

import DocArticle from '../components/DocArticle'
import { useTranslations } from '../../../lib/i18n'

export default function GettingStartedPage() {
  const { locale } = useTranslations()
  const isZh = locale === 'zh'

  return (
    <DocArticle
      title={isZh ? '快速开始' : 'Getting Started'}
      subtitle={isZh
        ? '用一句自然语言意图生成可执行的协议契约，再交给 Agent OS 或任意 agent 生成系统。'
        : 'Turn one natural-language intent into a deterministic protocol contract that agents can use to generate a system.'}
      sections={[
        {
          title: isZh ? '1. 调用公开 API' : '1. Call the Public API',
          body: isZh
            ? 'Cardity Core 已作为公开协议编译服务发布。Agent、脚本或产品后端都可以直接调用。'
            : 'Cardity Core is available as a public protocol compiler service for agents, scripts, and product backends.',
          code: {
            language: 'bash',
            code: `curl -sS https://api.cardity.org/v1/manifest

curl -sS https://api.cardity.org/v1/protocol/compile \\
  -H 'content-type: application/json' \\
  -d '{"source":"protocol InvoiceAgent { action create_invoice(customer: string, amount: int) -> invoice_id: string; }"}'`
          }
        },
        {
          title: isZh ? '2. 协议源只描述系统边界' : '2. Protocol Source Describes Boundaries',
          body: isZh
            ? '协议不是普通提示词。它把对象、动作、输入、输出、权限和状态变化固定成机器可读契约。'
            : 'A protocol is not a prompt. It fixes objects, actions, inputs, outputs, permissions, and state changes into a machine-readable contract.',
          code: {
            language: 'typescript',
            code: `protocol SupportDesk {
  role agent "customer support operator";

  entity Ticket {
    id: string;
    customer: string;
    status: "open" | "waiting" | "closed";
  }

  action triage(message: string) -> ticket: Ticket;
  action reply(ticket_id: string, draft: string) -> status: string;
}`
          }
        },
        {
          title: isZh ? '3. 把产物交给 agent' : '3. Give Artifacts to an Agent',
          bullets: isZh
            ? [
                'ABI：告诉 agent 可以调用哪些能力、参数和返回结构。',
                'Protocol JSON：告诉系统生成器实体、动作、状态和约束。',
                'Agent OS Manifest：告诉 pmtsoul-agent 这套协议如何变成任务、工具、页面和权限。'
              ]
            : [
                'ABI tells an agent which capabilities exist and how to call them.',
                'Protocol JSON gives system generators entities, actions, state, and constraints.',
                'Agent OS Manifest tells pmtsoul-agent how the protocol becomes tasks, tools, pages, and permissions.'
              ],
          code: {
            language: 'json',
            code: `{
  "artifacts": ["abi", "protocol_json", "agent_os_manifest"],
  "runtime": {
    "api": "https://api.cardity.org",
    "mcp": "https://api.cardity.org/mcp"
  }
}`
          }
        }
      ]}
      links={[
        { label: isZh ? '查看 API 参考' : 'Read the API Reference', href: `/docs/reference?lang=${locale}` },
        { label: isZh ? '了解 Agent 集成' : 'Agent Integration Guide', href: `/docs/developer-guide?lang=${locale}` }
      ]}
    />
  )
}
