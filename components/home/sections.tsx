import Link from 'next/link'
import { ButtonLink, Eyebrow, LetterDot, ProductCover, StatusBadge, Tag, focus } from '@/components/kit'
import type { LetterMark } from '@/lib/nav'
import { products, type Product } from '@/lib/products'
import { lanes, practices, type PracticeId } from '@/lib/site'
import { cn } from '@/lib/utils'

const ids: PracticeId[] = ['content', 'marketing', 'development']

/** Three columns, one per letter, with groups listed underneath. */
export function ServicesColumns({ intro = true }: { intro?: boolean }) {
  return (
    <>
      {intro ? (
        <section className="mt-24 md:mt-32">
          <div className="container px-container">
            <div className="max-w-3xl">
              <h2 className="text-5xl font-medium text-foreground-secondary">Disciplines</h2>
              <p className="text-5xl font-medium">Content, marketing, and development.</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mt-12 lg:border-y">
        <div className="container grid grid-cols-1 px-container lg:grid-cols-3">
          {ids.map((id) => {
            const practice = practices[id]
            const { letter } = practice
            const groups = id === 'development' ? lanes.map((l) => ({ title: l.title, body: l.lede, href: l.href })) : practice.groups
            return (
              <div
                key={id}
                className="flex flex-col border-t py-10 last:border-b lg:border-b-0 lg:border-r lg:border-t-0 lg:p-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <Link href={letter.href} className={cn('group w-fit rounded-md', focus)}>
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        'grid h-10 w-10 place-items-center rounded-lg text-lg font-semibold text-black',
                        letter.bg
                      )}
                    >
                      {letter.letter}
                    </span>
                    <span className="text-3xl font-semibold group-hover:underline group-hover:underline-offset-4">
                      {letter.name}
                    </span>
                  </span>
                </Link>
                <p className="mt-4 text-xl text-foreground-secondary">{practice.promise}</p>
                <ul className="mt-4 flex-1">
                  {groups.map((group) => (
                    <li key={group.title} className="mt-6">
                      {'href' in group && group.href ? (
                        <Link href={group.href} className={cn('rounded-sm text-xl font-semibold hover:underline hover:underline-offset-4', focus)}>
                          {group.title}
                        </Link>
                      ) : (
                        <p className="text-xl font-semibold">{group.title}</p>
                      )}
                      <p className="mt-1.5 text-lg text-foreground-secondary">{group.body}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-mono text-sm text-foreground-secondary">{letter.beat}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

/** Homepage disciplines. Six names in each column, in a line, with no row rules. */
export function ServicesBrief() {
  return (
    <section className="container mt-24 px-container md:mt-32">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-medium text-foreground-secondary">Disciplines</h2>
          <p className="text-5xl font-medium">Content, marketing, and development.</p>
        </div>
        <ButtonLink href="/services" variant="secondary" arrow>
          All disciplines
        </ButtonLink>
      </div>
      <div className="grid grid-cols-1 gap-y-14 md:grid-cols-3">
        {ids.map((id) => {
          const practice = practices[id]
          const { letter } = practice
          const items =
            id === 'development'
              ? [
                  ...lanes.map((lane) => ({ title: lane.title, href: lane.href })),
                  { title: 'Revit and CAD plugins', href: '/development/aec-bim' },
                ]
              : practice.groups.map((group) => ({ title: group.title, href: letter.href }))
          return (
            <div key={id} className="md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <Link href={letter.href} className={cn('group flex w-fit items-center gap-3 rounded-md', focus)}>
                <span className={cn('grid h-9 w-9 place-items-center rounded-lg font-semibold text-black', letter.bg)}>
                  {letter.letter}
                </span>
                <h3 className="text-3xl font-semibold group-hover:underline group-hover:underline-offset-4">{letter.name}</h3>
              </Link>
              <p className="mt-4 text-xl text-foreground-secondary">{practice.promise}</p>
              <ul className="mt-6">
                {items.map((item) => (
                  <li key={item.title} className="mt-3 text-xl leading-7">
                    <Link
                      href={item.href}
                      className={cn('rounded-sm hover:text-foreground-secondary hover:underline hover:underline-offset-4', focus)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/** A full-width product row: name and tagline on the left, cover on the right. */
export function ProductEntry({ product, as: As = 'h3' }: { product: Product; as?: 'h2' | 'h3' }) {
  const href = `/products/${product.slug}`
  return (
    <div className="group relative border-b py-12 transition-colors first:border-t hover:bg-foreground-tertiary/10">
      <div className="container px-container lg:flex lg:gap-12">
        <div className="flex flex-1 flex-col items-start justify-between">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <StatusBadge status={product.status} />
              <span className="text-sm text-foreground-secondary">{product.category}</span>
            </div>
            <Link href={href} data-drawer={product.slug} className={cn('rounded-md after:absolute after:inset-0', focus)}>
              <As className="text-5xl font-medium text-foreground-secondary">{product.name}</As>
              <p className="max-w-lg text-5xl font-medium">{product.tagline}</p>
            </Link>
            <p className="mt-6 max-w-lg text-xl text-foreground-secondary">{product.summary}</p>
          </div>
          <span className="mt-8 inline-flex h-10 items-center gap-2 rounded-lg border bg-background px-4 font-medium transition-colors group-hover:bg-background-offset">
            View product
            <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
        <ProductCover product={product} className="pointer-events-none mt-8 aspect-[4/3] flex-1 lg:mt-0" />
      </div>
    </div>
  )
}

export function ProductsList({ heading = true }: { heading?: boolean }) {
  return (
    <section className="mt-24 md:mt-32">
      {heading ? (
        <div className="container mb-12 flex flex-wrap items-end justify-between gap-6 px-container">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-medium text-foreground-secondary">Products</h2>
            <p className="text-5xl font-medium">Software for AEC teams.</p>
          </div>
          <ButtonLink href="/products" variant="secondary" arrow>
            All products
          </ButtonLink>
        </div>
      ) : null}
      {products.map((product) => (
        <ProductEntry key={product.slug} product={product} />
      ))}
    </section>
  )
}

const steps = [
  {
    title: 'Tell us',
    body: 'Send a short message about your project and what you want to achieve.',
  },
  {
    title: 'Plan',
    body: 'We reply with a scope, a timeline, and a price.',
  },
  {
    title: 'Build',
    body: 'We work in short cycles and show you progress as we go.',
  },
  {
    title: 'Launch',
    body: 'We launch, measure the results, and keep supporting you.',
  },
]

export function Steps() {
  return (
    <section className="container mt-24 px-container md:mt-32">
      <div className="max-w-3xl">
        <h2 className="text-5xl font-medium text-foreground-secondary">How we work</h2>
        <p className="text-5xl font-medium">From first message to launch.</p>
      </div>
      <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-line md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-10 bg-background p-6 md:p-8">
            <span className="font-mono text-sm text-foreground-secondary">0{i + 1}</span>
            <div>
              <h3 className="text-2xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-lg text-foreground-secondary">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function CtaCards() {
  const cards: { eyebrow: string; title: string; body: string; href: string; cta: string; marks?: LetterMark[] }[] = [
    {
      eyebrow: 'Engineering teams',
      title: 'Hire remote developers.',
      body: 'Software, BIM, AI, and 3D developers who join your team for one project or longer.',
      href: '/development/teams',
      cta: 'Teams',
      marks: ['D'],
    },
    {
      eyebrow: 'Community',
      title: 'Join the community.',
      body: 'Developers, designers, marketers, learners, and AEC professionals.',
      href: '/community',
      cta: 'Join the community',
    },
  ]
  return (
    <section className="container mt-24 grid gap-6 px-container md:mt-32 lg:grid-cols-2">
      {cards.map((card) => (
        <div key={card.href} className="flex flex-col justify-between gap-10 rounded-xl border bg-background-panel p-8">
          <div>
            <Eyebrow className="flex items-center gap-2">
              {card.marks?.map((m) => <LetterDot key={m} mark={m} />)}
              {card.eyebrow}
            </Eyebrow>
            <h2 className="mt-4 text-4xl font-medium tracking-tight">{card.title}</h2>
            <p className="mt-3 max-w-lg text-xl text-foreground-secondary">{card.body}</p>
          </div>
          <ButtonLink href={card.href} variant="secondary" arrow className="w-fit">
            {card.cta}
          </ButtonLink>
        </div>
      ))}
    </section>
  )
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items]
  return (
    <div className="mt-24 overflow-hidden border-y py-6 md:mt-32" aria-hidden>
      <div className="flex w-max animate-marquee gap-3 motion-reduce:animate-none">
        {row.map((item, i) => (
          <Tag key={`${item}-${i}`} className="h-10 px-4 text-lg">
            {item}
          </Tag>
        ))}
      </div>
    </div>
  )
}

