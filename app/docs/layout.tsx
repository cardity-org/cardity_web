import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, BookOpen, Code, Settings, Terminal, Database, Shield, Package, GitBranch } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Complete documentation for Cardity programming language. Learn syntax, CLI tools, deployment guides, and best practices for smart contract development on Dogecoin UTXO.',
  keywords: 'Cardity documentation, smart contract development, Dogecoin UTXO, programming guide, CLI tools, deployment',
  openGraph: {
    title: 'Cardity Documentation - Smart Contract Development Guide',
    description: 'Complete documentation for Cardity programming language. Learn syntax, CLI tools, deployment guides, and best practices.',
  },
}

const docSections = [
  {
    title: 'Getting Started',
    description: 'Install Cardity CLI and write your first smart contract',
    link: '/docs/getting-started',
    icon: BookOpen,
  },
  {
    title: 'Language Reference',
    description: 'Complete syntax reference and language features',
    link: '/docs/reference',
    icon: Code,
  },
  {
    title: 'CLI Tools',
    description: 'Command-line tools for development and deployment',
    link: '/docs/cli',
    icon: Terminal,
  },
  {
    title: 'Standard Library',
    description: 'Built-in functions and package management',
    link: '/docs/standard-library',
    icon: Package,
  },
  {
    title: 'Deployment Guide',
    description: 'Deploy smart contracts to Dogecoin blockchain',
    link: '/docs/deploy',
    icon: Database,
  },
  {
    title: 'Developer Guide',
    description: 'Advanced development techniques and contribution guidelines',
    link: '/docs/developer-guide',
    icon: GitBranch,
  },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="card sticky top-8">
              <h2 className="text-lg font-semibold text-white mb-4">Documentation</h2>
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
          
          {/* Main content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 