import Link from 'next/link'
import { ChevronRight, BookOpen, Code, Settings, Rocket, FileText, Library, Terminal } from 'lucide-react'

const sidebarItems = [
  {
    title: '开始使用',
    href: '/docs/getting-started',
    icon: BookOpen,
  },
  {
    title: '语言参考',
    href: '/docs/reference',
    icon: Code,
  },
  {
    title: '标准库',
    href: '/docs/standard-library',
    icon: Library,
  },
  {
    title: 'CLI 工具',
    href: '/docs/cli',
    icon: Terminal,
  },
  {
    title: '部署指南',
    href: '/docs/deploy',
    icon: Rocket,
  },
  {
    title: '开发者指南',
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-cardity-600" />
                  文档目录
                </h2>
                <nav className="space-y-1">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-cardity-600 hover:bg-cardity-50 transition-colors duration-200"
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 