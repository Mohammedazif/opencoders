import Link from 'next/link'
import { GroupGrid, PageHero, Questions, SectionTitle } from '@/components/blocks'
import { buttonClass, focus } from '@/components/kit'
import { LetterBadge } from '@/components/practice-view'
import { SiteFrame } from '@/components/site-frame'
import { letters } from '@/lib/nav'
import { lanes, type Lane } from '@/lib/site'
import { cn } from '@/lib/utils'

const development = letters[2]

export function LaneView({ lane }: { lane: Lane }) {
  const others = lanes.filter((item) => item.slug !== lane.slug)
  return (
    <SiteFrame defaultInterest={lane.slug === 'teams' ? 'An engineering team' : development.name}>
      <article>
        <PageHero
          eyebrow={
            <>
              <LetterBadge letter={development} />
              <Link href={development.href} className={cn('rounded-sm hover:text-foreground', focus)}>
                Development
              </Link>
            </>
          }
          title={lane.title}
          lede={lane.lede}
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className={buttonClass('primary')}>
              {lane.slug === 'teams' ? 'Talk about a team' : 'Start a project'}
            </a>
          </div>
        </PageHero>

        <section className="container mt-24 px-container md:mt-32">
          <SectionTitle title="What it covers" subtitle={lane.description} className="mb-12" />
          <GroupGrid groups={lane.groups} />
        </section>

        <section className="container mt-24 grid gap-12 px-container md:mt-32 lg:grid-cols-3">
          <SectionTitle title="Questions" subtitle="Common questions." />
          <div className="lg:col-span-2">
            <Questions items={lane.questions} />
          </div>
        </section>

        <section className="container mt-24 px-container md:mt-32">
          <p className="text-xs font-medium uppercase tracking-wider text-foreground-secondary">
            More development disciplines
          </p>
          <ul className="mt-4 grid gap-px overflow-hidden rounded-xl border bg-line sm:grid-cols-2 lg:grid-cols-4">
            {others.map((item) => (
              <li key={item.href} className="flex bg-background">
                <Link
                  href={item.href}
                  className={cn('group flex w-full flex-col gap-2 p-6 transition-colors hover:bg-background-offset', focus)}
                >
                  <span className="flex items-center justify-between text-xl font-semibold">
                    {item.title}
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                  <span className="text-base text-foreground-secondary">{item.lede}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </SiteFrame>
  )
}
