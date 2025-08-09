'use client'

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useTranslations, type Locale } from '../lib/i18n'

export default function LanguageSwitcher() {
  const { locale, localeNames, switchLanguage, isClient, isInitialized } = useTranslations()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLanguageChange = useCallback((newLocale: Locale) => {
    switchLanguage(newLocale)
    setIsOpen(false)
  }, [switchLanguage])

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const closeDropdown = useCallback(() => {
    setIsOpen(false)
  }, [])

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // 缓存语言选项列表
  const languageOptions = useMemo(() => {
    return [
      { code: 'en' as Locale, name: 'English' },
      { code: 'zh' as Locale, name: '中文' }
    ]
  }, [])

  // 当前显示的语言名称
  const currentLanguageName = useMemo(() => {
    return locale === 'zh' ? '中文' : 'English'
  }, [locale])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-800/50"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">
          {currentLanguageName}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {languageOptions.map(({ code, name }) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                  (isClient && isInitialized ? locale : 'en') === code
                    ? 'text-blue-400 bg-blue-900/20'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}


    </div>
  )
} 