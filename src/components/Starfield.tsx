import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Star = {
  x: number
  y: number
  r: number
  o: number
  depth: number
  phase: number
  speed: number
  tint: 'white' | 'cyan' | 'violet'
  glint: boolean
}

function seededRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let width = 0
    let height = 0
    let stars: Star[] = []
    let warpStartedAt = 0
    let smoothedScroll = window.scrollY
    const pointer = { x: 0.5, y: 0.5 }
    const prefersReduced = reduced

    const seed = (count: number) => {
      const random = seededRandom(2731)
      stars = Array.from({ length: count }, () => {
        const tintRoll = random()
        return {
          x: random(),
          y: random(),
          r: 0.32 + random() * 1.05,
          o: 0.2 + random() * 0.58,
          depth: 0.35 + random() * 1.15,
          phase: random() * Math.PI * 2,
          speed: 0.55 + random() * 0.85,
          tint: tintRoll > 0.9 ? 'cyan' : tintRoll > 0.82 ? 'violet' : 'white',
          glint: random() > 0.86,
        }
      })
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed(width < 720 ? 82 : 132)
      if (prefersReduced) draw(0)
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      const light = document.documentElement.dataset.theme === 'light'
      const pointerX = (pointer.x - 0.5) * 7
      const pointerY = (pointer.y - 0.5) * 5
      const warpElapsed = warpStartedAt ? (time - warpStartedAt) / 1900 : 1
      const warpPulse =
        warpStartedAt && warpElapsed < 1
          ? Math.sin(Math.PI * Math.max(0, warpElapsed))
          : 0

      if (!prefersReduced) {
        smoothedScroll += (window.scrollY - smoothedScroll) * 0.045
      } else {
        smoothedScroll = window.scrollY
      }

      const travel = -smoothedScroll * 0.055
      const wrapHeight = height + 64

      for (const star of stars) {
        const twinkle = prefersReduced
          ? 0.86
          : 0.68 + Math.sin(time * 0.001 * star.speed + star.phase) * 0.32
        const float = prefersReduced
          ? 0
          : Math.sin(time * 0.00023 + star.phase) * (2.2 + star.depth * 2.8)
        const baseY = star.y * wrapHeight + travel * star.depth + float + pointerY * star.depth
        const y = ((baseY % wrapHeight) + wrapHeight) % wrapHeight - 32
        const x =
          star.x * width +
          pointerX * star.depth +
          (prefersReduced ? 0 : Math.sin(time * 0.00011 + star.phase) * 2)

        const colorBase =
          star.tint === 'cyan'
            ? '139, 229, 255'
            : star.tint === 'violet'
              ? '184, 173, 255'
              : light
                ? '11, 18, 32'
                : '246, 249, 255'
        const alpha = Math.min(
          0.95,
          star.o * twinkle * (light ? 0.34 : 1) * (1 + warpPulse * 0.6),
        )
        const radius = star.r * (1 + warpPulse * 0.55)

        ctx.beginPath()
        ctx.fillStyle = `rgba(${colorBase}, ${alpha})`
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()

        if (!light && star.glint && radius > 0.85) {
          const glintLength = radius * (3.2 + warpPulse * 2)
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${colorBase}, ${alpha * 0.28})`
          ctx.lineWidth = 0.55
          ctx.moveTo(x - glintLength, y)
          ctx.lineTo(x + glintLength, y)
          ctx.moveTo(x, y - glintLength)
          ctx.lineTo(x, y + glintLength)
          ctx.stroke()
        }
      }

      if (!prefersReduced) {
        frame = window.requestAnimationFrame(draw)
      }
    }

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX / width
      pointer.y = event.clientY / height
    }

    const onWarp = () => {
      warpStartedAt = performance.now()
    }

    const themeObserver = new MutationObserver(() => {
      if (prefersReduced) draw(0)
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    resize()
    draw(0)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('astra:warp', onWarp)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('astra:warp', onWarp)
      themeObserver.disconnect()
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-90"
      aria-hidden="true"
    />
  )
}
