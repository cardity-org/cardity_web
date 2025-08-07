'use client'

import Link from 'next/link'
import { BookOpen, Code, Settings, Rocket, FileText, Library, Terminal, ArrowRight } from 'lucide-react'
import { useTranslations } from '../../lib/i18n'
import { useMemo } from 'react'

export default function DocsPage() {
  const { t, locale, isClient, isInitialized } = useTranslations()

  // 使用 useMemo 确保文档部分在语言切换时重新计算
  const docSections = useMemo(() => [
    {
      title: t('docs.gettingStarted.title'),
      description: t('docs.gettingStarted.subtitle'),
      href: '/docs/getting-started',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: t('docs.reference.title'),
      description: t('docs.reference.subtitle'),
      href: '/docs/reference',
      icon: Code,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: t('docs.standardLibrary.title'),
      description: t('docs.standardLibrary.subtitle'),
      href: '/docs/standard-library',
      icon: Library,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: t('docs.cli.title'),
      description: t('docs.cli.subtitle'),
      href: '/docs/cli',
      icon: Terminal,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      title: t('docs.deploy.title'),
      description: t('docs.deploy.subtitle'),
      href: '/docs/deploy',
      icon: Rocket,
      color: 'bg-red-100 text-red-600',
    },
    {
      title: t('docs.developerGuide.title'),
      description: t('docs.developerGuide.subtitle'),
      href: '/docs/developer-guide',
      icon: Settings,
      color: 'bg-gray-100 text-gray-600',
    },
  ], [t, locale, isClient, isInitialized])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('docs.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('docs.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {docSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group block p-6 bg-white rounded-lg border border-gray-200 hover:border-cardity-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start">
              <div className={`p-3 rounded-lg ${section.color} mr-4`}>
                <section.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-cardity-600 transition-colors duration-200">
                  {section.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  {section.description}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cardity-600 transition-colors duration-200" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-cardity-50 rounded-lg border border-cardity-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t('docs.learningPath.title')}
        </h2>
        <p className="text-gray-600 mb-4">
          {t('docs.learningPath.description')}
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          {t('docs.learningPath.steps').map((step: any, index: number) => (
            <li key={index}>
              {typeof step === 'string' ? step : `${step.title}: ${step.description}`}
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center text-cardity-600 hover:text-cardity-700 font-medium"
          >
            {t('docs.gettingStarted.title')}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
} 