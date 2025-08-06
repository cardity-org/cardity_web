import { useState, useEffect, useMemo } from 'react'

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

// 获取嵌套对象的值
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined
  }, obj)
}

// 使用翻译的 Hook
export function useTranslations() {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  // 从 localStorage 或 URL 参数获取语言设置
  useEffect(() => {
    const savedLocale = localStorage.getItem('cardity-locale') as Locale
    if (savedLocale && locales.includes(savedLocale)) {
      setLocale(savedLocale)
    } else {
      // 从 URL 参数获取语言
      const urlParams = new URLSearchParams(window.location.search)
      const urlLocale = urlParams.get('lang') as Locale
      if (urlLocale && locales.includes(urlLocale)) {
        setLocale(urlLocale)
      } else {
        // 从浏览器语言检测
        const browserLang = navigator.language.split('-')[0]
        if (browserLang === 'zh') {
          setLocale('zh')
        } else {
          setLocale('en')
        }
      }
    }
  }, [])

  const translations = useMemo(() => {
    try {
      return require(`../locales/${locale}/common.json`)
    } catch (error) {
      console.warn(`Failed to load translations for locale: ${locale}`, error)
      return require(`../locales/en/common.json`)
    }
  }, [locale])

  const t = (key: string, params?: Record<string, string | number>): string => {
    const value = getNestedValue(translations, key)
    
    if (value === undefined) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }

    if (typeof value === 'string') {
      if (params) {
        return Object.entries(params).reduce((str, [key, val]) => {
          return str.replace(new RegExp(`{${key}}`, 'g'), String(val))
        }, value)
      }
      return value
    }

    return String(value)
  }

  const switchLanguage = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem('cardity-locale', newLocale)
    
    // 更新 URL 参数
    const url = new URL(window.location.href)
    url.searchParams.set('lang', newLocale)
    window.history.replaceState({}, '', url.toString())
  }

  return {
    t,
    locale,
    locales,
    localeNames,
    switchLanguage
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
  
  const savedLocale = localStorage.getItem('cardity-locale') as Locale
  if (savedLocale && locales.includes(savedLocale)) {
    return savedLocale
  }
  
  const urlParams = new URLSearchParams(window.location.search)
  const urlLocale = urlParams.get('lang') as Locale
  if (urlLocale && locales.includes(urlLocale)) {
    return urlLocale
  }
  
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