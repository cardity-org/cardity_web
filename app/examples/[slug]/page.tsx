import ExampleDetailClient from './ExampleDetailClient'

export const dynamicParams = false

export async function generateStaticParams() {
  return [{ slug: 'legacy-protocol-note' }]
}

export default function ExampleDetailPage() {
  return <ExampleDetailClient />
}
