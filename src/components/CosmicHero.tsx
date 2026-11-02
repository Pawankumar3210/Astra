import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { portfolio } from '@/content/portfolio'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { EarthHorizon } from './EarthHorizon'

export function CosmicHero() {
  const reduced = usePrefersReducedMotion()
  const glowRef = useRef<HTMLDivElement>(null)
  const earthRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const glow = glowRef.current
    const earth = earthRef.current
    if (!glow) return
    let raf = 0
    const pos = { x: window.innerWidth * 0.72, y: window.innerHeight * 0.42 }
    const target = { ...pos }

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
    }

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.08
      pos.y += (target.y - pos.y) * 0.08
      glow.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      if (earth) {
        const px = (pos.x / window.innerWidth - 0.5) * 14
        const py = (pos.y / window.innerHeight - 0.5) * 8
        earth.style.transform = `translate(${px}px, ${py}px)`
      }
      raf = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = window.requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.cancelAnimationFrame(raf)
    }
  }, [reduced])

  const fade = reduced
    ? undefined
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0 },
      }

  return (
    <section
      id="home"
      className="relative isolate min-h-[100svh] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div ref={glowRef} className="pointer-glow hidden md:block" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_88%,color-mix(in_srgb,var(--atmosphere)_26%,transparent),transparent_58%)]" />
      <div ref={earthRef}>
        <EarthHorizon />
      </div>

      <div className="section-shell relative z-10 flex min-h-[100svh] flex-col justify-center pt-20 pb-36">
        <motion.div
          className="max-w-[38rem]"
          initial={fade ? 'hidden' : false}
          animate="show"
          variants={{
            show: { transition: { staggerChildren: reduced ? 0 : 0.12 } },
          }}
        >
          <motion.p className="kicker" variants={fade}>
            {portfolio.owner.introLabel}
          </motion.p>
          <motion.h1 id="hero-heading" className="heading-xl mt-6" variants={fade}>
            {portfolio.mottoLines[0]}
            <br />
            <span className="text-[var(--accent)]">{portfolio.mottoLines[1]}</span>
          </motion.h1>
          <motion.p className="mt-8 font-display text-2xl text-[var(--text)] sm:text-3xl" variants={fade}>
            {portfolio.owner.greeting}
          </motion.p>
          <motion.p className="prose-narrow mt-4" variants={fade}>
            {portfolio.owner.summary}
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-3" variants={fade}>
            <a href="#projects" className="btn btn-primary">
              Explore My Work
            </a>
            <a href="#journey" className="btn btn-ghost">
              My Journey
            </a>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--text-soft)]"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em]">Scroll</span>
        <span className="grid h-11 w-7 place-items-end justify-center rounded-full border border-[var(--border)] pb-2">
          <ArrowDown size={12} className="motion-safe:animate-bounce" />
        </span>
      </a>
    </section>
  )
}
