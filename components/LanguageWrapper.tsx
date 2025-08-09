'use client'

import { useEffect } from 'react'
import { useTranslations } from '../lib/i18n'

export default function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { locale, isInitialized } = useTranslations()

  useEffect(() => {
    if (isInitialized) {
      // 动态设置 html 的 lang 属性
      document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
      // 确保 URL 始终带有 lang 参数，且与当前 locale 一致
      const url = new URL(window.location.href)
      const curr = url.searchParams.get('lang')
      const desired = locale
      if (curr !== desired) {
        if (desired === 'en') {
          // 英文为默认，也显式写入，满足“任何页面都需要带参数”的需求
          url.searchParams.set('lang', 'en')
        } else {
          url.searchParams.set('lang', desired)
        }
        window.history.replaceState({}, '', url.toString())
      }
    }
  }, [locale, isInitialized])

  // 防止首帧水合不一致：在初始化前用一个最小占位
  if (!isInitialized) {
    return <div className="min-h-screen" />
  }
  return <>{children}</>
}
