import Link from 'next/link'
import { SiteFooter } from '@/components/site-frame'
import { letters, oneSentence, summary, tagline } from '@/lib/nav'
import { approaches, work } from '@/lib/site'

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

export function HomeRest() {
  const shown = work.slice(0, 3)
  return (
    <div id="company" className="border-t border-white/10 bg-black">
      <section className="mx-auto max-w-5xl px-5 py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-neutral-500">{tagline}</p>
        <h2 className="mt-4 max-w-3xl text-balance text-3xl text-white md:text-5xl">{summary}</h2>
        <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400">{oneSentence}</p>
      </section>

      <section className="mx-auto grid max-w-5xl border-y border-white/10 md:grid-cols-3">
        {letters.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`border-b border-white/10 p-6 last:border-b-0 hover:bg-white/[0.03] md:border-b-0 md:border-r md:last:border-r-0 ${focus}`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: item.color }}>
              {item.letter}
            </span>
            <h3 className="mt-4 text-2xl text-white">{item.name}</h3>
            <p className="mt-3 font-mono text-xs text-neutral-500">{item.beat}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="font-mono text-sm uppercase tracking-[0.18em] text-neutral-500">Work</h2>
        {shown.length === 0 ? (
          <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-400">
            <Link href="/work" className={`text-white ${focus}`}>
              Work
            </Link>{' '}
            is published when it can be named, marked with the letters involved.
          </p>
        ) : (
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {shown.map((piece) => (
              <li key={piece.slug}>
                <Link href={`/work/${piece.slug}`} className={`block border border-white/10 p-5 hover:border-white/30 ${focus}`}>
                  <p className="text-white">{piece.title}</p>
                  <p className="mt-2 text-sm text-neutral-400">{piece.summary}</p>
                  <p className="mt-4 font-mono text-xs tracking-[0.16em] text-neutral-500">
                    {piece.letters.join(' · ')}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20">
        <h2 className="font-mono text-sm uppercase tracking-[0.18em] text-neutral-500">Community</h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-400">
          Professionals, learners, developers, designers, marketers, and AEC people.{' '}
          <Link href="/community" className={`text-white ${focus}`}>
            Community
          </Link>
          .
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-500">
          {approaches.map((item) => (
            <li key={item.id}>
              <Link href={`/start#${item.id}`} className={`hover:text-neutral-300 ${focus}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <SiteFooter />
    </div>
  )
}
