'use client'

import { useTranslations } from '../../lib/i18n'
import { useState, useEffect } from 'react'

export default function TestI18nPage() {
  const { t, locale, switchLanguage, isClient, isInitialized } = useTranslations()
  const [testKey, setTestKey] = useState('nav.home')
  const [renderCount, setRenderCount] = useState(0)

  const testKeys = [
    'nav.home',
    'nav.docs', 
    'nav.examples',
    'nav.download',
    'nav.blog',
    'nav.about'
  ]

  // 跟踪渲染次数
  useEffect(() => {
    setRenderCount(prev => prev + 1)
  })

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">国际化测试页面</h1>
        
        <div className="mb-8 p-4 bg-gray-800 rounded">
          <h2 className="text-xl font-semibold mb-4">调试信息</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>当前语言:</strong> {locale}
            </div>
            <div>
              <strong>客户端:</strong> {isClient ? '是' : '否'}
            </div>
            <div>
              <strong>已初始化:</strong> {isInitialized ? '是' : '否'}
            </div>
            <div>
              <strong>渲染次数:</strong> {renderCount}
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">语言切换测试</h2>
          <div className="flex gap-4 mb-4">
            <button 
              onClick={() => switchLanguage('en')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              切换到英文
            </button>
            <button 
              onClick={() => switchLanguage('zh')}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              切换到中文
            </button>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                localStorage.removeItem('cardity-locale')
                window.location.reload()
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
            >
              清除缓存并刷新
            </button>
            <button 
              onClick={() => {
                const url = new URL(window.location.href)
                url.searchParams.delete('lang')
                window.history.replaceState({}, '', url.toString())
                window.location.reload()
              }}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded text-sm"
            >
              清除URL参数并刷新
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">导航菜单测试</h2>
          <div className="grid grid-cols-2 gap-4">
            {testKeys.map(key => (
              <div key={key} className="p-4 border border-gray-600 rounded">
                <div className="text-sm text-gray-400 mb-1">Key: {key}</div>
                <div className="text-lg">{t(key)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">动态测试</h2>
          <div className="mb-4">
            <label className="block text-sm mb-2">选择测试键:</label>
            <select 
              value={testKey} 
              onChange={(e) => setTestKey(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded px-3 py-2"
            >
              {testKeys.map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <div className="p-4 border border-gray-600 rounded">
            <div className="text-sm text-gray-400 mb-1">Key: {testKey}</div>
            <div className="text-lg">{t(testKey)}</div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">页面内容测试</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-600 rounded">
              <h3 className="font-semibold mb-2">首页标题</h3>
              <p>{t('home.hero.title')}</p>
            </div>
            <div className="p-4 border border-gray-600 rounded">
              <h3 className="font-semibold mb-2">首页副标题</h3>
              <p>{t('home.hero.subtitle')}</p>
            </div>
            <div className="p-4 border border-gray-600 rounded">
              <h3 className="font-semibold mb-2">文档标题</h3>
              <p>{t('docs.title')}</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <p>测试说明:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>点击语言切换按钮，观察页面内容是否立即更新</li>
            <li>检查导航菜单项是否正确切换语言</li>
            <li>验证动态选择的测试键是否正确翻译</li>
            <li>确认页面内容在不同语言下显示正确</li>
            <li>观察渲染次数是否合理（不应该无限增长）</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
