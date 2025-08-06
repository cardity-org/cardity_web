'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Code } from 'lucide-react'

const navigation = [
  { name: '文档', href: '/docs' },
  { name: '示例', href: '/examples' },
  { name: '博客', href: '/blog' },
  { name: '关于', href: '/about' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="bg-cardity-600 text-white p-2 rounded-lg mr-3">
                <Code className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">Cardity</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-cardity-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/docs/getting-started" className="btn-primary">
              开始使用
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">打开菜单</span>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-600 hover:text-cardity-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/docs/getting-started"
                  className="block w-full text-center btn-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  开始使用
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 