import { useEffect, useId, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Flag,
  GitPullRequest,
  GraduationCap,
  Orbit,
  Rocket,
  Sparkles,
  Telescope,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import { visibleMilestones, type Milestone } from '@/content/portfolio'
import { cn } from '@/lib/cn'
import { SectionHeading } from './SectionHeading'

const CATEGORY_META: Record<
  Milestone['category'],
  { label: string; Icon: LucideIcon }
> = {
  education: { label: 'Education', Icon: GraduationCap },
  project: { label: 'Projects', Icon: Rocket },
  opensource: { label: 'Open source', Icon: GitPullRequest },
  hackathon: { label: 'Hackathons', Icon: Trophy },
  milestone: { label: 'Milestones', Icon: Flag },
  learning: { label: 'Learning', Icon: Sparkles },
  future: { label: 'Future', Icon: Telescope },
}

function buildPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1]
    const current = points[index]
    const middle = (previous.y + current.y) / 2
    d += ` C ${previous.x} ${middle}, ${current.x} ${middle}, ${current.x} ${current.y}`
  }
  return d
}

export function ConstellationTimeline() {
  const uid = useId().replace(/:/g, '')
  const gradientId = `journey-gradient-${uid}`
  const listRef = useRef<HTMLOListElement>(null)
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([])
  const [path, setPath] = useState('')
  const [progress, setProgress] = useState<{
    category: 'all' | Milestone['category']
    value: number
  }>({ category: 'all', value: 0 })
  const [lit, setLit] = useState<string[]>([])
  const [focusId, setFocusId] = useState('')
  const [activeCategory, setActiveCategory] = useState<'all' | Milestone['category']>('all')

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<Milestone['category'], number>> = {}
    for (const item of visibleMilestones) {
      counts[item.category] = (counts[item.category] ?? 0) + 1
    }
    return counts
  }, [])

  const filteredMilestones = useMemo(
    () =>
      activeCategory === 'all'
        ? visibleMilestones
        : visibleMilestones.filter((item) => item.category === activeCategory),
    [activeCategory],
  )

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const draw = () => {
      const parent = list.getBoundingClientRect()
      const points = nodeRefs.current
        .filter((node): node is HTMLSpanElement => Boolean(node))
        .map((node) => {
          const box = node.getBoundingClientRect()
          return {
            x: box.left + box.width / 2 - parent.left,
            y: box.top + box.height / 2 - parent.top,
          }
        })
      setPath(buildPath(points))
    }

    draw()
    const observer = new ResizeObserver(draw)
    observer.observe(list)
    window.addEventListener('resize', draw)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', draw)
    }
  }, [activeCategory])

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    let frame = 0
    const updateProgress = () => {
      frame = 0
      const box = list.getBoundingClientRect()
      const viewport = window.innerHeight
      const start = viewport * 0.82
      const end = viewport * 0.34
      const travel = box.height + (start - end)
      const next = Math.min(1, Math.max(0, (start - box.top) / Math.max(travel, 1)))
      setProgress((current) => ({
        category: activeCategory,
        value:
          current.category === activeCategory
            ? Math.max(current.value, next)
            : next,
      }))
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [activeCategory])

  useEffect(() => {
    const nodes = nodeRefs.current.filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        setLit((current) => {
          const next = new Set(current)
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).dataset.milestone
            if (id && entry.isIntersecting) next.add(id)
          }
          return Array.from(next)
        })
      },
      { threshold: 0.55 },
    )
    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [activeCategory])

  return (
    <section id="journey" aria-labelledby="journey-heading">
      <div className="section-shell">
        <SectionHeading
          id="journey-heading"
          kicker="05 · Flight log"
          title="A constellation of real work"
          description="Follow the public trail from a first GitHub profile through shipped projects, merged open-source contributions, hackathon work, and the next orbit. Only milestones with evidence are plotted."
        />

        <div className="journey-filter">
          <div className="journey-legend" role="group" aria-label="Filter journey by category">
            <button
              type="button"
              className={cn(
                'journey-legend__item journey-legend__button',
                activeCategory === 'all' && 'journey-legend__item--active',
              )}
              aria-pressed={activeCategory === 'all'}
              aria-controls="journey-timeline"
              onClick={() => setActiveCategory('all')}
            >
              <Orbit size={12} strokeWidth={1.7} aria-hidden="true" />
              All
              <span className="journey-legend__count">{visibleMilestones.length}</span>
            </button>
            {Object.entries(CATEGORY_META).map(([category, { label, Icon }]) => {
              const typedCategory = category as Milestone['category']
              const count = categoryCounts[typedCategory] ?? 0
              if (!count) return null
              return (
                <button
                  key={category}
                  type="button"
                  className={cn(
                    'journey-legend__item journey-legend__button',
                    activeCategory === typedCategory && 'journey-legend__item--active',
                  )}
                  aria-pressed={activeCategory === typedCategory}
                  aria-controls="journey-timeline"
                  onClick={() => setActiveCategory(typedCategory)}
                >
                  <Icon size={12} strokeWidth={1.7} aria-hidden="true" />
                  {label}
                  <span className="journey-legend__count">{count}</span>
                </button>
              )
            })}
          </div>
          <p className="journey-filter__status" aria-live="polite">
            Showing {filteredMilestones.length} of {visibleMilestones.length} milestones
          </p>
        </div>

        <ol
          ref={listRef}
          id="journey-timeline"
          className="journey-list"
          aria-label={
            activeCategory === 'all'
              ? 'All journey milestones'
              : `${CATEGORY_META[activeCategory].label} milestones`
          }
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="48%" stopColor="var(--violet)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
            <path d={path} className="journey-path journey-path--aura" />
            <path d={path} className="journey-path journey-path--guide" />
            <path
              d={path}
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={1 - (progress.category === activeCategory ? progress.value : 0)}
              className="journey-path journey-path--trail"
              style={{ stroke: `url(#${gradientId})` }}
            />
            <path d={path} pathLength={1} className="journey-path journey-path--stream" />
            <path d={path} pathLength={1} className="journey-path journey-path--pulse" />
          </svg>

          {filteredMilestones.map((item, index) => {
            const meta = CATEGORY_META[item.category]
            const isLit = lit.includes(item.id) || focusId === item.id
            const isFuture = item.category === 'future'
            const even = index % 2 === 0
            const external = item.href.startsWith('http')
            const cardClassName = cn(
              'journey-card',
              isLit && 'journey-card--lit',
              isFuture && 'journey-card--future',
            )
            const body = (
              <>
                <span className="flex items-center justify-between gap-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--accent)]">
                  <span className="flex min-w-0 items-start gap-2">
                    <meta.Icon
                      size={12}
                      strokeWidth={1.7}
                      className="mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="leading-5">
                      {item.period} · {meta.label}
                    </span>
                  </span>
                  {item.href ? (
                    external ? (
                      <ArrowUpRight size={13} aria-hidden="true" />
                    ) : (
                      <ArrowRight size={13} aria-hidden="true" />
                    )
                  ) : null}
                </span>
                <span className="mt-2 block font-display text-xl leading-snug">{item.title}</span>
                <span className="mt-2 block text-sm leading-6 text-[var(--text-soft)]">
                  {item.description}
                </span>
              </>
            )

            return (
              <li key={item.id} className={cn('journey-item', isFuture && 'journey-item--future')}>
                <span
                  ref={(node) => {
                    nodeRefs.current[index] = node
                  }}
                  data-milestone={item.id}
                  className={cn(
                    'journey-node',
                    isLit && 'journey-node--lit',
                    isFuture && 'journey-node--future',
                  )}
                  aria-hidden="true"
                >
                  <span className="journey-node__orbit" />
                  <span className="journey-node__star journey-node__star--one" />
                  <span className="journey-node__star journey-node__star--two" />
                  <span className="journey-node__star journey-node__star--three" />
                  <span className="journey-node__core" />
                </span>

                <div
                  className={cn(
                    'journey-card-shell',
                    even ? 'journey-card-shell--left' : 'journey-card-shell--right',
                  )}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer noopener' : undefined}
                      className={cardClassName}
                      onFocus={() => setFocusId(item.id)}
                      onBlur={() => setFocusId('')}
                      onMouseEnter={() => setFocusId(item.id)}
                      onMouseLeave={() => setFocusId('')}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={cardClassName}>{body}</div>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
