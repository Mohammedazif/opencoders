import Link from 'next/link'
import { SiteFrame } from '@/components/site-frame'
import { summary } from '@/lib/nav'
import { audience, pageMeta } from '@/lib/site'

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

export const metadata = pageMeta(
  'Community',
  'The OpenCoders community is for professionals, learners, developers, designers, marketers, AEC people, contributors, and partners.',
  '/community'
)

export default function Page() {
  return (
    <SiteFrame current="/community">
      <article className="mx-auto max-w-5xl px-5 py-16 md:py-24">
        <h1 className="text-4xl text-white md:text-6xl">Community</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">{summary}</p>
        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-400">
          The community is the public circle around that work: knowledge sharing, technical
          discussion, learning, introductions, workshops, events, collaboration, open-source
          participation, and industry conversations.
        </p>
        <ul className="mt-12 grid border-y border-white/10 sm:grid-cols-2">
          {audience.map((person) => (
            <li key={person.title} className="border-b border-white/10 p-6 sm:[&:nth-child(odd)]:border-r">
              <h2 className="text-white">{person.title}</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-400">{person.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-6 text-sm leading-6 text-neutral-300 sm:grid-cols-3">
          <p>
            Take part.{' '}
            <Link href="/start#people" className={`text-white ${focus}`}>
              Say you are here as a person
            </Link>
            .
          </p>
          <p>
            Hire the company.{' '}
            <Link href="/start#customers" className={`text-white ${focus}`}>
              Start from the customer
            </Link>
            .
          </p>
          <p>
            Work on delivery.{' '}
            <Link href="/development/teams" className={`text-white ${focus}`}>
              Engineering teams
            </Link>
            .
          </p>
        </div>
      </article>
    </SiteFrame>
  )
}
