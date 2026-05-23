'use client'

import Link from 'next/link'
import {
  BadgeCheck,
  Boxes,
  Braces,
  Database,
  ExternalLink,
  FileJson,
  Globe2,
  LayoutTemplate,
  PackageCheck,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import CodeBlock from '../../components/CodeBlock'
import { useTranslations } from '../../lib/i18n'

type Copy = {
  eyebrow: string
  title: string
  subtitle: string
  openRegistry: string
  openPlayground: string
  sectionsTitle: string
  sectionsSubtitle: string
  templatesTitle: string
  templatesSubtitle: string
  packageTitle: string
  packageSubtitle: string
  runtimeTitle: string
  runtimeSubtitle: string
  apiTitle: string
  apiSubtitle: string
  safetyTitle: string
  safetyItems: string[]
}

const copy: Record<'en' | 'zh', Copy> = {
  en: {
    eyebrow: 'Ecosystem registry',
    title: 'Find the contracts agents can safely build from.',
    subtitle:
      'Cardity Registry is a static, machine-readable catalog for official templates, schema URLs, runtime adapters, compatibility badges, and .carditypkg examples. It is discovery only; execution stays with downstream runtimes.',
    openRegistry: 'Open registry API',
    openPlayground: 'Open Playground',
    sectionsTitle: 'What the registry exposes',
    sectionsSubtitle:
      'Every entry is designed for agents and runtimes to consume directly before running conformance.',
    templatesTitle: 'Official templates',
    templatesSubtitle:
      'Start from proven protocol shapes, then compile to ABI, protocol JSON, Agent OS manifest, action contracts, and projection contracts.',
    packageTitle: 'Portable .carditypkg flow',
    packageSubtitle:
      'Bundle compiled protocol artifacts with hashes so a runtime or registry can verify before installing.',
    runtimeTitle: 'Compatibility badge',
    runtimeSubtitle:
      'Runtimes can publish Cardity compatibility status without giving Cardity execution authority.',
    apiTitle: 'Registry endpoints',
    apiSubtitle:
      'The hosted API mirrors the same static catalog that the CLI and MCP tools expose.',
    safetyTitle: 'Boundary rules',
    safetyItems: [
      'Registry entries are discovery metadata, not execution permissions.',
      'Runtimes should still run Cardity conformance before consuming a manifest or package.',
      'Production writes remain disabled unless a concrete permission/write contract is added.',
    ],
  },
  zh: {
    eyebrow: '生态注册表',
    title: '找到 agent 可以安全构建的协议契约。',
    subtitle:
      'Cardity Registry 是静态、机器可读的生态目录，用来发布官方模板、schema URL、runtime adapter、compatibility badge 和 .carditypkg 示例。它只负责发现，不负责执行；执行仍属于下游 runtime。',
    openRegistry: '打开 Registry API',
    openPlayground: '打开 Playground',
    sectionsTitle: 'Registry 暴露什么',
    sectionsSubtitle:
      '每个条目都可以被 agent 和 runtime 直接消费，并在真正接入前继续跑 conformance。',
    templatesTitle: '官方模板',
    templatesSubtitle:
      '从稳定协议形状开始，再编译成 ABI、protocol JSON、Agent OS manifest、action contract 和 projection contract。',
    packageTitle: '可分发 .carditypkg 流程',
    packageSubtitle:
      '把编译产物与哈希一起打包，让 runtime 或 registry 可以先验证再安装。',
    runtimeTitle: '兼容性徽章',
    runtimeSubtitle:
      'Runtime 可以公开 Cardity 兼容状态，但不会把执行权交给 Cardity。',
    apiTitle: 'Registry endpoints',
    apiSubtitle:
      '托管 API 暴露与 CLI、MCP 完全一致的静态目录。',
    safetyTitle: '边界规则',
    safetyItems: [
      'Registry 条目只是发现元数据，不是执行权限。',
      'Runtime 消费 manifest 或 package 前仍应运行 Cardity conformance。',
      '生产写入保持禁用，除非未来加入明确的 permission/write contract。',
    ],
  },
}

const registrySections = [
  {
    icon: LayoutTemplate,
    title: 'templates',
    description: 'Official starter protocols such as member points, order refunds, support tickets, and agent tool permissions.',
    href: 'https://api.cardity.org/registry/templates',
  },
  {
    icon: FileJson,
    title: 'schemas',
    description: 'Stable URLs for manifest, action, projection, package, conformance, and registry schemas.',
    href: 'https://api.cardity.org/registry/schemas',
  },
  {
    icon: Braces,
    title: 'runtime_adapters',
    description: 'Runtime adapter declarations for Cardity-compatible downstream systems.',
    href: 'https://api.cardity.org/registry/runtime_adapters',
  },
  {
    icon: BadgeCheck,
    title: 'badges',
    description: 'Embeddable compatibility badges for runtimes that publish conformance status.',
    href: 'https://api.cardity.org/registry/badges',
  },
  {
    icon: PackageCheck,
    title: 'packages',
    description: '.carditypkg build examples for distributing verified protocol artifacts.',
    href: 'https://api.cardity.org/registry/packages',
  },
  {
    icon: Database,
    title: 'runtimes',
    description: 'Runtimes that declare support for Cardity contracts and production write boundaries.',
    href: 'https://api.cardity.org/registry/runtimes',
  },
]

const templates = [
  {
    id: 'member_points',
    title: 'Member Points',
    tags: ['points', 'ledger', 'projection'],
    command: 'cardity init member-points --template member_points',
  },
  {
    id: 'order_refund',
    title: 'Order Refund',
    tags: ['refund', 'permission', 'readback'],
    command: 'cardity init order-refund --template order_refund',
  },
  {
    id: 'support_ticket',
    title: 'Support Ticket',
    tags: ['support', 'workflow', 'read-model'],
    command: 'cardity init support-ticket --template support_ticket',
  },
  {
    id: 'agent_tool_permission',
    title: 'Agent Tool Permission',
    tags: ['agent-tool', 'risk', 'confirmation'],
    command: 'cardity init my-agent-tools --template agent_tool_permission',
  },
]

const endpoints = `curl https://api.cardity.org/registry
curl https://api.cardity.org/registry/templates/member_points
curl https://api.cardity.org/registry/packages/member-points-system
curl https://api.cardity.org/schemas/ecosystem_registry_v1.schema.json`

const packageFlow = `cardity init member-points --template member_points
cd member-points
cardity_agent compile src/protocol.car \\
  --out-dir dist \\
  --include-manifest \\
  --include-protocol \\
  --include-abi
cardity pack dist \\
  --name member-points-system \\
  --pkg-version 1.0.0 \\
  -o member-points.carditypkg
cardity verify-package member-points.carditypkg`

const badgeMarkdown = `[![Cardity-compatible](https://api.cardity.org/runtimes/pmtsoul-agent-os/badge.svg)](https://api.cardity.org/runtimes/pmtsoul-agent-os)`

export default function RegistryPage() {
  const { locale } = useTranslations()
  const text = copy[locale]
  const langParam = `?lang=${locale}`

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-dark-800">
        <div className="hero-grid -z-10" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12),transparent_58%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cardity-700/40 bg-cardity-950/40 px-4 py-2 text-sm text-cardity-100 mb-7">
              <Boxes className="w-4 h-4" />
              {text.eyebrow}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              {text.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl leading-8">
              {text.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-9">
              <a href="https://api.cardity.org/registry" className="btn-primary inline-flex items-center justify-center">
                <Globe2 className="w-4 h-4 mr-2" />
                {text.openRegistry}
              </a>
              <a href="https://api.cardity.org/playground" className="btn-secondary inline-flex items-center justify-center">
                <Terminal className="w-4 h-4 mr-2" />
                {text.openPlayground}
              </a>
              <Link href={`/docs${langParam}`} className="btn-outline inline-flex items-center justify-center">
                Docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{text.sectionsTitle}</h2>
            <p className="text-lg text-gray-400">{text.sectionsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {registrySections.map((section) => {
              const Icon = section.icon
              return (
                <a
                  key={section.title}
                  href={section.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-dark-800 bg-dark-900/65 p-6 hover:border-cardity-800/70 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="h-11 w-11 rounded-lg bg-cardity-900/45 border border-cardity-800/50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-cardity-300" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cardity-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mt-5">{section.title}</h3>
                  <p className="text-sm text-gray-400 leading-6 mt-3">{section.description}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-20 bg-dark-900/40 border-y border-dark-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{text.templatesTitle}</h2>
              <p className="text-lg text-gray-400 mb-7">{text.templatesSubtitle}</p>
              <div className="space-y-4">
                {templates.map((template) => (
                  <a
                    key={template.id}
                    href={`https://api.cardity.org/registry/templates/${template.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-dark-800 bg-dark-950/60 p-5 hover:border-cardity-800/70 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{template.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {template.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-dark-700 bg-dark-900 px-3 py-1 text-xs text-cardity-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-500 shrink-0" />
                    </div>
                    <p className="font-mono text-xs text-gray-400 mt-4 break-all">{template.command}</p>
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-dark-800 bg-dark-950/75 overflow-hidden">
              <div className="border-b border-dark-800 px-4 py-3 text-sm text-gray-300 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-cardity-300" />
                {text.apiTitle}
              </div>
              <div className="p-5">
                <p className="text-gray-400 mb-5 leading-7">{text.apiSubtitle}</p>
                <CodeBlock code={endpoints} language="bash" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="rounded-lg border border-dark-800 bg-dark-950/75 overflow-hidden">
              <div className="border-b border-dark-800 px-4 py-3 text-sm text-gray-300 flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-cardity-300" />
                {text.packageTitle}
              </div>
              <div className="p-5">
                <p className="text-gray-400 mb-5 leading-7">{text.packageSubtitle}</p>
                <CodeBlock code={packageFlow} language="bash" />
              </div>
            </div>
            <div className="rounded-lg border border-dark-800 bg-dark-950/75 overflow-hidden">
              <div className="border-b border-dark-800 px-4 py-3 text-sm text-gray-300 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-cardity-300" />
                {text.runtimeTitle}
              </div>
              <div className="p-5">
                <p className="text-gray-400 mb-5 leading-7">{text.runtimeSubtitle}</p>
                <div className="mb-5">
                  <a href="https://api.cardity.org/runtimes/pmtsoul-agent-os" target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://api.cardity.org/runtimes/pmtsoul-agent-os/badge.svg"
                      alt="Cardity-compatible dry_run_only badge"
                      className="h-5 w-auto"
                    />
                  </a>
                </div>
                <CodeBlock code={badgeMarkdown} language="markdown" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-20 bg-cardity-950/20 border-t border-cardity-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-cardity-900/60 bg-dark-950/70 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-lg bg-cardity-900/45 border border-cardity-800/50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-cardity-300" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">{text.safetyTitle}</h2>
                <ul className="space-y-3 text-gray-300 leading-7">
                  {text.safetyItems.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 rounded-full bg-cardity-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
