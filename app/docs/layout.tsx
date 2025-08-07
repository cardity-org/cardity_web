import type { Metadata } from 'next'
import DocsSidebar from './components/DocsSidebar'

export const metadata: Metadata = {
  title: 'Documentation',
      description: 'Complete documentation for Cardity programming language. Learn syntax, CLI tools, deployment guides, and best practices for smart protocol development on Dogecoin UTXO.',
  keywords: 'Cardity documentation, smart protocol development, Dogecoin UTXO, programming guide, CLI tools, deployment',
  openGraph: {
    title: 'Cardity Documentation - Smart Protocol Development Guide',
    description: 'Complete documentation for Cardity programming language. Learn syntax, CLI tools, deployment guides, and best practices.',
  },
}

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
          <DocsSidebar />
          
          {/* Main content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 