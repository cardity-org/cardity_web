import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LanguageWrapper from '../components/LanguageWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Cardity Core - Agent Protocol Layer for AI Agents',
    template: '%s | Cardity'
  },
  description: 'Cardity Core turns one sentence into compiler-checked Agent OS manifests, generic action contracts, projection contracts, schemas, and conformance checks for AI-generated systems.',
  keywords: [
    'Cardity',
    'Cardity Core',
    'Agent Protocol Layer',
    'Agent OS',
    'MCP',
    'Protocol Compiler',
    'ABI',
    'Protocol JSON',
    'AI Agents',
    'System Generation',
    'Developer Tools'
  ].join(', '),
  authors: [{ name: 'Cardity Team' }],
  creator: 'Cardity Team',
  publisher: 'Cardity',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cardity.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Cardity Core - Protocol contracts for AI-generated systems',
    description: 'Turn one sentence into ABI, protocol JSON, Agent OS manifests, generic action contracts, projection v1.1, and schema conformance validated with PMTSoul Agent OS.',
    url: 'https://cardity.org',
    siteName: 'Cardity',
    images: [
      {
        url: '/images/cardity-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Cardity Core protocol contract preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cardity Core - Protocol contracts for AI-generated systems',
    description: 'A public protocol compiler API for agents: ABI, protocol JSON, Agent OS manifests, action contracts, projection contracts, and schemas.',
    images: ['/images/cardity-og.jpg'],
    creator: '@song_doge',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0EA5E9" />
      </head>
      <body className={inter.className}>
        <LanguageWrapper>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageWrapper>
      </body>
    </html>
  )
} 
