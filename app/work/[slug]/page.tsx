import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteFrame } from '@/components/site-frame'
import { letters } from '@/lib/nav'
import { pageMeta, work } from '@/lib/site'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return work.map((piece) => ({ slug: piece.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const piece = work.find((item) => item.slug === slug)
  if (!piece) return {}
  return pageMeta(piece.title, piece.summary, `/work/${piece.slug}`)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const piece = work.find((item) => item.slug === slug)
  if (!piece) notFound()

  return (
    <SiteFrame current="/work">
      <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">
          <Link href="/work" className="hover:text-white">
            Work
          </Link>
        </p>
        <h1 className="mt-4 text-4xl text-white md:text-5xl">{piece.title}</h1>
        <p className="mt-3 text-sm text-neutral-500">{piece.field}</p>
        <ul className="mt-6 flex gap-3">
          {piece.letters.map((mark) => {
            const letter = letters.find((item) => item.letter === mark)
            if (!letter) return null
            return (
              <li key={mark}>
                <Link
                  href={letter.href}
                  className="font-mono text-xs uppercase tracking-[0.16em]"
                  style={{ color: letter.color }}
                >
                  {letter.letter} {letter.name}
                </Link>
              </li>
            )
          })}
        </ul>
        <p className="mt-8 text-lg leading-8 text-neutral-200">{piece.summary}</p>
        <dl className="mt-10 grid gap-6">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">Before</dt>
            <dd className="mt-2 text-sm leading-6 text-neutral-300">{piece.before}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">Made</dt>
            <dd className="mt-2 text-sm leading-6 text-neutral-300">{piece.made}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">Changed</dt>
            <dd className="mt-2 text-sm leading-6 text-neutral-300">{piece.changed}</dd>
          </div>
        </dl>
      </article>
    </SiteFrame>
  )
}
