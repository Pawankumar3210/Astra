import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Star = {
  x: number
  y: number
  r: number
  o: number
  s: number
  p: number
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
    const pointer = { x: 0.5, y: 0.5 }
    const prefersReduced = reduced

    const seed = (count: number) => {
      stars = Array.from({ length: count }, (_, index) => ({
        x: (index * 97) % 1000 / 1000,
        y: (index * 53) % 1000 / 1000,
        r: 0.4 + (index % 5) * 0.22,
        o: 0.18 + (index % 7) * 0.08,
        s: 0.4 + (index % 4) * 0.12,
        p: 0.2 + (index % 6) * 0.08,
      }))
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
      seed(width < 720 ? 70 : 110)
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      const driftX = (pointer.x - 0.5) * 18
      const driftY = (pointer.y - 0.5) * 12
      for (const star of stars) {
        const twinkle = prefersReduced ? 1 : 0.65 + Math.sin(time * 0.001 * star.s + star.p * 12) * 0.35
        ctx.beginPath()
        const light = document.documentElement.dataset.theme === 'light'
        ctx.fillStyle = light
          ? `rgba(11, 18, 32, ${star.o * twinkle * 0.55})`
          : `rgba(242, 245, 252, ${star.o * twinkle})`
        ctx.arc(
          star.x * width + driftX * star.p,
          star.y * height + driftY * star.p,
          star.r,
          0,
          Math.PI * 2,
        )
        ctx.fill()
      }
      if (!prefersReduced) {
        frame = window.requestAnimationFrame(draw)
      }
    }

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX / width
      pointer.y = event.clientY / height
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

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      themeObserver.disconnect()
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
      aria-hidden="true"
    />
  )
}
