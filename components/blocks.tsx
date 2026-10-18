import Link from 'next/link'
import type { ReactNode } from 'react'
import { Arrow, Eyebrow, focus } from '@/components/kit'
import type { Group, Question } from '@/lib/site'
import { cn } from '@/lib/utils'

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  lede?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="container px-container pt-10 md:pt-14 lg:pt-20">
      {eyebrow ? <Eyebrow className="flex items-center gap-2">{eyebrow}</Eyebrow> : null}
      <h1 className="mt-4 max-w-5xl text-balance text-7xl font-semibold">{title}</h1>
      {lede ? (
        <p className="mt-8 max-w-3xl text-pretty text-2xl text-foreground-secondary">{lede}</p>
      ) : null}
      {children}
    </header>
  )
}

export function SectionTitle({
  title,
  subtitle,
  body,
  className,
}: {
  title: ReactNode
  subtitle?: ReactNode
  body?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <h2 className="text-5xl font-medium text-foreground-secondary">{title}</h2>
      {subtitle ? <p className="text-5xl font-medium">{subtitle}</p> : null}
      {body ? <p className="mt-3 text-2xl text-foreground-secondary">{body}</p> : null}
    </div>
  )
}

export function GroupGrid({ groups }: { groups: Group[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-xl border bg-line md:grid-cols-2 xl:grid-cols-3">
      {groups.map((group, i) => {
        const body = (
          <>
            <span className="font-mono text-sm text-foreground-secondary">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="mt-10">
              <h3 className="flex items-center gap-2 text-2xl font-semibold">
                {group.title}
                {group.href ? <Arrow className="h-5 w-5" /> : null}
              </h3>
              <p className="mt-2 text-lg text-foreground-secondary">{group.body}</p>
            </div>
          </>
        )
        return (
          <li key={group.title} className="flex bg-background">
            {group.href ? (
              <Link
                href={group.href}
                className={cn('group flex w-full flex-col p-6 transition-colors hover:bg-background-offset md:p-8', focus)}
              >
                {body}
              </Link>
            ) : (
              <div className="flex w-full flex-col p-6 md:p-8">{body}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function Questions({ items }: { items: Question[] }) {
  return (
    <div className="border-b">
      {items.map((item) => (
        <details key={item.q} className="group border-t">
          <summary
            className={cn(
              'cursor-pointer list-none rounded-sm py-6 text-2xl font-medium [&::-webkit-details-marker]:hidden',
              focus
            )}
          >
            <span className="flex items-start justify-between gap-6">
              <span>{item.q}</span>
              <span
                aria-hidden
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border text-lg text-foreground-secondary transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </span>
          </summary>
          <p className="max-w-3xl pb-8 text-xl text-foreground-secondary">{item.a}</p>
        </details>
      ))}
    </div>
  )
}

export function FactList({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <dl className="border-y">
      {items.map(([term, detail]) => (
        <div
          key={term}
          className="grid gap-2 border-b py-5 last:border-b-0 sm:grid-cols-[16rem_1fr] sm:gap-8"
        >
          <dt className="text-xs font-medium uppercase tracking-wider text-foreground-secondary sm:pt-1.5">
            {term}
          </dt>
          <dd className="text-xl">{detail}</dd>
        </div>
      ))}
    </dl>
  )
}
