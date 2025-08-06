'use client'

import Link from 'next/link'
import { Code, Zap, Shield, Globe, ArrowRight, Download, BookOpen, Play, Package, Database, FileText } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import Logo from '../components/Logo'
import { useTranslations } from '../lib/i18n'

export default function Home() {
  const { t } = useTranslations()

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Logo size={80} showText={false} />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="gradient-text">{t('home.hero.title')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              {t('home.hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/docs/getting-started" className="btn-primary inline-flex items-center">
                <Play className="w-4 h-4 mr-2" />
                {t('home.hero.getStarted')}
              </Link>
              <Link href="/docs" className="btn-secondary inline-flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                {t('home.hero.readDocs')}
              </Link>
              <Link href="/download" className="btn-secondary inline-flex items-center">
                <Download className="w-4 h-4 mr-2" />
                {t('home.hero.downloadTools')}
              </Link>
            </div>
            
            {/* Version Badge */}
            <div className="inline-flex items-center bg-blue-900/30 border border-blue-500/30 rounded-full px-4 py-2 text-blue-300">
              <Package className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">v1.0.1</span>
              <span className="text-xs text-blue-400 ml-2">{t('home.hero.latestVersion')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('home.features.compiler.title')}
              </h3>
              <p className="text-gray-400">
                {t('home.features.compiler.description')}
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('home.features.packageManager.title')}
              </h3>
              <p className="text-gray-400">
                {t('home.features.packageManager.description')}
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('home.features.drc20.title')}
              </h3>
              <p className="text-gray-400">
                {t('home.features.drc20.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.installation.title')}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('home.installation.subtitle')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-blue-400" />
                {t('home.installation.npmInstall.title')}
              </h3>
              <CodeBlock
                code={`# 全局安装 Cardity
npm install -g cardity

# 验证安装
cardity --version

# 查看帮助
cardity --help`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('home.installation.npmInstall.description')}
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-400" />
                {t('home.installation.sourceCode.title')}
              </h3>
              <CodeBlock
                code={`# 克隆项目
git clone https://github.com/cardity-org/cardity-core.git
cd cardity-core

# 安装依赖
npm install

# 验证安装
cardity --version`}
                language="bash"
              />
              <p className="text-sm text-gray-400 mt-2">
                {t('home.installation.sourceCode.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.quickStart.title')}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('home.quickStart.subtitle')}
            </p>
          </div>
          
          <div className="card">
            <CodeBlock
              code={`# 初始化新项目
cardity init my-first-protocol

# 进入项目目录
cd my-first-protocol

# 编译协议
cardity compile src/index.car

# 生成 ABI
cardity abi src/index.car

# 运行协议
cardity run dist/index.carc`}
              language="bash"
            />
          </div>
          
          <div className="text-center mt-8">
            <Link href="/docs/getting-started" className="btn-primary inline-flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              {t('home.hero.readDocs')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs" className="btn-primary inline-flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              {t('home.cta.readDocs')}
            </Link>
            <Link href="/examples" className="btn-secondary inline-flex items-center">
              <Code className="w-4 h-4 mr-2" />
              {t('home.cta.viewExamples')}
            </Link>
            <Link href="/about" className="btn-secondary inline-flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              {t('home.cta.learnMore')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 