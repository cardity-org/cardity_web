import type { Metadata } from 'next'
import ExamplesContent from './components/ExamplesContent'

export const metadata: Metadata = {
  title: 'Code Examples',
  description: 'Explore Cardity smart protocol examples including Hello World, DRC-20 tokens, wallets, voting systems, and more. Learn from real-world code samples.',
  keywords: 'Cardity examples, smart protocol samples, DRC-20 tokens, wallet protocols, voting systems, code samples',
  openGraph: {
    title: 'Cardity Code Examples - Smart Protocol Samples',
    description: 'Explore real-world Cardity smart protocol examples including DRC-20 tokens, wallets, voting systems, and more.',
  },
}

export default function ExamplesPage() {
  return <ExamplesContent />
} 