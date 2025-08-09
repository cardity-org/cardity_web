import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LanguageWrapper from '../components/LanguageWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Cardity - Smart Protocols for Dogecoin | Solidity-style Language',
    template: '%s | Cardity'
  },
      description: 'Cardity is a statically-typed programming language designed for developing smart protocols on Dogecoin UTXO. Features Solidity-style syntax, native UTXO protocol support, and powerful protocol logic capabilities.',
  keywords: [
    'Cardity',
          'Smart Protocols',
    'Dogecoin',
    'UTXO',
    'Programming Language',
    'Blockchain',
    'Solidity',
          'Smart Protocol Development',
    'Dogecoin Development',
    'UTXO Protocol',
    'Blockchain Programming',
    'DeFi',
    'Cryptocurrency',
    'Web3'
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
      title: 'Cardity - Smart Protocols for Dogecoin',
      description: 'A statically-typed programming language for developing smart protocols on Dogecoin UTXO with Solidity-style syntax.',
    url: 'https://cardity.org',
    siteName: 'Cardity',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Cardity',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
      twitter: {
      card: 'summary_large_image',
      title: 'Cardity - Smart Protocols for Dogecoin',
      description: 'A statically-typed programming language for developing smart protocols on Dogecoin UTXO with Solidity-style syntax.',
    images: ['/api/og'],
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