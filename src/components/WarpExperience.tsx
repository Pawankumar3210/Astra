import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function WarpExperience() {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(false)
  const sequence = useRef(0)

  useEffect(() => {
    if (reduced) return

    const trigger = () => {
      setActive(false)
      window.requestAnimationFrame(() => setActive(true))
    }

    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      if (typing) {
        sequence.current = 0
        return
      }
      const expected = KONAMI[sequence.current]
      if (event.key.toLowerCase() === expected.toLowerCase()) {
        sequence.current += 1
        if (sequence.current === KONAMI.length) {
          sequence.current = 0
          trigger()
        }
      } else {
        sequence.current = event.key === KONAMI[0] ? 1 : 0
      }
    }

    const onWarp = () => trigger()

    window.addEventListener('keydown', onKey)
    window.addEventListener('astra:warp', onWarp)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('astra:warp', onWarp)
    }
  }, [reduced])

  useEffect(() => {
    if (!active) return
    const timer = window.setTimeout(() => setActive(false), 2400)
    return () => window.clearTimeout(timer)
  }, [active])

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="warp-overlay"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <span className="warp-overlay__streaks" />
          <div className="warp-overlay__message">
            <span className="warp-overlay__eyebrow">ASTRA // secret channel</span>
            <strong>Warp drive engaged</strong>
            <span>Hold onto your orbit.</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
