import { portfolio } from '@/content/portfolio'
import { SectionHeading } from './SectionHeading'

export function FutureTrajectory() {
  return (
    <section id="trajectory" aria-labelledby="trajectory-heading">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              id="trajectory-heading"
              kicker="06 · Horizon"
              title="Looking toward the next orbit"
            />
            <p className="prose-narrow mt-5">
              These are directions of study, not completed achievements. Each one is a destination
              marker on a line I am still drawing.
            </p>
            <svg
              viewBox="0 0 320 160"
              className="mt-10 w-full max-w-md text-[var(--accent)]"
              aria-hidden="true"
            >
              <path
                d="M8 120 C 80 120, 90 40, 160 40 S 240 130, 312 70"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.45"
                strokeWidth="1.4"
              />
              {[
                [8, 120],
                [160, 40],
                [240, 96],
                [312, 70],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill="currentColor" />
              ))}
            </svg>
          </div>

          <ol className="grid gap-4">
            {portfolio.trajectory.map((item, index) => (
              <li
                key={item.id}
                className="rounded-[1.3rem] border border-[var(--border)] p-5 sm:p-6"
              >
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--accent)]">
                  Waypoint {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
                <p className="mt-2 text-[var(--text-soft)]">{item.description}</p>
                {item.related ? (
                  <p className="mt-3 font-mono text-xs text-[var(--muted)]">{item.related}</p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
