import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cardity - 智能合约编程语言',
  description: 'Cardity 是一个专为 Dogecoin UTXO 设计的智能合约编程语言，提供 Solidity 风格的语法和强大的合约逻辑能力。',
  keywords: 'Cardity, 智能合约, Dogecoin, UTXO, 编程语言, 区块链',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 