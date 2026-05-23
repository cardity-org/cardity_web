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
        ? 'Cardity Core 的稳定接口围绕 manifest、compile、ABI、protocol JSON、Agent OS manifest、agent action contract v1、projection contract v1.1 与 schema conformance。'
        : 'Cardity Core exposes stable interfaces around manifest, compile, ABI, protocol JSON, Agent OS manifests, agent action contract v1, projection contract v1.1, and schema conformance.'}
      sections={[
        {
          title: isZh ? '服务发现' : 'Service Discovery',
          body: isZh
            ? '先读取 manifest，agent 可以知道当前 API 版本、工具列表和推荐调用方式。'
            : 'Start with the manifest so agents can discover API version, tools, and recommended invocation shape.',
          code: {
            language: 'bash',
            code: `curl -sS https://api.cardity.org/v1/manifest
curl -sS https://api.cardity.org/edge-health`
          }
        },
        {
          title: isZh ? '编译协议' : 'Compile a Protocol',
          body: isZh
            ? '输入 Cardity 协议源，输出 deterministic artifacts。协议源越精确，agent 生成的系统越稳定。'
            : 'Submit Cardity protocol source and receive deterministic artifacts. More precise protocol source produces more stable agent-generated systems.',
          code: {
            language: 'json',
            code: `{
  "source_text": "protocol Counter { version: \\\"1.0.0\\\"; state { count: int = 0; } method get_count() { state.count = state.count; } returns: int state.count; }",
  "include_abi": true,
  "include_protocol": true,
  "include_manifest": true
}`
          }
        },
        {
          title: isZh ? '协议源结构' : 'Protocol Source Structure',
          bullets: isZh
            ? [
                'state 定义协议运行状态和默认值。',
                'table 定义 Agent OS 可消费的数据表或 read model schema。',
                'event 定义可投影到 read model、ledger 或 workflow 的业务事实。',
                'method 定义 agent 可以调用的能力，并通过 returns 显式声明返回值。',
                'emit 语句让 manifest 可以生成 workflow 和 projection hints。'
              ]
            : [
                'state defines protocol runtime state and defaults.',
                'table defines database tables or read-model schemas for Agent OS runtimes.',
                'event defines business facts that can project into read models, ledgers, or workflows.',
                'method defines callable agent capabilities and declares returns explicitly.',
                'emit statements let the manifest generate workflow and projection hints.'
              ],
          code: {
            language: 'typescript',
            code: `protocol MerchantERPSystem {
  version: "1.0.0";
  owner: "agent-os";

  state { result: string = "ok"; }

  table merchant_products {
    merchant_id: string;
    goods_id: string;
    name: string = "";
    status: string = "active";
  }

  event ProductSaved { merchant_id: string; goods_id: string; }

  method save_product(merchant_id: string, goods_id: string) {
    state.result = "ok";
    emit ProductSaved(params.merchant_id, params.goods_id);
  }
  returns: string state.result;
}`
          }
        },
        {
          title: isZh ? 'Agent action contract v1' : 'Agent Action Contract v1',
          bullets: isZh
            ? [
                'action.kind 使用 query、command 或 external_navigation。',
                'intent_names、intent_examples、disambiguation_keys 和 required_context 给 planner 提供稳定提示。',
                'input_schema、output_schema 或 returns_read_model 让 runtime 不需要猜输入输出。',
                'permission、confirm_required、dry_run_supported、readback_required 和 readback_query 描述执行边界。',
                'idempotency_key、risk_level、side_effects、audit_event 和 replay_policy 描述安全与重放语义。',
                'system.modules[].intent_names 与 system.external.navigation/services 让外部导航和服务保持通用。'
              ]
            : [
                'action.kind is query, command, or external_navigation.',
                'intent_names, intent_examples, disambiguation_keys, and required_context give planners stable hints.',
                'input_schema, output_schema, or returns_read_model remove input/output guesswork for runtimes.',
                'permission, confirm_required, dry_run_supported, readback_required, and readback_query describe execution boundaries.',
                'idempotency_key, risk_level, side_effects, audit_event, and replay_policy describe safety and replay semantics.',
                'system.modules[].intent_names plus system.external.navigation/services keep external navigation and services generic.'
              ],
          code: {
            language: 'json',
            code: `{
  "kind": "command",
  "intent_names": ["publish_product"],
  "input_schema": { "type": "object" },
  "permission": null,
  "confirm_required": true,
  "dry_run_supported": true,
  "readback_required": true,
  "readback_query": "products.detail",
  "idempotency_key": "$run.id",
  "risk_level": "medium",
  "replay_policy": { "mode": "idempotent_command" }
}`
          }
        },
        {
          title: isZh ? 'Projection contract v1.1' : 'Projection Contract v1.1',
          bullets: isZh
            ? [
                '支持 insert、upsert_delta、upsert_snapshot、delete 和 soft_delete。',
                '支持 composite primary keys 与显式 tenant keys，例如 ["merchant_id", "goods_id"]。',
                'schema 会随 projection 一起输出 columns、primary keys、indexes、nullable/default。',
                '支持 $ctx.merchant_id、$ctx.workspace_id、$run.id、$readback.* 等表达式。',
                '支持 confirmed_readback 作为 write commit 后的 projection source。',
                'events[].runtime_fields 显式声明 id、write_index、source_run_id 和 idempotency_key。',
                '编译器会校验 projection 中所有 $event.* 引用都来自 event params 或 runtime_fields。',
                '使用 source_id/source_run_id/projection_version/write_index 保障 replay-safe idempotency。'
              ]
            : [
                'Supports insert, upsert_delta, upsert_snapshot, delete, and soft_delete.',
                'Supports composite primary keys and explicit tenant keys such as ["merchant_id", "goods_id"].',
                'Emits table schema with columns, primary keys, indexes, nullable, and default metadata.',
                'Supports expressions such as $ctx.merchant_id, $ctx.workspace_id, $run.id, and $readback.*.',
                'Supports confirmed_readback as the projection source after a write commit.',
                'events[].runtime_fields explicitly declares id, write_index, source_run_id, and idempotency_key.',
                'The compiler validates that every $event.* reference in projections comes from event params or runtime_fields.',
                'Uses source_id/source_run_id/projection_version/write_index for replay-safe idempotency.'
              ],
          code: {
            language: 'json',
            code: `{
  "name": "product_saved_snapshot",
  "version": "1.1",
  "source": "confirmed_readback",
  "source_id": "$event.id",
  "idempotency": {
    "source_id": "$event.id",
    "source_run_id": "$event.source_run_id",
    "projection_version": "$projection.version",
    "write_index": "$event.write_index"
  },
  "on": { "event": "ProductSaved" },
  "writes": [{
    "table": "merchant_products",
    "operation": "upsert_snapshot",
    "key": ["merchant_id", "goods_id"],
    "values": {
      "merchant_id": "$ctx.merchant_id",
      "goods_id": "$readback.goods_id",
      "source_run_id": "$run.id"
    }
  }]
}`
          }
        },
        {
          title: isZh ? 'Event runtime_fields' : 'Event runtime_fields',
          body: isZh
            ? '当 projection 使用 $event.id 或 $event.write_index 时，对应 trigger event 必须显式声明这些 runtime 字段。Cardity Core 与 Cloudflare Worker 编译路径都会执行这个检查。'
            : 'When a projection uses $event.id or $event.write_index, the trigger event must explicitly declare those runtime fields. Cardity Core enforces this in both the native compiler and Cloudflare Worker compiler paths.',
          code: {
            language: 'json',
            code: `{
  "name": "ProductSaved",
  "params": [
    { "name": "merchant_id", "type": "string" },
    { "name": "goods_id", "type": "string" }
  ],
  "runtime_fields": [
    { "name": "id", "type": "string", "required": true, "source": "runtime" },
    { "name": "write_index", "type": "int", "required": true, "source": "runtime" },
    { "name": "source_run_id", "type": "string", "required": true, "source": "runtime" },
    { "name": "idempotency_key", "type": "string", "required": true, "source": "runtime" }
  ]
}`
          }
        },
        {
          title: isZh ? 'Schemas 与 conformance' : 'Schemas and Conformance',
          body: isZh
            ? 'v0.1.0-alpha.1 将 schema 和本地 conformance scripts 固化到仓库。下游 Agent runtime 可以在接入或升级前复用同一组检查。'
            : 'v0.1.0-alpha.1 ships schema files and local conformance scripts in the repository. Downstream Agent runtimes can reuse the same checks before integrating or upgrading.',
          code: {
            language: 'text',
            code: `schemas/agent_manifest_v1.schema.json
schemas/agent_action_contract_v1.schema.json
schemas/projection_contract_v1_1.schema.json
node scripts/verify_contract_schemas.js`
          }
        },
        {
          title: isZh ? 'MCP 工具' : 'MCP Tools',
          body: isZh
            ? '支持 MCP 的 agent 可以通过远程 MCP endpoint 调用同样的能力，不需要单独集成 REST 客户端。'
            : 'MCP-capable agents can call the same capabilities through the remote MCP endpoint without a separate REST client.',
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
        }
      ]}
      links={[
        { label: isZh ? '快速开始' : 'Getting Started', href: `/docs/getting-started?lang=${locale}` },
        { label: isZh ? 'Agent 集成指南' : 'Agent Integration Guide', href: `/docs/developer-guide?lang=${locale}` }
      ]}
    />
  )
}
