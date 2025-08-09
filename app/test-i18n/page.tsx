'use client'

import { useTranslations } from '../../lib/i18n'

export default function TestI18n() {
  const { t, locale, isClient, isInitialized } = useTranslations()

  return (
    <div className="bg-black min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">国际化测试页面</h1>
        
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">系统状态</h2>
            <div className="space-y-2 text-gray-300">
              <p>当前语言: <span className="text-blue-400">{locale}</span></p>
              <p>客户端: <span className="text-blue-400">{isClient ? '是' : '否'}</span></p>
              <p>已初始化: <span className="text-blue-400">{isInitialized ? '是' : '否'}</span></p>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">翻译测试</h2>
            <div className="space-y-2 text-gray-300">
              <p>导航 - 首页: <span className="text-green-400">{t('nav.home')}</span></p>
              <p>导航 - 文档: <span className="text-green-400">{t('nav.docs')}</span></p>
              <p>首页标题: <span className="text-green-400">{t('home.hero.title')}</span></p>
              <p>首页副标题: <span className="text-green-400">{t('home.hero.subtitle')}</span></p>
              <p>页脚描述: <span className="text-green-400">{t('footer.description')}</span></p>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">文档翻译测试</h2>
            <div className="space-y-2 text-gray-300">
              <p>文档标题: <span className="text-green-400">{t('docs.title')}</span></p>
              <p>快速开始标题: <span className="text-green-400">{t('docs.gettingStarted.title')}</span></p>
              <p>CLI 标题: <span className="text-green-400">{t('docs.cli.title')}</span></p>
              <p>标准库标题: <span className="text-green-400">{t('docs.standardLibrary.title')}</span></p>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">错误测试</h2>
            <div className="space-y-2 text-gray-300">
              <p>不存在的键: <span className="text-red-400">{t('nonexistent.key')}</span></p>
              <p>空键: <span className="text-red-400">{t('')}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
