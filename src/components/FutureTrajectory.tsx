import { useId, useMemo, useState } from 'react'
import { portfolio } from '@/content/portfolio'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const HORIZON_PATH = 'M 28 236 C 150 10 370 10 492 236'
const HORIZON_POINTS = [
  { x: 28, y: 236, anchor: 'start' as const },
  { x: 134.81, y: 108.88, anchor: 'middle' as const },
  { x: 260, y: 66.5, anchor: 'middle' as const },
  { x: 385.19, y: 108.88, anchor: 'middle' as const },
  { x: 492, y: 236, anchor: 'end' as const },
]
const HORIZON_CURVE = {
  start: [28, 236],
  controlOne: [150, 10],
  controlTwo: [370, 10],
  end: [492, 236],
} as const

function lerpPoint(
  a: readonly [number, number],
  b: readonly [number, number],
  t: number,
): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

function buildProbePath(progress: number) {
  const { start, controlOne, controlTwo, end } = HORIZON_CURVE
  const p01 = lerpPoint(start, controlOne, progress)
  const p12 = lerpPoint(controlOne, controlTwo, progress)
  const p23 = lerpPoint(controlTwo, end, progress)
  const p012 = lerpPoint(p01, p12, progress)
  const p123 = lerpPoint(p12, p23, progress)
  const target = lerpPoint(p012, p123, progress)
  return {
    d: `M ${start[0]} ${start[1]} C ${p01[0]} ${p01[1]}, ${p012[0]} ${p012[1]}, ${target[0]} ${target[1]}`,
    target,
  }
}

const HORIZON_STARS = [
  [48, 34, 1.2],
  [92, 72, 0.8],
  [128, 28, 0.9],
  [170, 100, 1.1],
  [208, 42, 0.7],
  [248, 120, 1],
  [292, 34, 0.8],
  [334, 94, 1.2],
  [372, 30, 0.7],
  [414, 78, 0.9],
  [458, 42, 1.1],
  [482, 112, 0.8],
  [78, 176, 0.7],
  [206, 188, 0.9],
  [318, 186, 0.8],
  [448, 172, 1],
]

