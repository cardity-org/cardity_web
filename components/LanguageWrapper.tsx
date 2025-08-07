'use client'

import { useEffect } from 'react'
import { useTranslations } from '../lib/i18n'

export default function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { locale, isInitialized } = useTranslations()

  useEffect(() => {
    if (isInitialized) {
      // 动态设置 html 的 lang 属性
      document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    }
  }, [locale, isInitialized])

  return <>{children}</>
}
