import Link from 'next/link'
import { ChevronRight, BookOpen, Code, Settings, Rocket, FileText, Library, Terminal } from 'lucide-react'

const sidebarItems = [
  {
    title: 'Getting Started',
    href: '/docs/getting-started',
    icon: BookOpen,
  },
  {
    title: 'Language Reference',
    href: '/docs/reference',
    icon: Code,
  },
  {
    title: 'Standard Library',
    href: '/docs/standard-library',
    icon: Library,
  },
  {
    title: 'CLI Tools',
    href: '/docs/cli',
    icon: Terminal,
  },
  {
    title: 'Deployment Guide',
    href: '/docs/deploy',
    icon: Rocket,
  },
  {
    title: 'Developer Guide',
    href: '/docs/developer-guide',
    icon: Settings,
  },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <div className="card">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-400" />
                  Documentation
                </h2>
                <nav className="space-y-1">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-800 transition-colors duration-200"
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.title}
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="flex-1">
            <div className="card">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 