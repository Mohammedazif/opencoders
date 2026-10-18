import { PageHero } from '@/components/blocks'
import { ServicesColumns, Steps } from '@/components/home/sections'
import { SiteFrame } from '@/components/site-frame'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'Disciplines',
  'OpenCoders disciplines: content, marketing, and development, including BIM software, apps, AI, 3D, and remote teams.',
  '/services'
)

export default function Page() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Disciplines"
        title={
          <>
            Content, marketing,{' '}
            <span className="text-foreground-secondary">and development.</span>
          </>
        }
        lede="Hire one discipline, or combine them. Each page below explains what is included."
      />
      <div className="mt-16 md:mt-24">
        <ServicesColumns intro={false} />
      </div>
      <Steps />
    </SiteFrame>
  )
}
