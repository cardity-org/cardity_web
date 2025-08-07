'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslations } from '../lib/i18n'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, locale, isClient, isInitialized } = useTranslations()

  // 使用 useMemo 确保导航菜单项在语言切换时重新计算
  const navigation = useMemo(() => [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.docs'), href: '/docs' },
    { name: t('nav.examples'), href: '/examples' },
    { name: t('nav.download'), href: '/download' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.about'), href: '/about' },
  ], [t, locale, isClient, isInitialized])

  return (
    <header className="bg-black/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size={36} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switcher and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 