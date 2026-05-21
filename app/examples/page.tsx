import type { Metadata } from 'next'
import ExamplesContent from './components/ExamplesContent'

export const metadata: Metadata = {
  title: 'Protocol Examples',
  description: 'Explore Cardity protocol examples for agent-generated support desks, workflows, CRM systems, and Agent OS manifests.',
  keywords: 'Cardity examples, protocol examples, Agent OS manifest, MCP tools, agent generated systems',
  openGraph: {
    title: 'Cardity Protocol Examples',
    description: 'Examples of agent-ready protocol contracts and compiled artifacts.',
  },
}

export default function ExamplesPage() {
  return <ExamplesContent />
} 
