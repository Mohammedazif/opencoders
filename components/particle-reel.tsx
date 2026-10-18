'use client'

import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { letters } from '@/lib/nav'

const SERVICES = letters.map((item) => ({
  letter: item.letter,
  label: item.name,
  href: item.href,
  color: item.color,
}))

type Particle = {
  x: number
  y: number
  homeX: number
  homeY: number
  targetX: number
  targetY: number
  size: number
  scatteredColor: string
  group: number
  blinkPhase: number
  blinkSpeed: number
}

function samplePoints(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  draw: () => void,
  count: number
): { x: number; y: number }[] {
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = 'white'
  draw()
  const { data } = ctx.getImageData(0, 0, width, height)
  ctx.clearRect(0, 0, width, height)

  const points: { x: number; y: number }[] = []
  const candidates: { x: number; y: number }[] = []

  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      if (data[(y * width + x) * 4 + 3] > 128) {
        candidates.push({ x, y })
      }
    }
  }

  if (candidates.length === 0) return points

  for (let i = 0; i < count; i++) {
    const pick = candidates[Math.floor(Math.random() * candidates.length)]
    points.push({
      x: pick.x + (Math.random() - 0.5),
      y: pick.y + (Math.random() - 0.5),
    })
  }

  return points
}

function getLetterLayout(width: number, height: number) {
  const narrow = width < 640
  const spacing = width * (narrow ? 0.28 : 0.26)
  const letterSize = Math.min(narrow ? 72 : 150, height * 0.32)
  const letterY = height / 2 - letterSize * 0.15
  const labelY = letterY + letterSize * 0.55 + (narrow ? 14 : 24)
  return {
    centers: [width / 2 - spacing, width / 2, width / 2 + spacing] as [number, number, number],
    letterY,
    letterSize,
    labelY,
  }
}

/**
 * The OpenCoders word made of particles. As the box scrolls up the page,
 * the word breaks into C, M, and D, which then link to their pages.
 */
