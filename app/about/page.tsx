import type { Metadata } from 'next'
import AboutContent from '../../components/AboutContent'

export const metadata: Metadata = {
  title: 'About Cardity',
  description: 'Learn how Cardity Core works as the protocol compiler layer for agent-generated systems.',
  keywords: 'Cardity Core, agent protocol layer, Agent OS, MCP, protocol compiler',
  openGraph: {
    title: 'About Cardity Core - Agent Protocol Layer',
    description: 'Protocol compiler layer for agents: ABI, protocol JSON, and Agent OS manifests.',
  },
}

export default function AboutPage() {
  return <AboutContent />
} 