export function FutureTrajectory() {
  const reduced = usePrefersReducedMotion()
  const uid = useId().replace(/:/g, '')
  const gradientId = `horizon-gradient-${uid}`
  const glowId = `horizon-glow-${uid}`
  const [hoveredId, setHoveredId] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const activeId = hoveredId || selectedId
  const activeIndex = portfolio.trajectory.findIndex((item) => item.id === activeId)
  const activeItem = activeIndex >= 0 ? portfolio.trajectory[activeIndex] : null
  const probe = useMemo(() => {
    if (activeIndex < 1 || portfolio.trajectory.length < 2) return null
    const progress = activeIndex / (portfolio.trajectory.length - 1)
    return buildProbePath(progress)
  }, [activeIndex])
  const activePoint = activeIndex >= 0 ? HORIZON_POINTS[activeIndex] : null
  const probePosition = reduced && activePoint ? activePoint : HORIZON_POINTS[0]

  return (
    <section id="trajectory" aria-labelledby="trajectory-heading">
      <div className="section-shell">
        <div className="horizon-layout grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="horizon-left">
            <SectionHeading
              id="trajectory-heading"
              kicker="06 · Horizon"
              title="Looking toward the next orbit"
            />
            <p className="prose-narrow mt-5">
              These are directions of study, not completed achievements. Each one is a destination
              marker on a line I am still drawing.
            </p>

            <div className="horizon-map-wrap">
              <div className="horizon-map">
                <div className="horizon-map__hud" aria-hidden="true">
                  <span>
                    {activeItem
                      ? `Waypoint ${String(activeIndex + 1).padStart(2, '0')}`
                      : 'Next orbit'}
                  </span>
                  <span>
                    {activeItem
                      ? activeItem.shortLabel
                      : `${String(portfolio.trajectory.length).padStart(2, '0')} destinations`}
                  </span>
                </div>
                <svg
                  viewBox="0 0 520 320"
                  className="horizon-map__svg"
                  role="img"
                  aria-labelledby="horizon-map-title horizon-map-description"
                >
                  <title id="horizon-map-title">Future trajectory waypoints</title>
                  <desc id="horizon-map-description">
                    An orbital horizon diagram with {portfolio.trajectory.length} numbered
                    destination markers for future learning directions.
                  </desc>
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                      <stop offset="50%" stopColor="var(--violet)" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.35" />
                    </linearGradient>
                    <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <g className="horizon-map__stars" aria-hidden="true">
                    {HORIZON_STARS.map(([x, y, radius], index) => (
                      <circle
                        key={`${x}-${y}`}
                        cx={x}
                        cy={y}
                        r={radius}
                        className="horizon-map__star"
                        style={{ animationDelay: `${(index % 8) * 0.42}s` }}
                      />
                    ))}
                  </g>

                  <line x1="28" y1="280" x2="492" y2="280" className="horizon-map__axis" />
                  <path d={HORIZON_PATH} className="horizon-map__orbit horizon-map__orbit--faint" />
                  <path
                    d={HORIZON_PATH}
                    pathLength={1}
                    className="horizon-map__orbit horizon-map__orbit--draw"
                    stroke={`url(#${gradientId})`}
                  />
                  <path
                    d={HORIZON_PATH}
                    pathLength={1}
                    className="horizon-map__orbit horizon-map__orbit--comet"
                    stroke={`url(#${gradientId})`}
                  />

                  {probe ? (
                    <path
                      d={probe.d}
                      className="horizon-map__probe-trail"
                      stroke={`url(#${gradientId})`}
                    />
                  ) : null}

                  <g
                    className={cn(
                      'horizon-map__probe',
                      !activeItem && 'horizon-map__probe--idle',
                    )}
                    transform={
                      !probe || reduced
                        ? `translate(${probePosition.x} ${probePosition.y})`
                        : undefined
                    }
                    aria-hidden="true"
                  >
                    <circle r="7" className="horizon-map__probe-ping" />
                    <circle r="3.4" className="horizon-map__probe-core" />
                    <path d="M -8 0 H -4.6 M 4.6 0 H 8 M 0 -8 V -4.6 M 0 4.6 V 8" className="horizon-map__probe-arms" />
                    {probe && !reduced ? (
                      <animateMotion
                        key={activeId}
                        path={probe.d}
                        dur="0.72s"
                        fill="freeze"
                        calcMode="spline"
                        keyTimes="0;1"
                        keySplines="0.22 1 0.36 1"
                      />
                    ) : null}
                  </g>

                  {portfolio.trajectory.map((item, index) => {
                    const point = HORIZON_POINTS[index] ?? HORIZON_POINTS[0]
                    const isActive = activeId === item.id
                    return (
                      <g
                        key={item.id}
                        className={cn(
                          'horizon-map__marker',
                          isActive && 'horizon-map__marker--active',
                        )}
                        filter={isActive ? `url(#${glowId})` : undefined}
                      >
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={isActive ? 18 : 12}
                          className="horizon-map__halo"
                        />
                        <circle cx={point.x} cy={point.y} r="9" className="horizon-map__node" />
                        <text
                          x={point.x}
                          y={point.y + 3.5}
                          textAnchor="middle"
                          className="horizon-map__number"
                        >
                          {String(index + 1).padStart(2, '0')}
                        </text>
                        <text
                          x={point.x}
                          y={point.y + 29}
                          textAnchor={point.anchor}
                          className="horizon-map__label"
                        >
                          {item.shortLabel}
                        </text>
                      </g>
                    )
                  })}

                  <text x="28" y="306" className="horizon-map__axis-label">
                    Horizon / not yet flown
                  </text>
                  <text x="492" y="306" textAnchor="end" className="horizon-map__axis-label">
                    Destination markers
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <Reveal className="horizon-waypoints" delay={0.08}>
            <ol className="grid gap-4">
              {portfolio.trajectory.map((item, index) => {
                const isSelected = selectedId === item.id
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={cn(
                        'horizon-waypoint w-full rounded-[1.3rem] border border-[var(--border)] p-5 text-left sm:p-6',
                        activeId === item.id && 'horizon-waypoint--active',
                      )}
                      aria-pressed={isSelected}
                      onClick={() =>
                        setSelectedId((current) => (current === item.id ? '' : item.id))
                      }
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId('')}
                      onFocus={() => setHoveredId(item.id)}
                      onBlur={() => setHoveredId('')}
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--accent)]">
                          Waypoint {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="horizon-waypoint__index" aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </span>
                      <span className="mt-2 block font-display text-2xl">{item.title}</span>
                      <span className="mt-2 block text-[var(--text-soft)]">{item.description}</span>
                      {item.related ? (
                        <span className="mt-3 block font-mono text-xs text-[var(--muted)]">
                          {item.related}
                        </span>
                      ) : null}
                    </button>
                  </li>
                )
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
