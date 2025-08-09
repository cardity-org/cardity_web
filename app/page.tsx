'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Code, Zap, Shield, Globe, ArrowRight, Download, BookOpen, Play, Package, Database, FileText } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import Logo from '../components/Logo'
import { useTranslations } from '../lib/i18n'

export default function Home() {
  const { t, locale } = useTranslations()
  const langParam = useMemo(() => (locale === 'zh' ? '?lang=zh' : '?lang=en'), [locale])

  // Hero mouse-follow spotlight and lightweight particles
  const heroRef = useRef<HTMLDivElement | null>(null)
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const particles = useMemo(
    () => [
      { x: '10%', y: '20%', size: 3, depth: 0.02 },
      { x: '25%', y: '60%', size: 2, depth: 0.03 },
      { x: '40%', y: '35%', size: 2, depth: 0.015 },
      { x: '60%', y: '25%', size: 3, depth: 0.02 },
      { x: '75%', y: '55%', size: 2, depth: 0.025 },
      { x: '85%', y: '30%', size: 3, depth: 0.018 },
      { x: '30%', y: '80%', size: 2, depth: 0.02 },
      { x: '55%', y: '75%', size: 3, depth: 0.03 },
    ],
    []
  )

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    // Initialize to center
    const rect = el.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    el.style.setProperty('--mx', `${centerX}px`)
    el.style.setProperty('--my', `${centerY}px`)

    let frameId: number | null = null
    const onMove = (e: MouseEvent) => {
      if (!el) return
      const bounds = el.getBoundingClientRect()
      const x = e.clientX - bounds.left
      const y = e.clientY - bounds.top
      // rAF throttle
      if (frameId) cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${x}px`)
        el.style.setProperty('--my', `${y}px`)
        setMouse({ x, y })
      })
    }
    el.addEventListener('mousemove', onMove)
    return () => {
      el.removeEventListener('mousemove', onMove)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden" ref={heroRef}>
        <div className="hero-grid -z-10" />
        {/* Decorative background blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-cardity-600/30 to-cardity-800/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-cardity-700/20 to-cardity-400/20 blur-3xl" />
          <div className="absolute inset-x-0 top-1/3 h-32 bg-gradient-to-r from-cardity-600/10 via-transparent to-cardity-600/10 animate-gradient" />
        </div>
        {/* Mouse-follow spotlight */}
        <div className="hero-spotlight -z-10" />
        {/* Lightweight particle dots (parallax) */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {particles.map((p, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                transform: `translate(${(mouse.x - 0.5 * (heroRef.current?.clientWidth || 0)) * p.depth}px, ${(mouse.y - 0.5 * (heroRef.current?.clientHeight || 0)) * p.depth}px)`,
              }}
              className="rounded-full bg-cardity-400/60 shadow-[0_0_12px_rgba(56,189,248,0.25)]"
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-2 rounded-2xl bg-gradient-to-br from-cardity-500/20 to-cardity-800/20 ring-1 ring-cardity-800/40">
                <Logo size={84} showText={false} />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="gradient-text">{t('home.hero.title')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              {t('home.hero.subtitle')}
            </p>
            
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              {t('home.hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href={`/docs/getting-started${langParam}`} className="btn-primary btn-glow inline-flex items-center">
                <Play className="w-4 h-4 mr-2" />
                {t('home.hero.getStarted')}
              </Link>
              <Link href={`/docs${langParam}`} className="btn-secondary inline-flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                {t('home.hero.readDocs')}
              </Link>
              <Link href={`/download${langParam}`} className="btn-outline inline-flex items-center">
                <Download className="w-4 h-4 mr-2" />
                {t('home.hero.downloadTools')}
              </Link>
            </div>
            
            {/* Version Badge */}
            <div className="inline-flex items-center bg-cardity-900/30 border border-cardity-700/30 rounded-full px-4 py-2 text-cardity-200 shadow-sm shadow-cardity-900/20">
              <Package className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">v1.0.1</span>
              <span className="text-xs text-cardity-300 ml-2">{t('home.hero.latestVersion')}</span>
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
            <p className="text-lg text-gray-400">
              {t('home.features.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card card-gradient text-center hover:translate-y-[-2px] transition-transform">
              <div className="bg-gradient-to-r from-cardity-500 to-cardity-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ring-1 ring-cardity-800/50">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('home.features.compiler.title')}
              </h3>
              <p className="text-gray-400">
                {t('home.features.compiler.description')}
              </p>
            </div>
            
            <div className="card card-gradient text-center hover:translate-y-[-2px] transition-transform">
              <div className="bg-gradient-to-r from-cardity-500 to-cardity-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ring-1 ring-cardity-800/50">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t('home.features.packageManager.title')}
              </h3>
              <p className="text-gray-400">
                {t('home.features.packageManager.description')}
              </p>
            </div>
            
            <div className="card card-gradient text-center hover:translate-y-[-2px] transition-transform">
              <div className="bg-gradient-to-r from-cardity-500 to-cardity-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ring-1 ring-cardity-800/50">
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
      <section className="py-20 bg-dark-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.installation.title')}
            </h2>
            <p className="text-lg text-gray-400">
              {t('home.installation.subtitle')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card card-gradient">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-cardity-400" />
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
            
            <div className="card card-gradient">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-cardity-300" />
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
            <p className="text-lg text-gray-400">
              {t('home.quickStart.subtitle')}
            </p>
          </div>
          
          <div className="card card-gradient">
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
            <Link href={`/docs/getting-started${langParam}`} className="btn-primary inline-flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              {t('home.hero.readDocs')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cardity-900/20 to-cardity-700/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {t('home.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/docs${langParam}`} className="btn-primary inline-flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              {t('home.cta.readDocs')}
            </Link>
            <Link href={`/examples${langParam}`} className="btn-secondary inline-flex items-center">
              <Code className="w-4 h-4 mr-2" />
              {t('home.cta.viewExamples')}
            </Link>
            <Link href={`/about${langParam}`} className="btn-secondary inline-flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              {t('home.cta.learnMore')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 