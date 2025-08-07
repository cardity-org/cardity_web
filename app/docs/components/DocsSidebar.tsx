"use client"

import Link from 'next/link'
import { BookOpen, Code, Settings, Terminal, Database, Shield, Package, GitBranch } from 'lucide-react'
import { useTranslations } from '../../../lib/i18n'

export default function DocsSidebar() {
  const { t } = useTranslations()
  
  const docSections = [
    {
      title: t('docs.gettingStarted.title'),
      description: t('docs.gettingStarted.subtitle'),
      link: '/docs/getting-started',
      icon: BookOpen,
    },
    {
      title: t('docs.reference.title'),
      description: t('docs.reference.subtitle'),
      link: '/docs/reference',
      icon: Code,
    },
    {
      title: t('docs.cli.title'),
      description: t('docs.cli.subtitle'),
      link: '/docs/cli',
      icon: Terminal,
    },
    {
      title: t('docs.standardLibrary.title'),
      description: t('docs.standardLibrary.subtitle'),
      link: '/docs/standard-library',
      icon: Package,
    },
    {
      title: t('docs.deploy.title'),
      description: t('docs.deploy.subtitle'),
      link: '/docs/deploy',
      icon: Database,
    },
    {
      title: t('docs.developerGuide.title'),
      description: t('docs.developerGuide.subtitle'),
      link: '/docs/developer-guide',
      icon: GitBranch,
    },
  ]

  return (
    <div className="lg:w-64 flex-shrink-0">
      <div className="card lg:sticky lg:top-20">
        <h2 className="text-lg font-semibold text-white mb-4">{t('docs.title')}</h2>
        <nav className="space-y-1">
          {docSections.map((section) => (
            <Link
              key={section.title}
              href={section.link}
              className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors duration-200"
            >
              <section.icon className="w-4 h-4" />
              <span className="text-sm">{section.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
