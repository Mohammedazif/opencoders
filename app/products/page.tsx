import { ProductEntry } from '@/components/home/sections'
import { PageHero } from '@/components/blocks'
import { SiteFrame } from '@/components/site-frame'
import { products } from '@/lib/products'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'Products',
  'OpenCoders products: OpenTwin, OpenDesk, OpenLand, and CAD & Revit plugins for AEC and BIM teams.',
  '/products'
)

export default function Page() {
  return (
    <SiteFrame defaultInterest="A product">
      <PageHero
        eyebrow="Products"
        title="Software for AEC teams."
        lede="OpenTwin, OpenDesk, OpenLand, and plugins for Revit and AutoCAD. Built for architects, engineers, and contractors."
      />
      <section className="mt-16 md:mt-24">
        {products.map((product) => (
          <ProductEntry key={product.slug} product={product} as="h2" />
        ))}
      </section>
    </SiteFrame>
  )
}
