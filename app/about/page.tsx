import Link from 'next/link'
import { FactList, PageHero, SectionTitle } from '@/components/blocks'
import { focus } from '@/components/kit'
import { LetterBadge } from '@/components/practice-view'
import { SiteFrame } from '@/components/site-frame'
import { letters } from '@/lib/nav'
import { aboutParagraph, facts, pageMeta } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata = pageMeta(
  'About',
  'OpenCoders makes products for AEC teams, with disciplines in content, marketing, and development.',
  '/about'
)

const principles = [
  {
    title: 'One contact',
    body: 'You talk to one person, even when a project needs content, marketing, and development.',
  },
  {
    title: 'Remote by default',
    body: 'Our team works remotely and serves clients in any location.',
  },
  {
    title: 'Focused on AEC',
    body: 'We know BIM, Revit, and IFC, and we build products for this industry.',
  },
  {
    title: 'Community',
    body: 'A community of professionals and learners who compare work and share practice.',
  },
]

export default function Page() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="About"
        title={
          <>
            Software for AEC.{' '}
            <span className="text-foreground-secondary">Disciplines for the rest of the work.</span>
          </>
        }
        lede={aboutParagraph}
      />

      <section className="container mt-16 grid gap-6 px-container md:mt-24 md:grid-cols-3">
        {letters.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn('group flex flex-col gap-16 rounded-xl border p-8 transition-colors hover:bg-background-offset', focus)}
          >
            <LetterBadge letter={item} className="h-12 w-12 text-xl" />
            <span>
              <span className="block text-3xl font-semibold">{item.name}</span>
              <span className="mt-1 block font-mono text-sm text-foreground-secondary">{item.beat}</span>
            </span>
          </Link>
        ))}
      </section>

      <section className="container mt-24 px-container md:mt-32">
        <SectionTitle title="How we work" subtitle="What you can expect." className="mb-12" />
        <ul className="grid gap-px overflow-hidden rounded-xl border bg-line md:grid-cols-2">
          {principles.map((item) => (
            <li key={item.title} className="bg-background p-6 md:p-8">
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-lg text-foreground-secondary">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container mt-24 px-container md:mt-32">
        <SectionTitle title="At a glance" subtitle="Company details." className="mb-12" />
        <FactList items={facts} />
      </section>
    </SiteFrame>
  )
}
