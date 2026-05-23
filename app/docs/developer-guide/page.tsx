"use client"

import DocArticle from '../components/DocArticle'
import { useTranslations } from '../../../lib/i18n'

export default function DeveloperGuidePage() {
  const { locale } = useTranslations()
  const isZh = locale === 'zh'

  return (
    <DocArticle
      title={isZh ? 'Agent 集成指南' : 'Agent Integration Guide'}
      subtitle={isZh
        ? 'Cardity 的目标是成为 agent 生成系统前的协议层：先固化系统契约，再让 agent 写代码、建页面、接工具。'
        : 'Cardity is the protocol layer before agents generate systems: lock the system contract first, then let agents write code, create pages, and wire tools.'}
      sections={[
        {
          title: isZh ? '与 pmtsoul-agent 对接' : 'Integrating with pmtsoul-agent',
          body: isZh
            ? 'pmtsoul-agent 可以把 Agent OS manifest 当作底层规划输入：生成 API、数据库表、read models、工具定义、页面结构、权限模型、workflow 和验收检查。'
            : 'pmtsoul-agent can use the Agent OS manifest as planning input for APIs, database tables, read models, tool definitions, page structure, permission models, workflows, and acceptance checks.',
          code: {
            language: 'json',
            code: `{
  "runtime": "pmtsoul-agent",
  "inputs": {
    "protocol_json": "./dist/app.protocol.json",
    "abi": "./dist/app.abi.json",
    "agent_os_manifest": "./dist/app.agentos.json"
  },
  "outputs": ["api", "database", "read_models", "ui", "workflows", "tests"]
}`
          }
        },
        {
          title: isZh ? '推荐生成流程' : 'Recommended Generation Flow',
          bullets: isZh
            ? [
                '用户一句话描述系统目标。',
                'LLM 先生成 Cardity 协议源，而不是直接写完整项目。',
                'Cardity Core 编译并返回 ABI、protocol JSON 和 Agent OS manifest。',
                'pmtsoul-agent 基于 manifest.system.api、database、ui、workflows、permissions 生成项目结构。',
                '工程 agent 再执行代码实现、测试和部署。'
              ]
            : [
                'User describes the system goal in one sentence.',
                'The LLM generates Cardity protocol source before writing a full project.',
                'Cardity Core compiles ABI, protocol JSON, and Agent OS manifest.',
                'pmtsoul-agent generates project structure from manifest.system.api, database, ui, workflows, and permissions.',
                'Implementation agents then write, test, and deploy code.'
              ]
        },
        {
          title: isZh ? 'Projection contract v1.1 baseline' : 'Projection Contract v1.1 Baseline',
          body: isZh
            ? 'PMTSoul Agent OS 已将商户 ERP demo 对齐并验证 Cardity projection contract v1.1。后端已校验 runtime_fields、confirmed_readback idempotency、write_index、composite merchant-scoped keys 和 query contracts。'
            : 'PMTSoul Agent OS has aligned and validated the first merchant ERP demo against Cardity projection contract v1.1. The backend now validates runtime_fields, confirmed_readback idempotency, write_index, composite merchant-scoped keys, and query contracts.',
          code: {
            language: 'json',
            code: `{
  "contract": "cardity.projection_contract.v1.1",
  "read_models": ["merchant_products", "merchant_inventory", "merchant_orders"],
  "operations": ["insert", "upsert_delta", "upsert_snapshot", "delete", "soft_delete"],
  "runtime_fields": ["id", "write_index", "source_run_id", "idempotency_key"],
  "queries": ["products.list", "orders.list", "inventory.summary"],
  "idempotency": ["source_id", "source_run_id", "projection_version", "write_index"]
}`
          }
        },
        {
          title: isZh ? '双方校验边界' : 'Validation Boundary',
          bullets: isZh
            ? [
                'Cardity 保证生成的 projection 里所有 $event.* 都来自声明过的 event params 或 runtime_fields。',
                'PMTSoul Agent OS 校验 manifest 入库、template upsert 和 projection replay guard。',
                'confirmed_readback projection 必须使用 idempotency.source_id = $event.id。',
                '所有 replay-safe projection 必须使用 idempotency.write_index = $event.write_index。'
              ]
            : [
                'Cardity guarantees every $event.* reference in generated projections comes from declared event params or runtime_fields.',
                'PMTSoul Agent OS validates manifest persistence, template upserts, and projection replay guards.',
                'confirmed_readback projections must use idempotency.source_id = $event.id.',
                'Replay-safe projections must use idempotency.write_index = $event.write_index.'
              ]
        },
        {
          title: isZh ? 'Agent 如何配置 Cardity' : 'How Agents Configure Cardity',
          body: isZh
            ? 'Cardity 不强制必须是 MCP server 或 CLI。公网 agent 优先使用 hosted MCP；私有 workspace、CI 或离线环境可以用 CLI 或本地 MCP wrapper。'
            : 'Cardity does not require MCP or CLI specifically. Public agents can prefer hosted MCP; private workspaces, CI, or offline environments can use the CLI or a local MCP wrapper.',
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
          title: isZh ? '失败处理' : 'Failure Handling',
          bullets: isZh
            ? [
                '如果协议源含糊，返回 diagnostics 给 LLM 修复。',
                '如果 ABI 破坏兼容，要求用户确认。',
                '如果 manifest 缺少 read model、projection 或 query contract，pmtsoul-agent 应暂停生成并请求补全。',
                '线上 API 保持无状态，业务上下文由调用方保存。'
              ]
            : [
                'If protocol source is ambiguous, return diagnostics for the LLM to repair.',
                'If the ABI breaks compatibility, require user approval.',
                'If the manifest lacks read models, projections, or query contracts, pmtsoul-agent should pause and request completion.',
                'The public API stays stateless; callers own business context.'
              ]
        }
      ]}
      links={[
        { label: isZh ? '快速开始' : 'Getting Started', href: `/docs/getting-started?lang=${locale}` },
        { label: isZh ? '发布协议层' : 'Publish the Protocol Layer', href: `/docs/deploy?lang=${locale}` }
      ]}
    />
  )
}
