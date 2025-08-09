"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Code, Download, Play, ExternalLink, Star, Users, Coins, Vote, Database, Wallet, Zap, Shield, Globe } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'
import { useTranslations } from '../../../lib/i18n'

interface ExampleDetailClientProps {
  example: any
  examplesData: any[]
}

// 图标映射
const iconMap: Record<string, any> = {
  Database,
  Shield,
  Wallet,
  Coins,
  Vote,
  Zap
}

export default function ExampleDetailClient({ example, examplesData }: ExampleDetailClientProps) {
  const { t } = useTranslations()

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basic': return Database
      case 'wallet': return Wallet
      case 'token': return Coins
      case 'governance': return Vote
      case 'advanced': return Zap
      default: return Code
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return 'bg-blue-100 text-blue-800'
      case 'wallet': return 'bg-purple-100 text-purple-800'
      case 'token': return 'bg-green-100 text-green-800'
      case 'governance': return 'bg-orange-100 text-orange-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/examples?lang=${locale === 'zh' ? 'zh' : 'en'}`} className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  {React.createElement(iconMap[example.icon] || Code, { className: "w-6 h-6 text-white" })}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{example.title}</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(example.category)}`}>
                      {t(`examples.categories.${example.category}`)}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(example.difficulty)}`}>
                      {t(`examples.difficulty.${example.difficulty}`)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="btn-secondary inline-flex items-center">
                <Play className="w-4 h-4 mr-2" />
                运行示例
              </button>
              <button className="btn-primary inline-flex items-center">
                <Download className="w-4 h-4 mr-2" />
                下载代码
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="card mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">描述</h2>
              <p className="text-gray-400 leading-relaxed">
                {example.description}
              </p>
            </div>

            {/* Code */}
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">完整代码</h2>
                <div className="flex items-center space-x-2">
                  <button className="text-sm text-gray-400 hover:text-white transition-colors">
                    复制代码
                  </button>
                  <button className="text-sm text-gray-400 hover:text-white transition-colors">
                    下载文件
                  </button>
                </div>
              </div>
              <CodeBlock
                code={example.code}
                language="cardity"
                showLineNumbers={true}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">主要功能</h3>
              <ul className="space-y-2">
                {example.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Usage */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">使用场景</h3>
              <ul className="space-y-2">
                {example.usage.map((usage: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {usage}
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Examples */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">相关示例</h3>
              <div className="space-y-3">
                {examplesData
                  .filter((ex: any) => ex.slug !== example.slug && ex.category === example.category)
                  .slice(0, 3)
                  .map((relatedExample: any) => (
                    <Link
                      key={relatedExample.slug}
                      href={`/examples/${relatedExample.slug}`}
                      className="block p-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded">
                          {React.createElement(iconMap[relatedExample.icon] || Code, { className: "w-4 h-4 text-white" })}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">{relatedExample.title}</h4>
                          <p className="text-xs text-gray-400">{t(`examples.difficulty.${relatedExample.difficulty}`)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">操作</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary inline-flex items-center justify-center">
                  <Play className="w-4 h-4 mr-2" />
                  运行示例
                </button>
                <button className="w-full btn-secondary inline-flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  下载代码
                </button>
                <Link
                  href={`/docs/getting-started?lang=${locale === 'zh' ? 'zh' : 'en'}`}
                  className="w-full btn-secondary inline-flex items-center justify-center"
                >
                  <Code className="w-4 h-4 mr-2" />
                  查看文档
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
