import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { portfolio } from '@/content/portfolio'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { EarthHorizon } from './EarthHorizon'

function TypewriterMotto({ reduced, introReady }: { reduced: boolean; introReady: boolean }) {
  const full = portfolio.motto
  const firstLine = portfolio.mottoLines[0]
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (reduced || !introReady) return

    let index = 0
    let timer = 0

    const tick = () => {
      index += 1
      setVisible(index)
      if (index < full.length) {
        const char = full[index - 1]
        const delay = char === ' ' ? 140 : index === firstLine.length + 1 ? 320 : 54 + (index % 4) * 8
        timer = window.setTimeout(tick, delay)
      }
    }

    timer = window.setTimeout(tick, 320)
    return () => window.clearTimeout(timer)
  }, [firstLine.length, full, introReady, reduced])

  const shown = reduced ? full.length : introReady ? visible : 0
  const firstVisible = full.slice(0, Math.min(shown, firstLine.length))
  const secondVisible = shown > firstLine.length ? full.slice(firstLine.length + 1, shown) : ''
  const typingFirst = shown < firstLine.length
  const done = shown >= full.length
  const caret =
    introReady && !reduced && !done ? <span className="typewriter-caret" aria-hidden="true" /> : null

  return (
    <span className="block">
      <span className="sr-only">{full}</span>
      <span aria-hidden="true">
        <span className="block">
          {firstVisible}
          {typingFirst ? caret : null}
        </span>
        <span className="block text-[var(--accent)]">
          {secondVisible}
          {!typingFirst && !done ? caret : null}
        </span>
      </span>
    </span>
  )
}

export function CosmicHero({ introReady = true }: { introReady?: boolean }) {
  const reduced = usePrefersReducedMotion()

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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_88%,color-mix(in_srgb,var(--atmosphere)_18%,transparent),transparent_58%)]" />
      <EarthHorizon />
      <div className="hero-veil" aria-hidden="true" />

      <div className="section-shell relative z-10 flex min-h-[100svh] flex-col justify-center pt-20 pb-36">
        <motion.div
          className="max-w-[38rem]"
          initial={fade ? 'hidden' : false}
          animate="show"
          variants={{
            show: { transition: { staggerChildren: reduced ? 0 : 0.12 } },
          }}
        >
          <motion.h1 id="hero-heading" className="heading-xl hero-motto" variants={fade}>
            <TypewriterMotto reduced={reduced} introReady={introReady} />
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
