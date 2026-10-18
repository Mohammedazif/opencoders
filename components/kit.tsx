import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { letters, type LetterMark } from '@/lib/nav'
import type { Product } from '@/lib/products'
import { cn } from '@/lib/utils'

export const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const buttonBase =
  'inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-base font-medium transition-colors'

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-foreground text-background hover:bg-foreground/85',
  secondary: 'border bg-background text-foreground hover:bg-background-offset',
  ghost: 'text-foreground hover:bg-background-offset',
}

export function buttonClass(variant: ButtonVariant = 'primary', className?: string) {
  return cn(buttonBase, buttonVariants[variant], focus, className)
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cn('h-4 w-4 transition-transform group-hover:translate-x-0.5', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  )
}

export function ButtonLink({
  href,
  variant = 'primary',
  arrow,
  className,
  children,
  ...rest
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; arrow?: boolean }) {
  return (
    <Link href={href} className={cn('group', buttonClass(variant, className))} {...rest}>
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'text-xs font-medium uppercase tracking-wider text-foreground-secondary',
        className
      )}
    >
      {children}
    </p>
  )
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-sm text-foreground-secondary',
        className
      )}
    >
      {children}
    </span>
  )
}

export function LetterDot({ mark, className }: { mark: LetterMark; className?: string }) {
  const letter = letters.find((item) => item.letter === mark)!
  return <span aria-hidden className={cn('inline-block h-2 w-2 rounded-full', letter.bg, className)} />
}

export function LetterTag({ mark, href = true }: { mark: LetterMark; href?: boolean }) {
  const letter = letters.find((item) => item.letter === mark)!
  const inner = (
    <>
      <LetterDot mark={mark} />
      {letter.name}
    </>
  )
  if (!href) return <Tag>{inner}</Tag>
  return (
    <Link href={letter.href} className={cn('rounded-md hover:text-foreground', focus)}>
      <Tag className="hover:bg-background-offset">{inner}</Tag>
    </Link>
  )
}

/** Big two-tone heading in the style of a title over a subtitle. */
export function SplitHeading({
  title,
  subtitle,
  as: As = 'h2',
  className,
}: {
  title: ReactNode
  subtitle: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  return (
    <As className={cn('text-5xl font-medium', className)}>
      <span className="block text-foreground-secondary">{title}</span>
      <span className="block">{subtitle}</span>
    </As>
  )
}

/** Generated cover art for a product, so the site needs no image files. */
export function ProductCover({
  product,
  className,
  size = 'lg',
}: {
  product: Product
  className?: string
  size?: 'sm' | 'lg'
}) {
  const [from, to] = product.tint
  const id = `grid-${product.slug}-${size}`
  return (
    <div
      aria-hidden
      className={cn('relative overflow-hidden rounded-lg', className)}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-25" preserveAspectRatio="none">
        <defs>
          <pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="white" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      <div
        className="absolute -bottom-1/4 -right-[10%] aspect-square w-3/4 rounded-full opacity-30 blur-2xl"
        style={{ background: to }}
      />
      {size === 'lg' ? (
        <>
          <div className="absolute left-[8%] top-[10%] flex items-center gap-2 text-white/90">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-white/15 text-sm font-semibold backdrop-blur">
              {product.glyph}
            </span>
            <span className="text-lg font-medium">{product.name}</span>
          </div>
          <div className="absolute inset-x-[8%] bottom-[10%] grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="rounded bg-white/20 backdrop-blur"
                style={{ height: `${28 + ((i * 37) % 64)}px` }}
              />
            ))}
          </div>
        </>
      ) : (
        <span className="absolute inset-0 grid place-items-center text-xl font-semibold text-white/95">
          {product.glyph}
        </span>
      )}
    </div>
  )
}

export function StatusBadge({ status }: { status: Product['status'] }) {
  return (
    <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-background-offset px-2.5 text-xs font-medium text-foreground-secondary">
      <span
        aria-hidden
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          status === 'Live' && 'bg-letter-d',
          status === 'Beta' && 'bg-letter-c',
          status === 'In development' && 'bg-letter-m'
        )}
      />
      {status}
    </span>
  )
}
