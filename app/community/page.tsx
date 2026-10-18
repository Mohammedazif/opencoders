import Link from 'next/link'
import { PageHero, SectionTitle } from '@/components/blocks'
import { buttonClass, focus } from '@/components/kit'
import { SiteFrame } from '@/components/site-frame'
import { audience, pageMeta } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata = pageMeta(
  'Community',
  'The OpenCoders community brings together developers, designers, marketers, learners, and AEC professionals.',
  '/community'
)

const activities = [
  'Knowledge sharing',
  'Technical discussion',
  'Skill building',
  'Introductions',
  'Workshops',
  'Events',
  'Collaboration',
  'Open source',
  'Industry conversations',
]

const doors = [
  { title: 'Take part', body: 'Join events, workshops, and discussions.', href: '/start#people', cta: 'Get in touch' },
  { title: 'Hire the company', body: 'Content, marketing, development, or products.', href: '/start#customers', cta: 'Start a project' },
  { title: 'Work on delivery', body: 'Join one of our remote engineering teams.', href: '/development/teams', cta: 'Teams' },
]

export default function Page() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Community"
        title={
          <>
            The OpenCoders community.{' '}
            <span className="text-foreground-secondary">Practitioners and learners.</span>
          </>
        }
        lede="Developers, designers, marketers, learners, and AEC professionals. They compare work, build skill, and meet."
      >
        <ul className="mt-10 flex flex-wrap gap-2">
          {activities.map((item) => (
            <li
              key={item}
              className="inline-flex h-10 items-center rounded-full border px-4 text-lg text-foreground-secondary"
            >
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="container mt-24 px-container md:mt-32">
        <SectionTitle title="Who it is for" subtitle="Practitioners and learners." className="mb-12" />
        <ul className="grid gap-px overflow-hidden rounded-xl border bg-line md:grid-cols-2 xl:grid-cols-3">
          {audience.map((person) => (
            <li key={person.title} className="bg-background p-6 md:p-8">
              <h3 className="text-2xl font-semibold">{person.title}</h3>
              <p className="mt-2 text-lg text-foreground-secondary">{person.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container mt-24 grid gap-6 px-container md:mt-32 lg:grid-cols-3">
        {doors.map((door) => (
          <div key={door.title} className="flex flex-col justify-between gap-10 rounded-xl border bg-background-panel p-8">
            <div>
              <h2 className="text-3xl font-semibold">{door.title}</h2>
              <p className="mt-2 text-lg text-foreground-secondary">{door.body}</p>
            </div>
            <Link href={door.href} className={cn(buttonClass('secondary'), 'w-fit', focus)}>
              {door.cta}
            </Link>
          </div>
        ))}
      </section>
    </SiteFrame>
  )
}
