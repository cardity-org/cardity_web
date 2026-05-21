import type { Metadata } from 'next'
import DocsSidebar from './components/DocsSidebar'
import ActiveSectionObserver from './components/ActiveSectionObserver'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Documentation for Cardity Core public API, MCP endpoint, CLI wrappers, and Agent OS manifest integration.',
  keywords: 'Cardity documentation, protocol compiler, MCP, Agent OS, agent integration, API reference',
  openGraph: {
    title: 'Cardity Documentation - Agent Protocol Layer',
    description: 'Build agent-ready systems from deterministic protocol contracts.',
  },
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <DocsSidebar />
          <div className="flex-1" id="docs-content">
            <ActiveSectionObserver />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
