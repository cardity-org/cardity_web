'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import CodeBlock from '../../../components/CodeBlock'

export type DocCode = {
  code: string
  language: string
}

export type DocSection = {
  title: string
  body?: string
  bullets?: string[]
  code?: DocCode
}

export type DocLink = {
  label: string
  href: string
}

type DocArticleProps = {
  title: string
  subtitle: string
  sections: DocSection[]
  links?: DocLink[]
}

export default function DocArticle({ title, subtitle, sections, links = [] }: DocArticleProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
        <p className="text-lg text-gray-300">{subtitle}</p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title} className="card card-gradient">
            <h2 className="text-2xl font-semibold text-white mb-4">{section.title}</h2>
            {section.body && <p className="text-gray-300 mb-4">{section.body}</p>}
            {section.bullets && (
              <ul className="space-y-2 text-gray-300 mb-4">
                {section.bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cardity-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.code && (
              <CodeBlock code={section.code.code} language={section.code.language} showLineNumbers={section.code.language !== 'bash'} />
            )}
          </section>
        ))}
      </div>

      {links.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between rounded-lg border border-dark-800 bg-dark-900/70 px-5 py-4 text-cardity-200 transition-colors hover:border-cardity-700/60 hover:bg-dark-800/70"
            >
              <span className="font-medium">{link.label}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}
