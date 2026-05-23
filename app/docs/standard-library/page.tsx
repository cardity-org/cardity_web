"use client"

import DocArticle from '../components/DocArticle'
import { useTranslations } from '../../../lib/i18n'

export default function StandardLibraryPage() {
  const { locale } = useTranslations()
  const isZh = locale === 'zh'

  return (
    <DocArticle
      title={isZh ? '协议与产物库' : 'Protocol and Artifact Library'}
      subtitle={isZh
        ? '这里记录 Cardity 推荐复用的协议模式、manifest 字段和 projection/read-model 合约，而不是旧式链上合约库。'
        : 'This page documents reusable Cardity protocol patterns, manifest fields, and projection/read-model contracts for agent-generated systems.'}
      sections={[
        {
          title: isZh ? '可复用协议模式' : 'Reusable Protocol Patterns',
          bullets: isZh
            ? [
                'points：积分发放、消费、余额查询和管理员调整。',
                'merchant_erp：商品、库存、订单和消息等商户 read models。',
                'approval_workflow：需要确认、审计和状态推进的业务动作。',
                'query_contract：list、detail、summary 这类 agent 可调用视图。'
              ]
            : [
                'points for earn, spend, balance query, and admin adjustment flows.',
                'merchant_erp for product, inventory, order, and message read models.',
                'approval_workflow for confirmed, audited, state-transition business actions.',
                'query_contract for list, detail, and summary views agents can call.'
              ]
        },
        {
          title: isZh ? 'Manifest 中的稳定字段' : 'Stable Manifest Fields',
          body: isZh
            ? 'Agent OS runtime 应优先读取这些字段，而不是从自然语言或代码注释中猜测系统结构。'
            : 'Agent OS runtimes should read these fields instead of guessing system structure from natural language or code comments.',
          code: {
            language: 'json',
            code: `{
  "system": {
    "api": { "routes": [] },
    "database": {
      "tables": [],
      "read_models": [],
      "projections": [],
      "queries": []
    },
    "ui": { "actions": [] },
    "workflows": [],
    "permissions": []
  }
}`
          }
        },
        {
          title: isZh ? 'Projection 操作' : 'Projection Operations',
          bullets: isZh
            ? [
                'insert：追加 ledger、audit log 或 event log。',
                'upsert_delta：对余额、库存等数值做可重放 delta 更新。',
                'upsert_snapshot：写入商品、订单、消息等当前状态 read model。',
                'delete / soft_delete：处理归档、删除和隐藏对象。'
              ]
            : [
                'insert appends ledger, audit, or event-log rows.',
                'upsert_delta applies replay-safe numeric changes to balances or inventory.',
                'upsert_snapshot writes current-state read models such as products, orders, and messages.',
                'delete / soft_delete handles archived, removed, or hidden business objects.'
              ],
          code: {
            language: 'json',
            code: `{
  "operation": "upsert_snapshot",
  "source": "confirmed_readback",
  "primary_key": ["merchant_id", "goods_id"],
  "tenant_key": ["merchant_id"],
  "values": {
    "merchant_id": "$ctx.merchant_id",
    "goods_id": "$readback.goods_id",
    "source_run_id": "$run.id"
  }
}`
          }
        }
      ]}
      links={[
        { label: isZh ? '协议参考' : 'Protocol Reference', href: `/docs/reference?lang=${locale}` },
        { label: isZh ? '开发者指南' : 'Developer Guide', href: `/docs/developer-guide?lang=${locale}` }
      ]}
    />
  )
}
