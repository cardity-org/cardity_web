"use client"

import Link from 'next/link'
import { ArrowRight, Bot, Braces, Layers, ShieldCheck } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'

const examples = [
  {
    icon: Bot,
    title: 'Support Desk Agent',
    description: 'A protocol for ticket triage, replies, ownership, and audit logs.',
    code: `protocol SupportDesk {
  entity Ticket { id: string; customer: string; status: string; }
  action triage(message: string) -> ticket: Ticket;
  action reply(ticket_id: string, draft: string) -> status: string;
  policy require_audit for action reply;
}`
  },
  {
    icon: Layers,
    title: 'Workflow Backoffice',
    description: 'A manifest-friendly protocol for queues, approvals, and generated admin pages.',
    code: `protocol WorkflowBackoffice {
  entity Request { id: string; requester: string; state: string; }
  action approve(request_id: string) -> state: string;
  action reject(request_id: string, reason: string) -> state: string;
  view request_queue uses Request;
}`
  },
  {
    icon: ShieldCheck,
    title: 'Permissioned CRM',
    description: 'A compact protocol that tells agents what data exists and who may mutate it.',
    code: `protocol CRM {
  entity Lead { id: string; email: string; stage: string; }
  action qualify(email: string) -> lead: Lead;
  action assign(lead_id: string, owner_id: string) -> status: string;
  policy require_role("sales-admin") for action assign;
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
              ? '这些示例展示 Cardity 如何把系统能力描述成 agent 可消费的协议契约，而不是直接展示旧的链上合约。'
              : 'These examples show how Cardity describes system capabilities as agent-consumable protocol contracts instead of legacy on-chain contracts.'}
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

        <div className="mt-10 rounded-lg border border-dark-800 bg-dark-900/70 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {isZh ? 'Legacy 示例仍可查看' : 'Legacy Example Is Still Available'}
              </h2>
              <p className="mt-2 text-gray-400">
                {isZh
                ? '旧示例暂时保留为历史兼容资料，但不再是官网主方向。'
                : 'The old example remains available as historical compatibility material, but it is no longer the main site direction.'}
              </p>
            </div>
            <Link
              href={`/examples/legacy-protocol-note?lang=${locale}`}
              className="btn-secondary inline-flex items-center justify-center"
            >
              {isZh ? '查看 legacy 示例' : 'View legacy example'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
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
  "abi": { "actions": ["triage", "reply"] },
  "protocol_json": { "entities": ["Ticket"], "views": ["ticket_queue"] },
  "agent_os_manifest": {
    "tools": ["support.triage", "support.reply"],
    "routes": ["/tickets", "/tickets/:id"],
    "checks": ["audit-log-required"]
  }
}`}
          />
        </div>
      </section>
    </div>
  )
}
