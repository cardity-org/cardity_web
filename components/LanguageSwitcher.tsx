'use client'

import { useState } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useTranslations, type Locale } from '../lib/i18n'

export default function LanguageSwitcher() {
  const { locale, localeNames, switchLanguage } = useTranslations()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (newLocale: Locale) => {
    switchLanguage(newLocale)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-800/50"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {Object.entries(localeNames).map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code as Locale)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                  locale === code
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

      {/* 点击外部关闭下拉菜单 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
} 