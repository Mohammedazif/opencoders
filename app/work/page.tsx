import Link from 'next/link'
import { SiteFrame } from '@/components/site-frame'
import { letters } from '@/lib/nav'
import { pageMeta, work } from '@/lib/site'

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

export const metadata = pageMeta(
  'Work',
  'OpenCoders work, tagged with the Content, Marketing, and Development letters that were involved.',
  '/work'
)

export default function Page() {
  return (
    <SiteFrame current="/work">
      <article className="mx-auto max-w-5xl px-5 py-16 md:py-24">
        <h1 className="text-4xl text-white md:text-6xl">Work</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
          Each piece is tagged with the letters that were actually involved. A job that used
          Content and Development shows C and D.
        </p>
        <ul className="mt-8 flex flex-wrap gap-4">
          {letters.map((item) => (
            <li key={item.letter} className="font-mono text-xs uppercase tracking-[0.18em]">
              <Link href={item.href} className={focus} style={{ color: item.color }}>
                {item.letter} {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {work.length === 0 ? (
          <p className="mt-12 max-w-2xl text-sm leading-6 text-neutral-400">
            Named work will be published here. Nothing is listed yet.
          </p>
        ) : (
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {work.map((piece) => (
              <li key={piece.slug}>
                <Link
                  href={`/work/${piece.slug}`}
                  className={`block border border-white/10 p-6 hover:border-white/30 ${focus}`}
                >
                  <h2 className="text-xl text-white">{piece.title}</h2>
                  <p className="mt-2 text-sm text-neutral-500">{piece.field}</p>
                  <p className="mt-4 text-sm leading-6 text-neutral-300">{piece.summary}</p>
                  <p className="mt-4 font-mono text-xs tracking-[0.16em] text-neutral-500">
                    {piece.letters.join(' · ')}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </article>
    </SiteFrame>
  )
}
