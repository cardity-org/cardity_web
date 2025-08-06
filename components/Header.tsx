'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const navigation = [
  { name: 'Documentation', href: '/docs' },
  { name: 'Examples', href: '/examples' },
  { name: 'Download', href: '/download' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-black/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo size={36} />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/docs/getting-started" className="btn-primary">
              Get Started
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-800">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-white font-medium"
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
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 