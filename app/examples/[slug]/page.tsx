import ExampleDetailClient from './ExampleDetailClient'

export const dynamicParams = false

export async function generateStaticParams() {
  return [{ slug: 'merchant-erp-v1-1' }]
}

export default function ExampleDetailPage() {
  return <ExampleDetailClient />
}
