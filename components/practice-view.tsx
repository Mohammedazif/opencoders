import Link from 'next/link'
import { GroupGrid, PageHero, Questions, SectionTitle } from '@/components/blocks'
import { ProductEntry } from '@/components/home/sections'
import { buttonClass, focus } from '@/components/kit'
import { SiteFrame } from '@/components/site-frame'
import { products } from '@/lib/products'
import type { Practice } from '@/lib/site'
import { cn } from '@/lib/utils'

export function LetterBadge({ letter, className }: { letter: Practice['letter']; className?: string }) {
  return (
    <span
      className={cn(
        'grid h-8 w-8 place-items-center rounded-lg text-base font-semibold normal-case tracking-normal text-black',
        letter.bg,
        className
      )}
    >
      {letter.letter}
    </span>
  )
}

export function PracticeView({ practice }: { practice: Practice }) {
  const { letter } = practice
  return (
    <SiteFrame defaultInterest={letter.name}>
      <article>
        <PageHero
          eyebrow={
            <>
              <LetterBadge letter={letter} />
              {letter.beat}
            </>
          }
          title={
            <>
              {letter.name}.{' '}
              <span className="text-foreground-secondary">{practice.promise}</span>
            </>
          }
          lede={practice.description}
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className={buttonClass('primary')}>
              Start a {letter.name.toLowerCase()} project
            </a>
            <Link href="/services" className={buttonClass('secondary')}>
              All disciplines
            </Link>
          </div>
        </PageHero>

        <section className="container mt-24 px-container md:mt-32">
          <SectionTitle
            title={practice.id === 'development' ? 'Areas' : 'What we offer'}
            subtitle={
              practice.id === 'development'
                ? 'Choose an area to see the details.'
                : `Everything under ${letter.name}.`
            }
            className="mb-12"
          />
          <GroupGrid groups={practice.groups} />
        </section>

        {practice.id === 'development' ? (
          <section className="mt-24 md:mt-32">
            <div className="container mb-12 px-container">
              <SectionTitle title="Our products" subtitle="Software we build for AEC teams." />
            </div>
            {products.map((product) => (
              <ProductEntry key={product.slug} product={product} />
            ))}
          </section>
        ) : null}

        <section className="container mt-24 grid gap-12 px-container md:mt-32 lg:grid-cols-3">
          <SectionTitle title="Questions" subtitle="Common questions." />
          <div className="lg:col-span-2">
            <Questions items={practice.questions} />
          </div>
        </section>

        <section className="container mt-24 px-container md:mt-32">
          <p className="text-xs font-medium uppercase tracking-wider text-foreground-secondary">
            Other disciplines
          </p>
          <ul className="mt-4 grid gap-6 md:grid-cols-2">
            {practice.continues.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center justify-between gap-6 rounded-xl border p-6 transition-colors hover:bg-background-offset md:p-8',
                    focus
                  )}
                >
                  <span className="flex items-center gap-4">
                    <LetterBadge letter={item} className="h-12 w-12 text-xl" />
                    <span>
                      <span className="block text-3xl font-semibold">{item.name}</span>
                      <span className="block font-mono text-sm text-foreground-secondary">{item.beat}</span>
                    </span>
                  </span>
                  <span aria-hidden className="text-2xl transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </SiteFrame>
  )
}
