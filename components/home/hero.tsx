'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ProductCover, focus } from '@/components/kit'
import { ParticleReel } from '@/components/particle-reel'
import { Slogan } from '@/components/slogan'
import { products } from '@/lib/products'
import { cn } from '@/lib/utils'

function Highlights() {
  const hoverRef = useRef<HTMLDivElement>(null)

  const moveTo = (el: HTMLElement) => {
    const hover = hoverRef.current
    if (!hover) return
    hover.style.opacity = '1'
    hover.style.transform = 'scale(1)'
    hover.style.left = `${el.offsetLeft}px`
    hover.style.top = `${el.offsetTop}px`
    hover.style.width = `${el.offsetWidth}px`
    hover.style.height = `${el.offsetHeight}px`
  }
  const hide = () => {
    const hover = hoverRef.current
    if (!hover) return
    hover.style.opacity = '0'
    hover.style.transform = 'scale(0.9)'
  }

  return (
    <div
      className="relative -mx-2 grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 xl:grid-cols-4"
      onMouseLeave={hide}
    >
      <div
        ref={hoverRef}
        aria-hidden
        className="absolute rounded-xl bg-background-offset opacity-0 transition-all duration-300 ease-smooth"
      />
      {products.map((product) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          data-drawer={product.slug}
          onMouseEnter={(e) => moveTo(e.currentTarget)}
          onFocus={(e) => moveTo(e.currentTarget)}
          onBlur={hide}
          className={cn('relative flex gap-4 rounded-xl p-2', focus)}
        >
          <ProductCover product={product} size="sm" className="h-[72px] w-24 shrink-0 rounded-md" />
          <div className="flex flex-col py-1">
            <p className="line-clamp-2 max-w-sm flex-1 text-lg/tight font-medium">
              {product.name} <span className="text-foreground-secondary">{product.tagline}</span>
            </p>
            <p className="text-sm text-foreground-secondary">{product.category}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export function HomeHero() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (window.scrollY > 400) setShow(true)
  }, [])

  return (
    <>
      <div className="container px-container">
        <Slogan
          as="h1"
          shuffle
          onEnd={() => setShow(true)}
          className="mt-10 text-7xl font-semibold md:mt-14 lg:mt-20"
        />
      </div>

      <div
        className={cn(
          'transition-all duration-700 ease-smooth motion-reduce:transition-none',
          show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        )}
      >
        <div className="container px-container">
          <section aria-label="Products" className="mb-8 mt-10 md:mt-14 lg:mt-20">
            <Highlights />
          </section>
          <ParticleReel />
        </div>
      </div>
    </>
  )
}