export function ParticleReel() {
  const boxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const questionRef = useRef<HTMLParagraphElement>(null)
  const hintRef = useRef<HTMLParagraphElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const progressRef = useRef(0)
  const [labelLayout, setLabelLayout] = useState({
    centers: [0, 0, 0] as [number, number, number],
    labelY: 0,
  })

  useEffect(() => {
    const box = boxRef.current
    const canvas = canvasRef.current
    if (!box || !canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let particles: Particle[] = []
    let frame = 0
    let width = 0
    let height = 0
    let dpr = 1
    let running = true
    let visible = true

    const build = () => {
      const rect = box.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      // Sample at CSS pixel size, then scale up for crisp drawing.
      canvas.width = width
      canvas.height = height
      ctx.setTransform(1, 0, 0, 1, 0, 0)

      const fontSize = Math.min(width < 640 ? 52 : 120, width / 6.5)
      const { centers, letterY, letterSize, labelY } = getLetterLayout(width, height)
      setLabelLayout({ centers, labelY })

      const count = Math.floor(6000 * Math.sqrt((width * height) / (1600 * 900)))

      const homePoints = samplePoints(ctx, width, height, () => {
        ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('OpenCoders', width / 2, height / 2)
      }, count)

      const groupTargets = SERVICES.map((service, index) =>
        samplePoints(ctx, width, height, () => {
          ctx.font = `bold ${letterSize}px system-ui, -apple-system, sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(service.letter, centers[index], letterY)
        }, Math.ceil(count / 3) + 50)
      )

      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      particles = homePoints.map((home, i) => {
        const group = i % 3
        const targets = groupTargets[group]
        const target = targets[Math.floor(i / 3) % targets.length] ?? { x: centers[group], y: letterY }
        return {
          x: home.x,
          y: home.y,
          homeX: home.x,
          homeY: home.y,
          targetX: target.x,
          targetY: target.y,
          size: Math.random() * 1 + 0.6,
          scatteredColor: SERVICES[group].color,
          group,
          blinkPhase: Math.random() * Math.PI * 2,
          blinkSpeed: 0.001 + Math.random() * 0.0015,
        }
      })
    }

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    const draw = (time: number) => {
      if (!running) return
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, width, height)

      const progress = ease(progressRef.current)
      const { x: mouseX, y: mouseY } = mouseRef.current
      const maxDistance = Math.min(200, width / 5)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const baseX = p.homeX + (p.targetX - p.homeX) * progress
        const baseY = p.homeY + (p.targetY - p.homeY) * progress
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const pulse = Math.sin(time * p.blinkSpeed + p.blinkPhase)
        const blink = 0.45 + 0.55 * (0.5 + 0.5 * pulse)

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          p.x = baseX - Math.cos(angle) * force * 50
          p.y = baseY - Math.sin(angle) * force * 50
          ctx.fillStyle = p.scatteredColor
          ctx.globalAlpha = blink
        } else {
          p.x += (baseX - p.x) * 0.12
          p.y += (baseY - p.y) * 0.12
          ctx.fillStyle = progress > 0.55 ? p.scatteredColor : 'white'
          if (progress > 0.2 && progress < 0.55) {
            ctx.fillStyle = p.scatteredColor
            ctx.globalAlpha = blink * (0.35 + progress)
          } else {
            ctx.globalAlpha = blink
          }
        }
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }
      ctx.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }

    const applyProgress = (next: number) => {
      progressRef.current = next
      const labelOpacity = Math.max(0, (next - 0.45) / 0.35)
      if (questionRef.current) questionRef.current.style.opacity = String(labelOpacity)
      if (hintRef.current) hintRef.current.style.opacity = String(Math.max(0, 1 - next * 2.2))
      if (labelsRef.current) {
        labelsRef.current.style.opacity = String(labelOpacity)
        labelsRef.current.style.pointerEvents = labelOpacity > 0.5 ? 'auto' : 'none'
      }
    }

    // 0 while the box sits low in the viewport, 1 once its top reaches the upper fifth.
    const onScroll = () => {
      if (reduceMotion) return applyProgress(1)
      const rect = box.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.75
      const end = vh * 0.15
      applyProgress(Math.min(1, Math.max(0, (start - rect.top) / (start - end))))
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onPointerLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    const start = () => {
      if (running || !visible || document.hidden) return
      running = true
      frame = requestAnimationFrame(draw)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(box)

    const onVisibility = () => (document.hidden ? stop() : start())

    let resizeTimer = 0
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(build, 120)
    })
    ro.observe(box)

    build()
    onScroll()
    frame = requestAnimationFrame(draw)

    window.addEventListener('scroll', onScroll, { passive: true })
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      clearTimeout(resizeTimer)
      window.removeEventListener('scroll', onScroll)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const labelsReady = labelLayout.centers[0] !== 0

  return (
    <div
      ref={boxRef}
      className="relative h-[min(80vh,56vw)] min-h-[320px] w-full overflow-hidden rounded-xl bg-[#0a0a0a] dark:ring-1 dark:ring-white/10"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-pan-y"
        aria-label="OpenCoders splits into Content, Marketing, and Development"
        role="img"
      />

      <p
        ref={questionRef}
        className="pointer-events-none absolute left-1/2 top-6 z-10 w-full max-w-xl -translate-x-1/2 px-6 text-center font-mono text-sm tracking-wide text-neutral-300 sm:top-10 md:text-lg"
        style={{ opacity: 0 }}
      >
        What are we building together?
      </p>

      <p
        ref={hintRef}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-neutral-500 sm:text-sm"
      >
        Keep scrolling
      </p>

      <div ref={labelsRef} className="pointer-events-none absolute inset-0 z-10" style={{ opacity: 0 }}>
        {labelsReady
          ? SERVICES.map((service, index) => (
              <Link
                key={service.letter}
                href={service.href}
                className="absolute -translate-x-1/2 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-center font-mono text-[9px] uppercase tracking-[0.1em] sm:px-3 sm:py-1.5 sm:tracking-[0.2em] backdrop-blur transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-xs"
                style={{ left: labelLayout.centers[index], top: labelLayout.labelY, color: service.color }}
              >
                {service.label}
              </Link>
            ))
          : null}
      </div>
    </div>
  )
}
