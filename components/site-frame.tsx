import Link from 'next/link'
import type { ReactNode } from 'react'
import { letters, oneSentence, siteName, tagline } from '@/lib/nav'
import { contactEmail } from '@/lib/url'

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

const more = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/community', label: 'Community' },
  { href: '/start', label: 'Start' },
]

export function SiteHeader({ current = '' }: { current?: string }) {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4">
        <Link href="/" className={`text-sm text-white ${focus}`}>
          {siteName}
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {letters.map((item) => {
            const active = current === item.href || current.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`${focus} ${active ? 'underline underline-offset-4' : ''}`}
                style={{ color: item.color }}
              >
                {item.name}
              </Link>
            )
          })}
          <Link
            href="/start"
            aria-current={current === '/start' ? 'page' : undefined}
            className={`text-neutral-300 ${focus} ${current === '/start' ? 'underline underline-offset-4' : ''}`}
          >
            Start
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:grid-cols-2">
        <div>
          <p className="text-white">{siteName}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">{oneSentence}</p>
          <p className="mt-4 font-mono text-xs text-neutral-500">{tagline}</p>
        </div>
        <div className="flex flex-col gap-5 sm:items-end">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-300 sm:justify-end">
            {letters.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={focus} style={{ color: item.color }}>
                  {item.beat}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-400 sm:justify-end">
            {more.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`hover:text-white ${focus}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {contactEmail ? (
            <a href={`mailto:${contactEmail}`} className={`text-sm text-white ${focus}`}>
              {contactEmail}
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  )
}

export function SiteFrame({
  current,
  children,
}: {
  current?: string
  children: ReactNode
}) {
  return (
    <>
      <a
        href="#content"
        className={`sr-only bg-white px-3 py-2 text-black focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 ${focus}`}
      >
        Skip to content
      </a>
      <SiteHeader current={current} />
      <main id="content">{children}</main>
      <SiteFooter />
    </>
  )
}
