import { useEffect } from 'react'
import { ArrowLeft, Orbit, Radio } from 'lucide-react'
import { portfolio } from '@/content/portfolio'

export function NotFound() {
  useEffect(() => {
    const previous = document.title
    document.title = '404 · Signal lost — Pawan Kumar G'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <main id="main-content" tabIndex={-1} className="not-found">
      <div className="not-found__panel">
        <p className="kicker justify-center">404 · Signal lost</p>
        <div className="not-found__orbit" aria-hidden="true">
          <span className="not-found__ring not-found__ring--outer" />
          <span className="not-found__ring not-found__ring--inner" />
          <span className="not-found__satellite" />
          <Orbit size={30} strokeWidth={1.2} />
        </div>
        <h1>This route drifted out of orbit.</h1>
        <p>
          The page you requested does not exist, or its coordinates changed. Return to the
          main interface and continue exploring.
        </p>
        <div className="not-found__actions">
          <a className="btn btn-primary" href="/">
            <ArrowLeft size={16} aria-hidden="true" />
            Return to orbit
          </a>
          <a className="btn btn-ghost" href="/#contact">
            <Radio size={16} aria-hidden="true" />
            Contact {portfolio.owner.shortName}
          </a>
        </div>
      </div>
    </main>
  )
}
