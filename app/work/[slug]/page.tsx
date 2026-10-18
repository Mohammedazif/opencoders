import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FactList, PageHero } from '@/components/blocks'
import { LetterTag } from '@/components/kit'
import { SiteFrame } from '@/components/site-frame'
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
    <SiteFrame>
      <article>
        <PageHero eyebrow={piece.field} title={piece.title} lede={piece.summary}>
          <div className="mt-8 flex flex-wrap gap-2">
            {piece.letters.map((mark) => (
              <LetterTag key={mark} mark={mark} />
            ))}
          </div>
        </PageHero>
        <section className="container mt-16 px-container md:mt-24">
          <FactList
            items={[
              ['Before', piece.before],
              ['What we made', piece.made],
              ['What changed', piece.changed],
            ]}
          />
        </section>
      </article>
    </SiteFrame>
  )
}
