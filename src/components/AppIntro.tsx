import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'

type Phase = 'loading' | 'leaving' | 'done'

const PROGRESS_DURATION = 1100
const HOLD_DURATION = 180
const EXIT_DURATION = 520

type AppIntroProps = {
  onComplete?: () => void
}

export function AppIntro({ onComplete }: AppIntroProps) {
  const [reduced] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [phase, setPhase] = useState<Phase>(reduced ? 'done' : 'loading')
  const [progress, setProgress] = useState(0)

  useBodyScrollLock(phase !== 'done')

  useEffect(() => {
    if (phase !== 'loading') return

    const startedAt = performance.now()
    let frame = 0
    let hold = 0

    const tick = (now: number) => {
      const ratio = Math.min(1, (now - startedAt) / PROGRESS_DURATION)
      setProgress(Math.round(ratio * 100))
      if (ratio < 1) {
        frame = window.requestAnimationFrame(tick)
      } else {
        hold = window.setTimeout(() => setPhase('leaving'), HOLD_DURATION)
      }
    }

    frame = window.requestAnimationFrame(tick)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(hold)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'leaving') return
    const timer = window.setTimeout(() => setPhase('done'), EXIT_DURATION)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'done') return
    onComplete?.()
  }, [onComplete, phase])

  useEffect(() => {
    if (phase === 'done') return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProgress(100)
        setPhase('leaving')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  if (phase === 'done') return null

  const skip = () => {
    setProgress(100)
    setPhase('leaving')
  }

  return createPortal(
    <div
      className={`app-intro${phase === 'leaving' ? ' app-intro--leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      aria-describedby="intro-status"
    >
      <div className="app-intro__field" aria-hidden="true">
        <span className="app-intro__grid" />
        <span className="app-intro__glow app-intro__glow--cyan" />
        <span className="app-intro__glow app-intro__glow--violet" />
      </div>

      <div className="app-intro__content">
        <p className="app-intro__eyebrow">Pawan Kumar G. · portfolio interface</p>

        <div className="app-intro__orbital" aria-hidden="true">
          <span className="app-intro__ring app-intro__ring--outer" />
          <span className="app-intro__ring app-intro__ring--middle" />
          <span className="app-intro__ring app-intro__ring--inner" />
          <span className="app-intro__satellite" />
          <span className="app-intro__core">PK</span>
        </div>

        <h1 id="intro-title" className="app-intro__title">
          Establishing orbit
        </h1>
        <p id="intro-status" className="app-intro__status">
          Calibrating the interface and charting the mission archive.
        </p>

        <div className="app-intro__meter">
          <div
            className="app-intro__meter-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Portfolio loading progress"
          >
            <span
              className="app-intro__meter-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="app-intro__meter-value">{String(progress).padStart(3, '0')}%</span>
        </div>

        <div className="app-intro__footer">
          <span>Per Aspera Ad Astra</span>
          <button type="button" className="app-intro__skip" onClick={skip}>
            Skip intro
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
