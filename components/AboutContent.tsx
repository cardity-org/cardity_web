'use client'

import { Package, Layers, Code, Shield, Database, Terminal, CheckCircle } from 'lucide-react'
import { useTranslations } from '../lib/i18n'

export default function AboutContent() {
  const { t } = useTranslations()

  const whatIs = (t('about2.whatIs.items') as string[]) ?? []
  const capabilities = (t('about2.capabilities.items') as string[]) ?? []
  const workflow = (t('about2.workflow.items') as string[]) ?? []
  const utxoDesign = (t('about2.utxoDesign.items') as string[]) ?? []
  const indexerSpec = (t('about2.indexerSpec.items') as string[]) ?? []
  const toolchain = (t('about2.toolchain.items') as string[]) ?? []
  const useCaseUSDT = (t('about2.useCaseUSDT.items') as string[]) ?? []
  const securityOps = (t('about2.securityOps.items') as string[]) ?? []

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden mb-10">
        <div className="hero-grid -z-10" />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-cardity-600/25 to-cardity-800/25 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-cardity-700/20 to-cardity-400/20 blur-3xl" />
        </div>
        <div className="text-center py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-3">{String(t('about2.title'))}</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">{String(t('about2.subtitle'))}</p>
        </div>
      </section>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Package className="w-6 h-6 mr-2 text-cardity-300" /> {String(t('about2.whatIs.title'))}
          </h2>
          <div className="card card-gradient">
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {whatIs.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Layers className="w-6 h-6 mr-2 text-cardity-300" /> {String(t('about2.capabilities.title'))}
          </h2>
          <div className="card card-gradient">
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {capabilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-cardity-300" /> {String(t('about2.workflow.title'))}
          </h2>
          <div className="card card-gradient">
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {workflow.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-cardity-300" /> {String(t('about2.utxoDesign.title'))}
          </h2>
          <div className="card card-gradient">
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {utxoDesign.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Database className="w-6 h-6 mr-2 text-cardity-300" /> {String(t('about2.indexerSpec.title'))}
          </h2>
          <div className="card card-gradient">
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {indexerSpec.map((item, i) => (
                <li key={i}><code className="bg-dark-800 px-1 rounded text-cardity-200">{item}</code></li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Terminal className="w-6 h-6 mr-2 text-cardity-300" /> {String(t('about2.toolchain.title'))}
          </h2>
          <div className="card card-gradient">
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {toolchain.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Package className="w-6 h-6 mr-2 text-cardity-300" /> {String(t('about2.useCaseUSDT.title'))}
          </h2>
          <div className="card card-gradient">
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {useCaseUSDT.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-cardity-300" /> {String(t('about2.securityOps.title'))}
          </h2>
          <div className="card card-gradient">
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {securityOps.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
