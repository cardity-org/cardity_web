'use client'

import Link from 'next/link'
import { ArrowLeft, Archive } from 'lucide-react'
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
          <Archive className="h-6 w-6 text-cardity-300" />
          <h1 className="text-3xl font-bold text-white">
            {isZh ? 'Legacy 示例说明' : 'Legacy Example Note'}
          </h1>
        </div>
        <p className="mb-6 text-gray-300">
          {isZh
            ? '此页面保留为历史兼容入口。Cardity 官网当前主方向已经切换为 agent 协议层：公开 API、MCP endpoint、协议产物和 Agent OS manifest。'
            : 'This page remains as a historical compatibility entry. The current Cardity site direction is the agent protocol layer: public API, MCP endpoint, compiled artifacts, and Agent OS manifests.'}
        </p>
        <CodeBlock
          language="typescript"
          showLineNumbers
          code={`protocol SupportDesk {
  entity Ticket { id: string; customer: string; status: string; }
  action triage(message: string) -> ticket: Ticket;
  action reply(ticket_id: string, draft: string) -> status: string;
  policy require_audit for action reply;
}`}
        />
      </div>
    </div>
  )
}
