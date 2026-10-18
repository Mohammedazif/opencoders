'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { focus } from '@/components/kit'
import { ProductDetail } from '@/components/product-detail'
import { productBySlug } from '@/lib/products'
import { cn } from '@/lib/utils'

const PARAM = 'product'

function urlWith(slug: string | null) {
  const url = new URL(window.location.href)
  if (slug) url.searchParams.set(PARAM, slug)
  else url.searchParams.delete(PARAM)
  return `${url.pathname}${url.search}${url.hash}`
}

/**
 * Side panel for products, like Significa's project drawer.
 * Any link with `data-drawer="<slug>"` opens it instead of navigating.
 * The slug lives in `?product=` so the back button closes it.
 */
export function ProductDrawer() {
  const [slug, setSlug] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pushed = useRef(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const show = useCallback((next: string | null) => {
    if (next && productBySlug(next)) {
      setSlug(next)
      requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
      window.setTimeout(() => setSlug(null), 250)
    }
  }, [])

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false
      history.back()
    } else {
      history.replaceState(history.state, '', urlWith(null))
      show(null)
    }
  }, [show])

  useEffect(() => {
    show(new URL(window.location.href).searchParams.get(PARAM))

    const onPopState = () => {
      pushed.current = false
      show(new URL(window.location.href).searchParams.get(PARAM))
    }
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[data-drawer]')
      const next = link?.dataset.drawer
      if (!next || !productBySlug(next)) return
      event.preventDefault()
      const open = new URL(window.location.href).searchParams.has(PARAM)
      if (open) {
        history.replaceState(history.state, '', urlWith(next))
        panelRef.current?.scrollTo({ top: 0 })
      } else {
        history.pushState(history.state, '', urlWith(next))
        pushed.current = true
      }
      show(next)
    }

    window.addEventListener('popstate', onPopState)
    document.addEventListener('click', onClick, true)
    return () => {
      window.removeEventListener('popstate', onPopState)
      document.removeEventListener('click', onClick, true)
    }
  }, [show])

  useEffect(() => {
    if (!slug) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close()
    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [slug, close])

  const product = slug ? productBySlug(slug) : undefined
  if (!product) return null

  return (
    <>
      <div
        aria-hidden
        onClick={close}
        className={cn(
          'fixed inset-0 z-[60] bg-black/50 transition-opacity duration-200',
          visible ? 'opacity-100' : 'opacity-0'
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onScroll={(event) => setScrolled(event.currentTarget.scrollTop > 0)}
        className={cn(
          'fixed inset-2 z-[60] overflow-y-auto overscroll-contain rounded-xl bg-background shadow-2xl transition-[transform,opacity] duration-300 ease-smooth md:left-auto md:w-3/4 lg:w-2/3',
          visible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
        )}
      >
        <header
          className={cn(
            'sticky top-0 z-10 flex items-center justify-between border-b bg-background p-2 transition-colors',
            scrolled ? 'border-line' : 'border-transparent'
          )}
        >
          <Link
            href={`/products/${product.slug}`}
            className={cn('inline-flex h-10 items-center gap-2 rounded-lg px-3 font-medium hover:bg-background-offset', focus)}
          >
            <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.5 2.5h4v4M13.5 2.5 9 7M6.5 13.5h-4v-4M2.5 13.5 7 9" />
            </svg>
            Expand
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className={cn('grid h-10 w-10 place-items-center rounded-lg hover:bg-background-offset', focus)}
          >
            <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>
        </header>
        <ProductDetail key={product.slug} product={product} inDrawer />
      </div>
    </>
  )
}
