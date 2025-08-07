'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Github } from 'lucide-react'
import Logo from './Logo'
import { useTranslations } from '../lib/i18n'

// X Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export default function Footer() {
  const { t, locale, isClient, isInitialized } = useTranslations()

  // 使用 useMemo 确保导航链接在语言切换时重新计算
  const navigation = useMemo(() => ({
    main: [
      { name: t('footer.links.docs'), href: '/docs' },
      { name: t('footer.links.examples'), href: '/examples' },
      { name: t('footer.links.download'), href: '/download' },
      { name: t('footer.links.about'), href: '/about' },
      { name: t('footer.links.blog'), href: '/blog' },
    ],
    social: [
      {
        name: t('footer.community.github'),
        href: 'https://github.com/cardity-org/cardity-core',
        icon: Github,
      },
      {
        name: t('footer.community.twitter'),
        href: 'https://twitter.com/carditylang',
        icon: XIcon,
      },
    ],
  }), [t, locale, isClient, isInitialized])

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo and Description */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <Logo size={32} />
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  {t('footer.links.docs')}
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/docs/getting-started"
                      className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {t('footer.docs.gettingStarted')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/cli"
                      className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {t('footer.docs.cliReference')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/deploy"
                      className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {t('footer.docs.deployment')}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  {t('footer.community.title')}
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="https://github.com/cardity-org/cardity-core"
                      className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('footer.community.github')}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/carditylang"
                      className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('footer.community.twitter')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  {t('footer.links.examples')}
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/examples"
                      className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {t('footer.examples.smartProtocols')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/download/examples"
                      className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {t('footer.examples.downloadExamples')}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  {t('footer.legal.title')}
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {t('footer.legal.privacy')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {t('footer.legal.terms')}
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/cardity-org/cardity-core/blob/main/LICENSE"
                      className="text-base text-gray-300 hover:text-white transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('footer.legal.license')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 text-center">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
} 