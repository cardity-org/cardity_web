'use client'

import Link from 'next/link'
import { ArrowRight, Database, FileJson, PackageCheck, Workflow } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'

export default function DownloadExamplesPage() {
  const { locale } = useTranslations()
  const isZh = locale === 'zh'

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">
          {isZh ? '协议产物示例' : 'Protocol Artifact Examples'}
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-300">
          {isZh
            ? '这里展示 Cardity 编译后交给 agent 的关键产物：ABI、protocol JSON、Agent OS manifest 和 projection contract。'
            : 'This page shows the key artifacts Cardity gives to agents after compilation: ABI, protocol JSON, Agent OS manifest, and projection contract.'}
        </p>
      </div>

      <div className="space-y-8">
        <section className="card card-gradient">
          <h2 className="mb-4 flex items-center text-2xl font-semibold text-white">
            <FileJson className="mr-2 h-6 w-6 text-cardity-300" />
            ABI
          </h2>
          <CodeBlock
            language="json"
            showLineNumbers
            code={`{
  "protocol": "MemberPointsSystem",
  "methods": [
    { "name": "earn_points", "params": ["user", "amount", "reason"], "returns": "string" },
    { "name": "spend_points", "params": ["user", "amount", "reason"], "returns": "string" },
    { "name": "get_balance", "params": ["user"], "returns": "int" }
  ]
}`}
          />
        </section>

        <section className="card card-gradient">
          <h2 className="mb-4 flex items-center text-2xl font-semibold text-white">
            <Workflow className="mr-2 h-6 w-6 text-cardity-300" />
            Protocol JSON
          </h2>
          <CodeBlock
            language="json"
            showLineNumbers
            code={`{
  "name": "MerchantERPSystem",
  "state": ["result", "last_actor", "last_merchant_id"],
  "tables": ["merchant_products", "merchant_inventory", "merchant_orders"],
  "events": ["ProductSaved", "InventoryAdjusted", "OrderCreated"],
  "methods": ["save_product", "adjust_inventory", "create_order"]
}`}
          />
        </section>

        <section className="card card-gradient">
          <h2 className="mb-4 flex items-center text-2xl font-semibold text-white">
            <PackageCheck className="mr-2 h-6 w-6 text-cardity-300" />
            Agent OS Manifest
          </h2>
          <CodeBlock
            language="json"
            showLineNumbers
            code={`{
  "target": "pmtsoul-agent",
  "system": {
    "api": { "routes": ["POST /protocols/MerchantERPSystem/methods/save_product"] },
    "ui": { "actions": ["Save Product", "Adjust Inventory", "Create Order"] },
    "permissions": ["save_product", "adjust_inventory", "create_order"]
  }
}`}
          />
        </section>

        <section className="card card-gradient">
          <h2 className="mb-4 flex items-center text-2xl font-semibold text-white">
            <Database className="mr-2 h-6 w-6 text-cardity-300" />
            Projection Contract v1.1
          </h2>
          <CodeBlock
            language="json"
            showLineNumbers
            code={`{
  "database": {
    "read_models": ["merchant_products", "merchant_inventory", "merchant_orders"],
    "projections": [
      { "operation": "upsert_snapshot", "source": "confirmed_readback" },
      { "operation": "upsert_delta", "primary_key": ["merchant_id", "goods_id", "sku_id"] }
    ],
    "queries": ["products.list", "orders.list", "inventory.summary"]
  }
}`}
          />
        </section>
      </div>

      <div className="mt-10">
        <Link
          href={`/docs/reference?lang=${locale}`}
          className="btn-primary btn-glow inline-flex items-center"
        >
          {isZh ? '查看 API 参考' : 'Read API Reference'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
