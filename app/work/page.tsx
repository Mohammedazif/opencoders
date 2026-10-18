import Link from 'next/link'
import { PageHero } from '@/components/blocks'
import { ProductEntry } from '@/components/home/sections'
import { LetterTag, focus } from '@/components/kit'
import { SiteFrame } from '@/components/site-frame'
import { products } from '@/lib/products'
import { pageMeta, work } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata = pageMeta(
  'Work',
  'Projects and products by OpenCoders.',
  '/work'
)

export default function Page() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Work"
        title={
          <>
            Our work.{' '}
            <span className="text-foreground-secondary">Projects and products.</span>
          </>
        }
        lede="Client case studies will be published here soon."
      />

      {work.length === 0 ? (
        <section className="mt-16 md:mt-24">
          <div className="container mb-10 px-container">
            <p className="max-w-2xl text-xl text-foreground-secondary">
              Until then, here are the products we build.
            </p>
          </div>
          {products.map((product) => (
            <ProductEntry key={product.slug} product={product} as="h2" />
          ))}
        </section>
      ) : (
        <ul className="container mt-16 grid gap-6 px-container md:mt-24 md:grid-cols-2">
          {work.map((piece) => (
            <li key={piece.slug}>
              <Link
                href={`/work/${piece.slug}`}
                className={cn('flex h-full flex-col justify-between gap-10 rounded-xl border p-8 transition-colors hover:bg-background-offset', focus)}
              >
                <div>
                  <p className="text-sm text-foreground-secondary">{piece.field}</p>
                  <h2 className="mt-2 text-3xl font-semibold">{piece.title}</h2>
                  <p className="mt-3 text-lg text-foreground-secondary">{piece.summary}</p>
                </div>
                <span className="flex flex-wrap gap-2">
                  {piece.letters.map((mark) => (
                    <LetterTag key={mark} mark={mark} href={false} />
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </SiteFrame>
  )
}
