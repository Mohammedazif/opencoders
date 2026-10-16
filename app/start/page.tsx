import Link from 'next/link'
import { SiteFrame } from '@/components/site-frame'
import { letters } from '@/lib/nav'
import { approaches, pageMeta } from '@/lib/site'
import { contactEmail } from '@/lib/url'

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

export const metadata = pageMeta(
  'Start',
  'How a person, a business, and a company approach OpenCoders: community, content and marketing, development, or all three.',
  '/start'
)

export default function Page() {
  return (
    <SiteFrame current="/start">
      <article className="mx-auto max-w-5xl px-5 py-16 md:py-24">
        <h1 className="text-4xl text-white md:text-6xl">Start</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
          Content, marketing, development, or the three together.
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {letters.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`inline-block border border-white/15 px-4 py-2 text-sm hover:border-white/40 ${focus}`}
                style={{ color: item.color }}
              >
                {item.letter} {item.name}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="#all"
              className={`inline-block border border-white/15 px-4 py-2 text-sm text-white hover:border-white/40 ${focus}`}
            >
              All three
            </a>
          </li>
        </ul>
        <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2">
          {approaches.map((item) => (
            <section key={item.id} id={item.id} className="bg-black p-6 scroll-mt-6">
              <h2 className="text-xl text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-400">{item.body}</p>
              <p className="mt-5 flex flex-wrap gap-4 text-sm">
                <Link href={item.href} className={`text-white ${focus}`}>
                  {item.cta}
                </Link>
                {'secondaryHref' in item ? (
                  <Link href={item.secondaryHref} className={`text-white ${focus}`}>
                    {item.secondaryCta}
                  </Link>
                ) : null}
              </p>
            </section>
          ))}
        </div>
        {contactEmail ? (
          <p className="mt-10 text-sm text-neutral-300">
            <a href={`mailto:${contactEmail}`} className={`text-white ${focus}`}>
              {contactEmail}
            </a>
          </p>
        ) : null}
      </article>
    </SiteFrame>
  )
}
