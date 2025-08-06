import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'Cardity 0.1.0 正式发布',
    excerpt: '我们很高兴地宣布 Cardity 编程语言的第一个正式版本发布。这个版本包含了完整的语言特性、CLI 工具和文档。',
    date: '2024-01-15',
    readTime: '5 分钟',
    tags: ['发布', '新特性'],
    slug: 'cardity-0-1-0-release'
  },
  {
    id: 2,
    title: '如何构建你的第一个 Cardity 智能合约',
    excerpt: '在这篇教程中，我们将一步步教你如何创建、编译和部署你的第一个 Cardity 智能合约。',
    date: '2024-01-10',
    readTime: '8 分钟',
    tags: ['教程', '入门'],
    slug: 'building-your-first-cardity-contract'
  },
  {
    id: 3,
    title: 'Cardity 与 Solidity 的语法对比',
    excerpt: '如果你已经熟悉 Solidity，这篇指南将帮助你快速理解 Cardity 的语法差异和相似之处。',
    date: '2024-01-05',
    readTime: '6 分钟',
    tags: ['对比', '语法'],
    slug: 'cardity-vs-solidity-syntax'
  },
  {
    id: 4,
    title: 'UTXO 模型下的智能合约设计模式',
    excerpt: '探索在 Dogecoin UTXO 模型下设计智能合约的最佳实践和常见模式。',
    date: '2024-01-01',
    readTime: '12 分钟',
    tags: ['设计模式', 'UTXO'],
    slug: 'utxo-smart-contract-patterns'
  }
]

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Cardity 博客
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          了解 Cardity 的最新动态、教程和最佳实践
        </p>
      </div>

      <div className="grid gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="hover:text-cardity-600 transition-colors duration-200"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cardity-100 text-cardity-800"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-cardity-600 hover:text-cardity-700 font-medium"
                  >
                    阅读全文
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-cardity-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            订阅更新
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            订阅我们的博客，获取 Cardity 的最新动态、教程和社区更新。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="输入你的邮箱地址"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardity-500 focus:border-transparent"
            />
            <button className="btn-primary">
              订阅
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 