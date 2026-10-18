import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/product-detail'
import { SiteFrame } from '@/components/site-frame'
import { productBySlug, products } from '@/lib/products'
import { pageMeta } from '@/lib/site'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = productBySlug(slug)
  if (!product) return {}
  return pageMeta(`${product.name}: ${product.tagline}`, product.summary, `/products/${product.slug}`)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const product = productBySlug(slug)
  if (!product) notFound()

  return (
    <SiteFrame defaultInterest="A product">
      <ProductDetail product={product} />
    </SiteFrame>
  )
}
