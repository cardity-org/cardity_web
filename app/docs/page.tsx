import Link from 'next/link'
import { BookOpen, Code, Settings, Rocket, FileText, Library, Terminal, ArrowRight } from 'lucide-react'

const docSections = [
  {
    title: '开始使用',
    description: '安装 CLI 工具，编写你的第一个 Cardity 合约',
    href: '/docs/getting-started',
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: '语言参考',
    description: '完整的 Cardity 语言语法和特性说明',
    href: '/docs/reference',
    icon: Code,
    color: 'bg-green-100 text-green-600',
  },
  {
    title: '标准库',
    description: '内置模块和常用功能的详细文档',
    href: '/docs/standard-library',
    icon: Library,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'CLI 工具',
    description: '命令行工具的使用方法和参数说明',
    href: '/docs/cli',
    icon: Terminal,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    title: '部署指南',
    description: '如何将合约部署到 Dogecoin 网络',
    href: '/docs/deploy',
    icon: Rocket,
    color: 'bg-red-100 text-red-600',
  },
  {
    title: '开发者指南',
    description: '调试、测试和高级开发技巧',
    href: '/docs/developer-guide',
    icon: Settings,
    color: 'bg-gray-100 text-gray-600',
  },
]

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Cardity 文档
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          从入门到精通，掌握 Cardity 智能合约开发的所有知识
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
          快速开始
        </h2>
        <p className="text-gray-600 mb-4">
          如果你是新用户，建议按照以下顺序学习：
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>安装 CLI 工具并配置环境</li>
          <li>学习基本的语言语法和概念</li>
          <li>编写和测试你的第一个合约</li>
          <li>了解标准库的使用方法</li>
          <li>部署合约到 Dogecoin 网络</li>
        </ol>
        <div className="mt-6">
          <Link
            href="/docs/getting-started"
            className="btn-primary inline-flex items-center"
          >
            开始学习
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
} 