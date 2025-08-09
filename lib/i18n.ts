"use client"

import { useState, useEffect, useMemo, useCallback } from 'react'

// 引入所有翻译文件
import enCommon from '../locales/en/common.json'
import enNav from '../locales/en/nav.json'
import enNavigation from '../locales/en/navigation.json'
import enHome from '../locales/en/home.json'
import enDocs from '../locales/en/docs.json'
import enGettingStarted from '../locales/en/docs/getting-started.json'
import enReference from '../locales/en/docs/reference.json'
import enCli from '../locales/en/docs/cli.json'
import enStandardLibrary from '../locales/en/docs/standard-library.json'
import enDeploy from '../locales/en/docs/deploy.json'
import enDeveloperGuide from '../locales/en/docs/developer-guide.json'
import enExamples from '../locales/en/examples.json'
import enDownload from '../locales/en/download.json'
import enAbout from '../locales/en/about.json'

import zhCommon from '../locales/zh/common.json'
import zhNav from '../locales/zh/nav.json'
import zhNavigation from '../locales/zh/navigation.json'
import zhHome from '../locales/zh/home.json'
import zhDocs from '../locales/zh/docs.json'
import zhGettingStarted from '../locales/zh/docs/getting-started.json'
import zhReference from '../locales/zh/docs/reference.json'
import zhCli from '../locales/zh/docs/cli.json'
import zhStandardLibrary from '../locales/zh/docs/standard-library.json'
import zhDeploy from '../locales/zh/docs/deploy.json'
import zhDeveloperGuide from '../locales/zh/docs/developer-guide.json'
import zhExamples from '../locales/zh/examples.json'
import zhDownload from '../locales/zh/download.json'
import zhAbout from '../locales/zh/about.json'

// 支持的语言列表
export const locales = ['en', 'zh'] as const
export type Locale = typeof locales[number]

// 默认语言
export const defaultLocale: Locale = 'en'

// 语言名称映射
export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文'
}

// 合并所有翻译文件
const enTranslations = {
  ...enCommon,
  nav: enNav,
  navigation: enNavigation,
  home: enHome,
  docs: {
    ...enDocs,
    gettingStarted: enGettingStarted,
    reference: enReference,
    cli: enCli,
    standardLibrary: enStandardLibrary,
    deploy: enDeploy,
    developerGuide: enDeveloperGuide
  },
  examples: enExamples,
  download: enDownload,
  about: enAbout
  ,
  // Expose about2 at top-level for simplified access
  about2: (enAbout as any).about2
}

const zhTranslations = {
  ...zhCommon,
  nav: zhNav,
  navigation: zhNavigation,
  home: zhHome,
  docs: {
    ...zhDocs,
    gettingStarted: zhGettingStarted,
    reference: zhReference,
    cli: zhCli,
    standardLibrary: zhStandardLibrary,
    deploy: zhDeploy,
    developerGuide: zhDeveloperGuide
  },
  examples: zhExamples,
  download: zhDownload,
  about: zhAbout
  ,
  // Expose about2 at top-level for simplified access
  about2: (zhAbout as any).about2
}

// 获取嵌套对象的值
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined
  }, obj)
}

// 使用翻译的 Hook
export function useTranslations() {
  const [locale, setLocale] = useState<Locale>(getInitialLocaleSync())
  const [isInitialized, setIsInitialized] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // 标记为已初始化并检测语言
  useEffect(() => {
    setIsClient(true)
    
    // 检测并设置正确的语言（如果需要的话）
    const detectedLocale = getCurrentLocale()
    
    // 只有在检测到的语言与当前语言不同时才设置
    if (detectedLocale !== locale) {
      setLocale(detectedLocale)
    }
    
    setIsInitialized(true)
  }, []) // 只在组件挂载时运行一次

  const translations = useMemo(() => {
    return locale === 'zh' ? zhTranslations : enTranslations
  }, [locale])

  const t = useCallback((key: string, params?: Record<string, string | number>): any => {
    // 仅在服务器端渲染时使用英文，客户端始终使用当前 locale 的 translations
    if (typeof window === 'undefined') {
      const enValue = getNestedValue(enTranslations, key)
      if (enValue === undefined) return key
      if (typeof enValue === 'string' && params) {
        return Object.entries(params).reduce((str, [k, val]) => str.replace(new RegExp(`{${k}}`, 'g'), String(val)), enValue)
      }
      return enValue
    }

    const localized = getNestedValue(translations, key)
    const fallback = getNestedValue(enTranslations, key)
    const value = localized !== undefined ? localized : fallback
    if (value === undefined) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    if (typeof value === 'string' && params) {
      return Object.entries(params).reduce((str, [k, val]) => str.replace(new RegExp(`{${k}}`, 'g'), String(val)), value)
    }
    return value
  }, [translations])

  const switchLanguage = useCallback((newLocale: Locale) => {
    setLocale(newLocale)
    try { localStorage.setItem('cardity-locale', newLocale) } catch {}
    const url = new URL(window.location.href)
    // 需求：任何页面都携带 lang 参数，即便是英文
    url.searchParams.set('lang', newLocale)
    // 全量刷新当前页面，避免水合与状态残留
    window.location.replace(url.toString())
  }, [])

  return {
    t,
    locale,
    locales,
    localeNames,
    switchLanguage,
    isInitialized,
    isClient
  }
}

// 切换语言的函数
export function useLanguageSwitcher() {
  const { switchLanguage } = useTranslations()
  return { switchLanguage }
}

// 获取当前语言
export function getCurrentLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale
  }
  
  // 优先从 URL 参数获取
  const urlParams = new URLSearchParams(window.location.search)
  const urlLocale = urlParams.get('lang') as Locale
  if (urlLocale && locales.includes(urlLocale)) {
    try { localStorage.setItem('cardity-locale', urlLocale) } catch {}
    return urlLocale
  }
  
  // 然后从 localStorage 获取
  const savedLocale = localStorage.getItem('cardity-locale') as Locale
  if (savedLocale && locales.includes(savedLocale)) {
    // 如果 URL 未带 lang，则补齐
    const url = new URL(window.location.href)
    url.searchParams.set('lang', savedLocale)
    window.history.replaceState({}, '', url.toString())
    return savedLocale
  }
  
  // 默认 en：也写入 URL，满足“任何页面都需要带参数”
  const url = new URL(window.location.href)
  url.searchParams.set('lang', 'en')
  window.history.replaceState({}, '', url.toString())
  return defaultLocale
}

// 获取初始语言（用于避免闪烁）
export function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale
  }
  
  // 优先从 URL 参数获取
  const urlParams = new URLSearchParams(window.location.search)
  const urlLocale = urlParams.get('lang') as Locale
  if (urlLocale && locales.includes(urlLocale)) {
    return urlLocale
  }
  
  // 然后从 localStorage 获取
  const savedLocale = localStorage.getItem('cardity-locale') as Locale
  if (savedLocale && locales.includes(savedLocale)) {
    return savedLocale
  }
  
  // 最后从浏览器语言检测
  const browserLang = navigator.language.split('-')[0]
  if (browserLang === 'zh') {
    return 'zh'
  }
  
  return defaultLocale
}

// 同步获取初始语言（用于服务器端渲染）
export function getInitialLocaleSync(): Locale {
  // 为避免 SSR 与 Hydration 字面不一致，首帧始终使用默认语言；
  // 实际语言通过 useEffect 异步切换
  return defaultLocale
}

// 格式化日期
export function formatDate(date: Date, locale: Locale): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', options).format(date)
}

// 格式化数字
export function formatNumber(num: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US').format(num)
} 