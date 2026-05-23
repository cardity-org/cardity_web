'use client'

import Link from 'next/link'
import { ArrowLeft, Database } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'

export default function ExampleDetailClient() {
  const { locale } = useTranslations()
  const isZh = locale === 'zh'

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href={`/examples?lang=${locale}`}
        className="mb-8 inline-flex items-center text-cardity-300 hover:text-cardity-200"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {isZh ? '返回协议示例' : 'Back to protocol examples'}
      </Link>

      <div className="card card-gradient">
        <div className="mb-4 flex items-center gap-3">
          <Database className="h-6 w-6 text-cardity-300" />
          <h1 className="text-3xl font-bold text-white">
            {isZh ? 'Merchant ERP Projection v1.1' : 'Merchant ERP Projection v1.1'}
          </h1>
        </div>
        <p className="mb-6 text-gray-300">
          {isZh
            ? '这个示例展示 Cardity projection contract v1.1 如何描述商户商品、库存和订单 read models，并交给 Agent OS 生成 ERP 系统。'
            : 'This example shows how Cardity projection contract v1.1 describes merchant product, inventory, and order read models for Agent OS generated ERP systems.'}
        </p>
        <CodeBlock
          language="json"
          showLineNumbers
          code={`{
  "contract": "cardity.projection_contract.v1.1",
  "read_models": ["merchant_products", "merchant_inventory", "merchant_orders"],
  "projections": [
    {
      "name": "product_saved_snapshot",
      "source": "confirmed_readback",
      "operation": "upsert_snapshot",
      "primary_key": ["merchant_id", "goods_id"]
    },
    {
      "name": "inventory_adjusted_delta",
      "operation": "upsert_delta",
      "primary_key": ["merchant_id", "goods_id", "sku_id"]
    }
  ],
  "queries": ["products.list", "orders.list", "inventory.summary"]
}`}
        />
      </div>
    </div>
  )
}
