'use client'

import Link from 'next/link'
import { ArrowRight, FileJson, PackageCheck, Workflow } from 'lucide-react'
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
            ? '这里展示 Cardity 编译后交给 agent 的关键产物，而不是旧的链上合约下载列表。'
            : 'This page shows the artifacts Cardity gives to agents after compilation, not a legacy on-chain contract download list.'}
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
  "name": "SupportDesk",
  "actions": [
    {
      "name": "triage",
      "input": { "message": "string" },
      "output": { "ticket": "Ticket" }
    },
    {
      "name": "reply",
      "input": { "ticket_id": "string", "draft": "string" },
      "output": { "status": "string" }
    }
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
  "entities": {
    "Ticket": {
      "fields": {
        "id": "string",
        "customer": "string",
        "status": "string"
      }
    }
  },
  "policies": ["require_audit:reply"],
  "views": ["ticket_queue", "ticket_detail"]
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
  "tasks": ["model.entities", "generate.routes", "wire.tools", "create.tests"],
  "tools": [
    { "name": "support.triage", "action": "triage" },
    { "name": "support.reply", "action": "reply" }
  ],
  "routes": ["/tickets", "/tickets/:id"],
  "checks": ["audit-log-required", "abi-compatible"]
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
