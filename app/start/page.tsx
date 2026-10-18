import Link from 'next/link'
import { PageHero } from '@/components/blocks'
import { focus } from '@/components/kit'
import { SiteFrame } from '@/components/site-frame'
import { approaches, pageMeta } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata = pageMeta(
  'Start',
  'Start a project with OpenCoders: content, marketing, development, products, or remote developers.',
  '/start'
)

export default function Page() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Start a project"
        title={
          <>
            Start a{' '}
            <span className="text-foreground-secondary">project.</span>
          </>
        }
        lede="Choose what you need below, or fill in the form and we will get back to you."
      />

      <div className="container mt-16 px-container md:mt-24">
      <div className="grid gap-px overflow-hidden rounded-xl border bg-line sm:grid-cols-2">
        {approaches.map((item, i) => (
          <section key={item.id} id={item.id} className="flex scroll-mt-24 flex-col justify-between gap-10 bg-background p-6 md:p-8">
            <div>
              <span className="font-mono text-sm text-foreground-secondary">0{i + 1}</span>
              <h2 className="mt-8 text-3xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-lg text-foreground-secondary">{item.body}</p>
            </div>
            <p className="flex flex-wrap gap-3">
              <Link
                href={item.href}
                className={cn('inline-flex h-10 items-center rounded-lg border px-4 font-medium hover:bg-background-offset', focus)}
              >
                {item.cta} →
              </Link>
              {'secondaryHref' in item ? (
                <Link
                  href={item.secondaryHref}
                  className={cn('inline-flex h-10 items-center rounded-lg border px-4 font-medium hover:bg-background-offset', focus)}
                >
                  {item.secondaryCta} →
                </Link>
              ) : null}
            </p>
          </section>
        ))}
      </div>
      </div>
    </SiteFrame>
  )
}
