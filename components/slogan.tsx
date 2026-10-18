'use client'

import { useEffect, useState } from 'react'
import { slogan, sloganAlternates } from '@/lib/nav'
import { cn } from '@/lib/utils'

const TYPE_MS = 80
const DELETE_MS = 45
const HOLD_MS = 1600

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Words appear one by one, two per line; the last word is muted.
 * With `shuffle`, each slot then takes a turn deleting its word and typing
 * the next alternative, so the order of the slogan never changes.
 */
export function Slogan({
  as: As = 'p',
  animate = true,
  shuffle = false,
  className,
  onEnd,
}: {
  as?: 'h1' | 'p'
  animate?: boolean
  shuffle?: boolean
  className?: string
  onEnd?: () => void
}) {
  const [shown, setShown] = useState(animate ? 0 : slogan.length)
  const [words, setWords] = useState<string[]>(() => [...slogan])
  const [typing, setTyping] = useState(-1)
  const done = shown >= slogan.length

  useEffect(() => {
    if (done) {
      onEnd?.()
      return
    }
    const timer = setTimeout(() => setShown((n) => n + 1), 200)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown])

  useEffect(() => {
    if (!shuffle || !done) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    const next = sloganAlternates.map(() => 0)
    const setSlot = (slot: number, text: string) =>
      setWords((current) => current.map((word, i) => (i === slot ? text : word)))

    const run = async () => {
      let slot = 0
      await wait(HOLD_MS)
      while (!cancelled) {
        if (document.hidden) {
          await wait(500)
          continue
        }
        const options = sloganAlternates[slot]
        const from = options[next[slot]]
        next[slot] = (next[slot] + 1) % options.length
        const to = options[next[slot]]

        setTyping(slot)
        for (let n = from.length - 1; n >= 0 && !cancelled; n--) {
          setSlot(slot, from.slice(0, n))
          await wait(DELETE_MS)
        }
        await wait(150)
        for (let n = 1; n <= to.length && !cancelled; n++) {
          setSlot(slot, to.slice(0, n))
          await wait(TYPE_MS)
        }
        setTyping(-1)

        slot = (slot + 1) % sloganAlternates.length
        await wait(HOLD_MS)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [shuffle, done])

  return (
    <As className={cn('text-3xl font-medium', className)} aria-label={slogan.join(' ')}>
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          <span
            className={cn(
              'mr-[0.25em] inline-block whitespace-nowrap transition-all duration-500 ease-smooth motion-reduce:transition-none',
              i === slogan.length - 1 && 'text-foreground-secondary'
            )}
            style={
              i < shown
                ? { opacity: 1, transform: 'translateY(0)' }
                : { opacity: 0, transform: 'translateY(0.4em)' }
            }
          >
            {/* Zero-width space keeps the line height while a word is fully deleted. */}
            {word || '​'}
            {typing === i ? (
              <span className="ml-[0.04em] inline-block h-[0.8em] w-[0.06em] translate-y-[0.08em] animate-pulse bg-current align-baseline" />
            ) : null}
          </span>
          {i % 2 === 1 ? <br /> : null}
        </span>
      ))}
    </As>
  )
}
