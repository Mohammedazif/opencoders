import { HomeHero } from '@/components/home/hero'
import { PhysicsPlayground, type PhysicsItem } from '@/components/home/physics'
import { CtaCards, Marquee, ProductsList, ServicesBrief, Steps } from '@/components/home/sections'
import { SiteFrame } from '@/components/site-frame'
import { letters } from '@/lib/nav'
import { products } from '@/lib/products'

const stack = [
  'Revit API',
  'IFC',
  'OpenBIM',
  'Digital twins',
  'Unreal Engine',
  'Web 3D',
  'RAG',
  'Computer vision',
  'Next.js',
  'Data pipelines',
  'SEO',
  'Lead generation',
  'Brand identity',
  'Motion graphics',
  'Explainer video',
  'Technical writing',
]

const playground: PhysicsItem[] = [
  ...letters.map((item) => ({ label: item.letter, kind: 'dot' as const, color: item.color })),
  ...products.map((product) => ({
    label: product.name,
    kind: 'card' as const,
    color: product.tint[1],
  })),
  ...['AEC / BIM', 'Software', 'AI & data', '3D & real-time', 'Remote teams', 'Video', 'Design', 'Search', 'PR', 'Brand'].map(
    (label) => ({ label })
  ),
]

export default function Page() {
  return (
    <SiteFrame>
      <HomeHero />
      <ProductsList />
      <ServicesBrief />
      <Marquee items={stack} />
      <section className="container mt-24 px-container md:mt-32">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-5xl font-medium text-foreground-secondary">Play</h2>
          <p className="text-5xl font-medium">Everything we do.</p>
          <p className="mt-3 text-2xl text-foreground-secondary">Grab a piece and throw it.</p>
        </div>
        <PhysicsPlayground items={playground} />
      </section>
      <Steps />
      <CtaCards />
    </SiteFrame>
  )
}
