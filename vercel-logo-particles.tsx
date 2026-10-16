'use client'

import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { letters, tagline } from '@/lib/nav'

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
  canvas: HTMLCanvasElement,
  draw: () => void,
  count: number
): { x: number; y: number }[] {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'white'
  draw()
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const points: { x: number; y: number }[] = []
  const candidates: { x: number; y: number }[] = []

  for (let y = 0; y < canvas.height; y += 2) {
    for (let x = 0; x < canvas.width; x += 2) {
      if (data[(y * canvas.width + x) * 4 + 3] > 128) {
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
  const spacing = width < 768 ? width * 0.28 : width * 0.26
  const letterSize = width < 768 ? 72 : 140
  const letterY = height / 2 - (width < 768 ? 20 : 30)
  const labelY = letterY + letterSize * 0.55 + (width < 768 ? 18 : 28)
  return {
    centers: [width / 2 - spacing, width / 2, width / 2 + spacing] as [
      number,
      number,
      number,
    ],
    letterY,
    letterSize,
    labelY,
  }
}

export default function Component() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const questionRef = useRef<HTMLParagraphElement>(null)
  const hintRef = useRef<HTMLParagraphElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const scrollProgressRef = useRef(0)
  const [labelLayout, setLabelLayout] = useState({
    centers: [0, 0, 0] as [number, number, number],
    labelY: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let animationFrameId = 0
    let width = 0
    let height = 0

    const updateCanvasSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const buildParticles = () => {
      updateCanvasSize()

      const fontSize = width < 768 ? 48 : 96
      const { centers, letterY, letterSize, labelY } = getLetterLayout(width, height)
      setLabelLayout({ centers, labelY })

      const particleCount = Math.floor(
        7000 * Math.sqrt((width * height) / (1920 * 1080))
      )

      const homePoints = samplePoints(ctx, canvas, () => {
        ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('OpenCoders', width / 2, height / 2)
      }, particleCount)

      const groupTargets: { x: number; y: number }[][] = [[], [], []]

      SERVICES.forEach((service, index) => {
        groupTargets[index] = samplePoints(ctx, canvas, () => {
          ctx.font = `bold ${letterSize}px system-ui, -apple-system, sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(service.letter, centers[index], letterY)
        }, Math.ceil(particleCount / 3) + 50)
      })

      particles = homePoints.map((home, i) => {
        const group = i % 3
        const targets = groupTargets[group]
        const target = targets[Math.floor(i / 3) % targets.length] ?? {
          x: centers[group],
          y: letterY,
        }

        return {
          x: home.x,
          y: home.y,
          homeX: home.x,
          homeY: home.y,
          targetX: target.x,
          targetY: target.y,
          size: Math.random() * 1 + 0.5,
          scatteredColor: SERVICES[group].color,
          group,
          blinkPhase: Math.random() * Math.PI * 2,
          blinkSpeed: 0.001 + Math.random() * 0.0015,
        }
      })
    }

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    let running = true

    const animate = (time: number) => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, width, height)

      const progress = easeInOutCubic(scrollProgressRef.current)
      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 240
      const canScatter = isTouchingRef.current || !('ontouchstart' in window)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const baseX = p.homeX + (p.targetX - p.homeX) * progress
        const baseY = p.homeY + (p.targetY - p.homeY) * progress

        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        const pulse = Math.sin(time * p.blinkSpeed + p.blinkPhase)
        const blink = 0.45 + 0.55 * (0.5 + 0.5 * pulse)

        if (distance < maxDistance && canScatter && (mouseX !== 0 || mouseY !== 0)) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          p.x = baseX - Math.cos(angle) * force * 60
          p.y = baseY - Math.sin(angle) * force * 60
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
        ctx.globalAlpha = 1
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    buildParticles()
    animate(0)

    const handleResize = () => {
      buildParticles()
    }

    const applyScroll = (next: number) => {
      scrollProgressRef.current = next
      const labelOpacity = Math.max(0, (next - 0.45) / 0.35)
      const hintOpacity = Math.max(0, 1 - next * 2.2)
      if (questionRef.current) questionRef.current.style.opacity = String(labelOpacity)
      if (hintRef.current) hintRef.current.style.opacity = String(hintOpacity)
      if (labelsRef.current) labelsRef.current.style.opacity = String(labelOpacity)
    }

    const handleScroll = () => {
      const stage = stageRef.current
      if (!stage) return
      const scrollable = Math.max(1, stage.offsetHeight - window.innerHeight)
      const scrolled = Math.min(scrollable, Math.max(0, -stage.getBoundingClientRect().top))
      applyScroll(scrolled / scrollable)
    }

    const heroIsOnScreen = () => {
      const stage = stageRef.current
      if (!stage) return false
      const rect = stage.getBoundingClientRect()
      return rect.bottom > 0 && rect.top < window.innerHeight
    }

    const handleMove = (x: number, y: number) => {
      if (!heroIsOnScreen()) {
        mousePositionRef.current = { x: 0, y: 0 }
        return
      }
      mousePositionRef.current = { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      isTouchingRef.current = true
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(animationFrameId)
        return
      }
      if (!running) {
        running = true
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)
    document.addEventListener('visibilitychange', onVisibility)
    handleScroll()

    return () => {
      running = false
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const labelsReady = labelLayout.centers[0] !== 0

  return (
    <div ref={stageRef} className="relative bg-black" style={{ height: '220vh' }}>
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-pan-y"
          aria-label="OpenCoders splits into Content, Marketing, and Development"
        />

        <p
          ref={questionRef}
          className="pointer-events-none absolute left-1/2 top-10 z-10 w-full max-w-xl -translate-x-1/2 px-6 text-center font-mono text-sm tracking-wide text-gray-300 sm:top-14 sm:text-base md:text-lg"
          style={{ opacity: 0 }}
        >
          What Are We Building Together?
        </p>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 w-full max-w-xl -translate-x-1/2 px-6 text-center">
          <p ref={hintRef} className="font-mono text-xs text-gray-500 sm:text-sm">
            Scroll to explore
          </p>
          <p className="mt-3 font-mono text-sm text-gray-300">{tagline}</p>
        </div>

        <div
          ref={labelsRef}
          className="pointer-events-none absolute inset-0 z-10"
          style={{ opacity: 0 }}
        >
          {labelsReady
            ? SERVICES.map((service, index) => (
                <Link
                  key={service.letter}
                  href={service.href}
                  className="pointer-events-auto absolute -translate-x-1/2 px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-xs"
                  style={{
                    left: labelLayout.centers[index],
                    top: labelLayout.labelY,
                    color: service.color,
                  }}
                >
                  {service.label}
                </Link>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}
