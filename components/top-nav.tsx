'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { buttonClass, focus } from '@/components/kit'
import { Logo } from '@/components/logo'
import { footerColumns } from '@/lib/footer'
import { cta, primaryNav } from '@/lib/nav'
import { cn } from '@/lib/utils'

function useScrollStatus(threshold = 120) {
  const [state, setState] = useState({ pastZero: false, pastThreshold: false, down: false })
  const last = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setState({ pastZero: y > 0, pastThreshold: y > threshold, down: y > last.current })
      last.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return state
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const dark = mounted && resolvedTheme === 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className={buttonClass('secondary', 'w-10 px-0')}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <svg aria-hidden viewBox="0 0 20 20" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
        {dark ? (
          <>
            <circle cx="10" cy="10" r="3.5" />
            <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4" strokeLinecap="round" />
          </>
        ) : (
          <path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  )
}

export function TopNav() {
  const pathname = usePathname()
  const { pastZero, pastThreshold, down } = useScrollStatus()
  const [panel, setPanel] = useState(false)

  useEffect(() => setPanel(false), [pathname])

  useEffect(() => {
    if (!panel) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPanel(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [panel])

  const hidden = pastThreshold && down && !panel

  return (
    <div className="mb-px h-[--topnav-height]">
      <header
        className={cn(
          'fixed z-30 w-full border-b bg-background/95 backdrop-blur-md transition-[transform,border-color] duration-300 ease-motion',
          pastZero ? 'border-b-line' : 'border-b-transparent',
          hidden ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <div className="container flex h-[--topnav-height] items-center justify-between px-container">
          <Link href="/" aria-label="OpenCoders home" className={cn('rounded-md', focus)}>
            <Logo />
          </Link>

          <div className="flex items-center gap-8">
            <nav aria-label="Primary" className="hidden items-center gap-6 text-base font-medium lg:flex">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  className={cn(
                    'rounded-sm transition-colors hover:text-foreground',
                    isActive(pathname, item.href) ? 'text-foreground' : 'text-foreground-secondary',
                    focus
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Link href={cta.href} className={buttonClass('primary', 'hidden min-[400px]:inline-flex')}>
                {cta.label}
              </Link>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={panel}
                onClick={() => setPanel(true)}
                className={buttonClass('secondary', 'w-10 px-0')}
              >
                <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
                  <circle cx="4" cy="10" r="1.6" />
                  <circle cx="10" cy="10" r="1.6" />
                  <circle cx="16" cy="10" r="1.6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        aria-hidden
        onClick={() => setPanel(false)}
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity duration-200',
          panel ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />
      <aside
        aria-label="Menu"
        aria-hidden={!panel}
        inert={!panel || undefined}
        className={cn(
          'fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto bg-background py-4 pl-6 pr-container transition-transform duration-300 ease-motion',
          panel ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex w-full items-center justify-between">
          <Logo symbolOnly />
          <div className="flex gap-3">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setPanel(false)}
              className={buttonClass('secondary', 'w-10 px-0')}
            >
              <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1">
          {footerColumns.map((column) => (
            <div key={column.title} className="mt-8">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-foreground-secondary">
                {column.title}
              </p>
              <ul className="text-lg font-medium">
                {column.links.map((link) => (
                  <li key={link.href} className="mb-1">
                    <Link
                      href={link.href}
                      className={cn(
                        'rounded-sm hover:text-foreground-secondary',
                        isActive(pathname, link.href) && 'underline underline-offset-4',
                        focus
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link href={cta.href} className={buttonClass('primary', 'mt-10 w-full')}>
          {cta.label}
        </Link>
      </aside>
    </div>
  )
}
