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
            ? 'Cardity Core 已作为公开协议编译服务发布。Agent、脚本或产品后端都可以先发现 manifest，再提交协议源。'
            : 'Cardity Core is available as a public protocol compiler service for agents, scripts, and product backends. Discover the manifest first, then submit protocol source.',
          code: {
            language: 'bash',
            code: `curl -sS https://api.cardity.org/v1/manifest

curl -sS https://api.cardity.org/v1/compile \\
  -H 'content-type: application/json' \\
  -d '{"source_text":"protocol Counter { version: \\\"1.0.0\\\"; state { count: int = 0; } method get_count() { state.count = state.count; } returns: int state.count; }","include_manifest":true}'`
          }
        },
        {
          title: isZh ? '2. 协议源描述系统契约' : '2. Protocol Source Describes the Contract',
          body: isZh
            ? '协议不是普通提示词。它把 state、event、method、returns、table 和权限确认要求固定成机器可读契约。'
            : 'A protocol is not a prompt. It fixes state, events, methods, returns, tables, and permission expectations into a machine-readable contract.',
          code: {
            language: 'typescript',
            code: `protocol MemberPointsSystem {
  version: "1.0.0";
  owner: "agent-os";

  state {
    admin_addr: address = "doge1admin...";
    total_points_issued: int = 0;
    result: string = "ok";
  }

  event PointsEarned { user: address; amount: int; reason: string; }

  method earn_points(user: address, amount: int, reason: string) {
    state.result = "ok";
    if (params.amount <= 0) { state.result = "InvalidAmount" }
    if (state.result == "ok") { state.total_points_issued = state.total_points_issued + params.amount }
    if (state.result == "ok") { emit PointsEarned(params.user, params.amount, params.reason) }
  }
  returns: string state.result;
}`
          }
        },
        {
          title: isZh ? '3. 把产物交给 agent' : '3. Give Artifacts to an Agent',
          bullets: isZh
            ? [
                'ABI：告诉 agent 可以调用哪些 method、参数和返回结构。',
                'Protocol JSON：告诉系统生成器 state、methods、events、tables 和约束。',
                'Agent OS Manifest：告诉 pmtsoul-agent 这套协议如何变成 API、数据库、页面、权限、workflow 和 projection。'
              ]
            : [
                'ABI tells an agent which methods exist and how to call them.',
                'Protocol JSON gives system generators state, methods, events, tables, and constraints.',
                'Agent OS Manifest tells pmtsoul-agent how the protocol becomes API routes, database tables, pages, permissions, workflows, and projections.'
              ],
          code: {
            language: 'json',
            code: `{
  "artifacts": ["abi", "protocol_json", "agent_os_manifest"],
  "database": ["tables", "read_models", "projections", "queries"],
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
