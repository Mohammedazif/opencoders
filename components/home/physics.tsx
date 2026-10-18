'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export type PhysicsItem = {
  label: string
  kind?: 'pill' | 'card' | 'dot'
  /** CSS colour for dots and card accents */
  color?: string
}

/**
 * Items fall into the box when it scrolls into view and can be dragged and thrown.
 * Without JS (or with reduced motion) they sit as a wrapped list.
 */
export function PhysicsPlayground({ items, className }: { items: PhysicsItem[]; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cleanup: (() => void) | undefined
    let cancelled = false

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const Matter = (await import('matter-js')).default
        if (cancelled) return
        cleanup = run(Matter)
      },
      { threshold: 0.3 }
    )
    io.observe(container)

    function run(Matter: typeof import('matter-js')) {
      const { Engine, Bodies, Composite, Mouse, MouseConstraint, Runner, Body } = Matter
      const el = container!
      const engine = Engine.create({ gravity: { scale: 0.0017 } })
      const w = () => el.clientWidth
      const h = () => el.clientHeight
      const wall = 200

      container!.dataset.live = 'true'

      const bodies = refs.current.map((node, i) => {
        if (!node) return null
        const bw = node.offsetWidth
        const bh = node.offsetHeight
        const body = Bodies.rectangle(
          bw / 2 + Math.random() * Math.max(1, w() - bw),
          -bh - i * 40 - Math.random() * 200,
          bw,
          bh,
          {
            friction: 0.6,
            restitution: 0.25,
            chamfer: { radius: Math.min(bh / 2, 16) },
            angle: (Math.random() - 0.5) * 0.6,
          }
        )
        return { node, body, bw, bh }
      })

      const makeBounds = () => [
        Bodies.rectangle(w() / 2, h() + wall / 2, w() * 3, wall, { isStatic: true }),
        Bodies.rectangle(-wall / 2, h() / 2 - 2000, wall, h() + 4000, { isStatic: true }),
        Bodies.rectangle(w() + wall / 2, h() / 2 - 2000, wall, h() + 4000, { isStatic: true }),
      ]
      let bounds = makeBounds()

      const mouse = Mouse.create(el)
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      })
      // Let the page keep scrolling over the box.
      const m = mouse as unknown as Record<string, EventListener>
      el.removeEventListener('wheel', m.mousewheel)
      el.removeEventListener('mousewheel', m.mousewheel)
      el.removeEventListener('DOMMouseScroll', m.mousewheel)
      el.removeEventListener('touchstart', m.mousedown)
      el.removeEventListener('touchmove', m.mousemove)
      el.removeEventListener('touchend', m.mouseup)

      Composite.add(engine.world, [
        ...bodies.filter(Boolean).map((b) => b!.body),
        ...bounds,
        mouseConstraint,
      ])

      const runner = Runner.create()
      Runner.run(runner, engine)

      let frame = 0
      const render = () => {
        for (const item of bodies) {
          if (!item) continue
          const { x, y } = item.body.position
          item.node.style.transform = `translate(${x - item.bw / 2}px, ${y - item.bh / 2}px) rotate(${item.body.angle}rad)`
        }
        frame = requestAnimationFrame(render)
      }
      render()

      const ro = new ResizeObserver(() => {
        Composite.remove(engine.world, bounds)
        bounds = makeBounds()
        Composite.add(engine.world, bounds)
        for (const item of bodies) {
          if (!item) continue
          const { x, y } = item.body.position
          if (x > w() || x < 0) Body.setPosition(item.body, { x: w() / 2, y: Math.min(y, 0) })
        }
      })
      ro.observe(el)

      return () => {
        cancelAnimationFrame(frame)
        ro.disconnect()
        Runner.stop(runner)
        Composite.clear(engine.world, false)
        Engine.clear(engine)
      }
    }

    return () => {
      cancelled = true
      io.disconnect()
      cleanup?.()
    }
  }, [items])

  return (
    <div
      ref={containerRef}
      className={cn(
        'group/physics relative h-[440px] overflow-hidden rounded-xl border bg-background-panel md:h-[520px]',
        className
      )}
    >
      <div className="flex flex-wrap content-end gap-3 p-6 group-data-[live=true]/physics:block group-data-[live=true]/physics:p-0 h-full">
        {items.map((item, i) => (
          <div
            key={item.label}
            ref={(node) => {
              refs.current[i] = node
            }}
            className={cn(
              'select-none whitespace-nowrap group-data-[live=true]/physics:absolute group-data-[live=true]/physics:left-0 group-data-[live=true]/physics:top-0 group-data-[live=true]/physics:cursor-grab group-data-[live=true]/physics:active:cursor-grabbing',
              item.kind === 'card'
                ? 'w-56 rounded-2xl border bg-background p-4 shadow-sm'
                : item.kind === 'dot'
                  ? 'grid h-20 w-20 place-items-center rounded-full text-2xl font-semibold text-black shadow-sm'
                  : 'rounded-full border bg-background px-5 py-3 text-lg font-medium shadow-sm md:text-xl'
            )}
            style={item.kind === 'dot' ? { background: item.color } : undefined}
          >
            {item.kind === 'card' ? (
              <>
                <span className="block h-1.5 w-10 rounded-full" style={{ background: item.color }} />
                <span className="mt-6 block whitespace-normal text-lg font-medium leading-snug">{item.label}</span>
              </>
            ) : (
              item.label
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
