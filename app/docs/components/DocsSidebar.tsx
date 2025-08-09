"use client"

import Link from 'next/link'
import { BookOpen, Code, Settings, Terminal, Database, Shield, Package, GitBranch } from 'lucide-react'
import { useTranslations } from '../../../lib/i18n'

export default function DocsSidebar() {
  const { t } = useTranslations()
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  
  const docSections = [
    {
      title: t('navigation.sidebar.docs.gettingStarted'),
      description: t('docs.gettingStarted.subtitle'),
      link: '/docs/getting-started',
      icon: BookOpen,
    },
    {
      title: t('navigation.sidebar.docs.reference'),
      description: t('docs.reference.subtitle'),
      link: '/docs/reference',
      icon: Code,
    },
    {
      title: t('navigation.sidebar.docs.cli'),
      description: t('docs.cli.subtitle'),
      link: '/docs/cli',
      icon: Terminal,
    },
    {
      title: t('navigation.sidebar.docs.standardLibrary'),
      description: t('docs.standardLibrary.subtitle'),
      link: '/docs/standard-library',
      icon: Package,
    },
    {
      title: t('navigation.sidebar.docs.deploy'),
      description: t('docs.deploy.subtitle'),
      link: '/docs/deploy',
      icon: Database,
    },
    {
      title: t('navigation.sidebar.docs.developerGuide'),
      description: t('docs.developerGuide.subtitle'),
      link: '/docs/developer-guide',
      icon: GitBranch,
    },
  ]

  return (
    <div className="lg:w-72 flex-shrink-0">
      <div className="card lg:sticky lg:top-20">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
          {t('navigation.sidebar.docs.title')}
        </h2>
        <nav className="space-y-1">
          {docSections.map((section) => {
            const isActive = pathname.startsWith(section.link)
            return (
              <Link
                key={section.title}
                href={section.link}
                className={`group flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 ring-1 ${
                  isActive
                    ? 'bg-dark-800/80 text-cardity-200 ring-dark-700/60'
                    : 'text-gray-300 hover:text-cardity-200 hover:bg-dark-800/70 ring-transparent hover:ring-dark-700/60'
                }`}
                data-active-doc-link={isActive ? 'true' : undefined}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center ring-1 ${
                  isActive
                    ? 'bg-cardity-700/30 ring-cardity-700/60'
                    : 'bg-cardity-900/30 ring-cardity-800/50 group-hover:bg-cardity-700/30'
                }`}>
                  <section.icon className={`w-3.5 h-3.5 ${isActive ? 'text-cardity-200' : 'text-cardity-300'}`} />
                </div>
                <span className="text-sm">{section.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
