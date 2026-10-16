import Link from 'next/link'
import { GroupGrid, Questions } from '@/components/blocks'
import { SiteFrame } from '@/components/site-frame'
import { letters } from '@/lib/nav'
import { lanes, type Lane } from '@/lib/site'

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

const development = letters[2]

export function LaneView({ lane }: { lane: Lane }) {
  const others = lanes.filter((item) => item.slug !== lane.slug)
  return (
    <SiteFrame current={lane.href}>
      <article>
        <header className="mx-auto max-w-5xl px-5 pb-12 pt-16 md:pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.22em]" style={{ color: development.color }}>
            <Link href={development.href} className={focus}>
              Development
            </Link>
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl text-white md:text-6xl">{lane.title}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-neutral-200">{lane.lede}</p>
        </header>
        <div className="mx-auto max-w-5xl px-5">
          <GroupGrid groups={lane.groups} />
        </div>
        <section className="mx-auto max-w-5xl px-5 py-16">
          <h2 className="font-mono text-sm uppercase tracking-[0.18em] text-neutral-500">
            Questions
          </h2>
          <div className="mt-6">
            <Questions items={lane.questions} />
          </div>
        </section>
        <footer className="mx-auto max-w-5xl px-5 pb-20">
          <h2 className="font-mono text-sm uppercase tracking-[0.18em] text-neutral-500">
            Other lanes
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {others.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`text-neutral-300 hover:text-white ${focus}`}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={lane.slug === 'teams' ? '/start#all' : '/start#build'}
            className={`mt-8 inline-block border border-white/15 px-4 py-2 text-sm text-white hover:border-white/40 ${focus}`}
          >
            Work with us
          </Link>
        </footer>
      </article>
    </SiteFrame>
  )
}
