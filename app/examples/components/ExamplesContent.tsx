"use client"

import Link from 'next/link'
import { ArrowRight, Bot, Braces, Layers, ShieldCheck } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'

const examples = [
  {
    icon: Bot,
    title: 'Member Points System',
    description: 'A compact loyalty protocol with earn, spend, balance query, and admin adjustment methods.',
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
  },
  {
    icon: Layers,
    title: 'Merchant ERP Read Models',
    description: 'A v1.1 projection contract example for product, inventory, and order read models.',
    code: `protocol MerchantERPSystem {
  version: "1.0.0";
  owner: "agent-os";

  state { result: string = "ok"; }

  table merchant_products {
    merchant_id: string;
    goods_id: string;
    name: string = "";
    price: int = 0;
    status: string = "active";
  }

  event ProductSaved { merchant_id: string; goods_id: string; }

  method save_product(merchant_id: string, goods_id: string) {
    state.result = "ok";
    emit ProductSaved(params.merchant_id, params.goods_id);
  }
  returns: string state.result;
}`
  },
  {
    icon: ShieldCheck,
    title: 'Remote MCP Contract',
    description: 'Agents can call Cardity as a hosted MCP tool provider without installing a local wrapper.',
    code: `{
  "mcpServers": {
    "cardity_core": {
      "url": "https://api.cardity.org/mcp"
    }
  }
}`
  }
]

export default function ExamplesContent() {
  const { locale } = useTranslations()
  const isZh = locale === 'zh'

  return (
    <div className="min-h-screen bg-black">
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            <span className="gradient-text">{isZh ? '协议示例' : 'Protocol Examples'}</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            {isZh
              ? '这些示例展示 Cardity 如何把业务系统描述成 agent 可消费的协议契约，并输出 Agent OS manifest 与 projection contract。'
              : 'These examples show how Cardity describes business systems as agent-consumable protocol contracts and emits Agent OS manifests plus projection contracts.'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {examples.map((example) => (
            <article key={example.title} className="card card-gradient">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-cardity-900/40 p-2 ring-1 ring-cardity-800/50">
                  <example.icon className="h-5 w-5 text-cardity-300" />
                </div>
                <h2 className="text-xl font-semibold text-white">{example.title}</h2>
              </div>
              <p className="mb-5 text-gray-400">{example.description}</p>
              <CodeBlock code={example.code} language="typescript" showLineNumbers />
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-cardity-800/50 bg-cardity-950/20 p-6">
          <div className="mb-4 flex items-center gap-3">
            <Braces className="h-5 w-5 text-cardity-300" />
            <h2 className="text-xl font-semibold text-white">
              {isZh ? '编译产物示例' : 'Compiled Artifact Example'}
            </h2>
          </div>
          <CodeBlock
            language="json"
            showLineNumbers
            code={`{
  "abi": { "methods": ["save_product", "adjust_inventory"] },
  "protocol_json": { "tables": ["merchant_products", "merchant_inventory"] },
  "manifest": {
    "events": [{
      "name": "ProductSaved",
      "runtime_fields": ["id", "write_index", "source_run_id", "idempotency_key"]
    }],
    "system": {
      "database": {
        "read_models": ["merchant_products", "merchant_inventory"],
        "projections": [{
          "name": "product_saved_snapshot",
          "source_id": "$event.id",
          "idempotency": {
            "source_id": "$event.id",
            "write_index": "$event.write_index"
          }
        }],
        "queries": ["products.list", "inventory.summary"]
      }
    }
  }
}`}
          />
        </div>

        <div className="mt-8 rounded-lg border border-dark-800 bg-dark-900/70 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {isZh ? '完整示例在 cardity-core 仓库' : 'Full examples live in cardity-core'}
              </h2>
              <p className="mt-2 text-gray-400">
                {isZh
                  ? '包含会员积分系统、商户 ERP projection v1.1 示例，以及可编译的 .car 协议源。'
                  : 'Includes the member points system, merchant ERP projection v1.1 example, and compilable .car protocol source.'}
              </p>
            </div>
            <Link
              href={`/docs/getting-started?lang=${locale}`}
              className="btn-secondary inline-flex items-center justify-center"
            >
              {isZh ? '查看快速开始' : 'View getting started'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
