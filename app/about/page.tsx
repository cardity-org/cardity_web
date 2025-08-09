import type { Metadata } from 'next'
import AboutContent from '../../components/AboutContent'

export const metadata: Metadata = {
  title: 'About Cardity',
  description: 'Learn about Cardity - a statically-typed programming language for developing smart protocols on Dogecoin UTXO with Solidity-style syntax.',
  keywords: 'Cardity about, smart protocol language, Dogecoin development, UTXO programming, blockchain language',
  openGraph: {
    title: 'About Cardity - Smart Protocol Language for Dogecoin',
    description: 'Learn about Cardity programming language, its features, and how it enables smart protocol development on Dogecoin UTXO.',
  },
}

export default function AboutPage() {
  return <AboutContent />
} 