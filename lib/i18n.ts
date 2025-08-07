"use client"

import { useState, useEffect, useMemo, useCallback } from 'react'
import enTranslations from '../locales/en/common.json'
import zhTranslations from '../locales/zh/common.json'

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
    // 在服务器端或客户端未初始化时，始终返回英文翻译
    if (typeof window === 'undefined' || !isClient || !isInitialized) {
      const enValue = getNestedValue(enTranslations, key)
      if (enValue !== undefined) {
        if (typeof enValue === 'string') {
          if (params) {
            return Object.entries(params).reduce((str, [key, val]) => {
              return str.replace(new RegExp(`{${key}}`, 'g'), String(val))
            }, enValue)
          }
          return enValue
        }
        return enValue
      }
      return key
    }

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

    return value
  }, [translations, locale, isClient, isInitialized])

  const switchLanguage = useCallback((newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem('cardity-locale', newLocale)
    
    // 更新 URL 参数
    const url = new URL(window.location.href)
    if (newLocale === 'en') {
      url.searchParams.delete('lang')
    } else {
      url.searchParams.set('lang', newLocale)
    }
    window.history.replaceState({}, '', url.toString())
    
    // 刷新页面以确保所有组件都使用新的语言
    window.location.reload()
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
    return urlLocale
  }
  
  // 然后从 localStorage 获取
  const savedLocale = localStorage.getItem('cardity-locale') as Locale
  if (savedLocale && locales.includes(savedLocale)) {
    return savedLocale
  }
  
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
  // 在服务器端渲染时始终返回英文，避免水合错误
  if (typeof window === 'undefined') {
    return defaultLocale
  }
  
  // 在客户端，尝试获取当前语言，但避免复杂的检测逻辑
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