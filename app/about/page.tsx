import Link from 'next/link'
import { SiteFrame } from '@/components/site-frame'
import { letters } from '@/lib/nav'
import { aboutParagraph, facts, pageMeta } from '@/lib/site'

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

export const metadata = pageMeta(
  'About',
  'OpenCoders is one company for content, marketing, and development, working remote-first with a community around the work.',
  '/about'
)

export default function Page() {
  return (
    <SiteFrame current="/about">
      <article className="mx-auto max-w-5xl px-5 py-16 md:py-24">
        <h1 className="text-4xl text-white md:text-6xl">About</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-300">{aboutParagraph}</p>
        <p className="mt-6 max-w-3xl text-base leading-7 text-neutral-400">
          A client who needs more than one letter still has one conversation. The work is split
          across Content, Marketing, and Development inside the company.
        </p>
        <dl className="mt-12 border-y border-white/10">
          {facts.map(([term, detail]) => (
            <div
              key={term}
              className="grid gap-2 border-b border-white/10 py-4 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-8"
            >
              <dt className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">{term}</dt>
              <dd className="text-sm leading-6 text-neutral-200">{detail}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {letters.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={focus} style={{ color: item.color }}>
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/community" className={`text-neutral-300 ${focus}`}>
              Community
            </Link>
          </li>
        </ul>
      </article>
    </SiteFrame>
  )
}
