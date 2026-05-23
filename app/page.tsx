'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import {
  ArrowRight,
  BookOpen,
  Braces,
  Code,
  Database,
  FileJson,
  Github,
  Network,
  Play,
  Server,
  ShieldCheck,
  Terminal,
  Workflow,
} from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import Logo from '../components/Logo'
import { useTranslations } from '../lib/i18n'

type FeatureItem = {
  title: string
  description: string
}

type PipelineStep = {
  label: string
  title: string
  description: string
}

const apiExample = `curl https://api.cardity.org/v1/manifest

curl https://api.cardity.org/v1/compile \\
  -H "content-type: application/json" \\
  -d '{"source_text":"protocol Counter { version: \\"1.0.0\\"; state { count: int = 0; } method get_count() { state.count = state.count; } returns: int state.count; }","include_manifest":true}'`

const mcpExample = `POST https://api.cardity.org/mcp

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "cardity_compile",
    "arguments": {
      "source_text": "protocol Counter { ... }",
      "include_manifest": true,
      "include_protocol": true,
      "include_abi": true
    }
  }
}`

const artifactIcons = [FileJson, Braces, Workflow, Database]
const integrationIcons = [Server, Network, Terminal]

export default function Home() {
  const { t, locale } = useTranslations()
  const langParam = useMemo(() => (locale === 'zh' ? '?lang=zh' : '?lang=en'), [locale])
  const pipeline = t('home.pipeline.steps') as PipelineStep[]
  const artifacts = t('home.artifacts.items') as FeatureItem[]
  const integrations = t('home.integrations.items') as FeatureItem[]

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-dark-800">
        <div className="hero-grid -z-10" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.14),transparent_55%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cardity-700/40 bg-cardity-950/40 px-4 py-2 text-sm text-cardity-100 mb-8">
                <ShieldCheck className="w-4 h-4" />
                {t('home.hero.badge')}
              </div>

              <div className="flex items-center gap-4 mb-7">
                <div className="p-2 rounded-lg bg-cardity-900/35 border border-cardity-800/50">
                  <Logo size={64} showText={false} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-cardity-300">{t('home.hero.eyebrow')}</p>
                  <h1 className="text-5xl md:text-6xl font-bold text-white mt-1">
                    {t('home.hero.title')}
                  </h1>
                </div>
              </div>

              <p className="text-2xl md:text-3xl text-gray-100 leading-tight max-w-3xl">
                {t('home.hero.subtitle')}
              </p>
              <p className="text-lg text-gray-400 mt-6 max-w-2xl">
                {t('home.hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-9">
                <a href="https://api.cardity.org/playground" className="btn-primary btn-glow inline-flex items-center justify-center">
                  <Play className="w-4 h-4 mr-2" />
                  {t('home.hero.tryApi')}
                </a>
                <Link href={`/docs${langParam}`} className="btn-secondary inline-flex items-center justify-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t('home.hero.readDocs')}
                </Link>
                <a
                  href="https://github.com/cardity-org/cardity-core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center justify-center"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mt-10 max-w-2xl">
                {(t('home.hero.stats') as string[]).map((item) => (
                  <div key={item} className="rounded-lg border border-dark-800 bg-dark-900/55 px-4 py-3 text-sm text-gray-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-dark-800 bg-dark-950/75 shadow-2xl shadow-cardity-950/30 overflow-hidden">
              <div className="flex items-center justify-between border-b border-dark-800 px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Server className="w-4 h-4 text-cardity-300" />
                  https://api.cardity.org
                </div>
                <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-xs text-emerald-300 border border-emerald-500/25">
                  {t('home.hero.live')}
                </span>
              </div>
              <div className="p-5">
                <CodeBlock code={apiExample} language="bash" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.pipeline.title')}
            </h2>
            <p className="text-lg text-gray-400">
              {t('home.pipeline.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {pipeline.map((step) => (
              <div key={step.label} className="rounded-lg border border-dark-800 bg-dark-900/65 p-5">
                <div className="text-sm font-semibold text-cardity-300 mb-5">{step.label}</div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-6">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-20 bg-dark-900/40 border-y border-dark-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('home.artifacts.title')}
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                {t('home.artifacts.subtitle')}
              </p>

              <div className="space-y-4">
                {artifacts.map((item, index) => {
                  const Icon = artifactIcons[index] || FileJson
                  return (
                    <div key={item.title} className="flex gap-4 rounded-lg border border-dark-800 bg-dark-950/55 p-5">
                      <div className="h-11 w-11 shrink-0 rounded-lg bg-cardity-900/55 border border-cardity-800/50 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-cardity-300" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400 mt-2 leading-6">{item.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-lg border border-dark-800 bg-dark-950/75 overflow-hidden">
              <div className="border-b border-dark-800 px-4 py-3 text-sm text-gray-300 flex items-center gap-2">
                <Code className="w-4 h-4 text-cardity-300" />
                {t('home.artifacts.exampleTitle')}
              </div>
              <div className="p-5">
                <CodeBlock code={mcpExample} language="json" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.integrations.title')}
            </h2>
            <p className="text-lg text-gray-400">
              {t('home.integrations.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {integrations.map((item, index) => {
              const Icon = integrationIcons[index] || Network
              return (
                <div key={item.title} className="rounded-lg border border-dark-800 bg-dark-900/65 p-6">
                  <Icon className="w-8 h-8 text-cardity-300 mb-5" />
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-7">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-20 bg-cardity-950/20 border-t border-cardity-900/50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://api.cardity.org/playground" className="btn-primary inline-flex items-center justify-center">
              <Server className="w-4 h-4 mr-2" />
              {t('home.cta.openApi')}
            </a>
            <Link href={`/docs/getting-started${langParam}`} className="btn-secondary inline-flex items-center justify-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              {t('home.cta.startBuilding')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
