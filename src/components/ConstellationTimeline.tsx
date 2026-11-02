import { useEffect, useRef, useState } from 'react'
import { visibleMilestones } from '@/content/portfolio'
import { SectionHeading } from './SectionHeading'

const CATEGORY_LABEL: Record<string, string> = {
  education: 'Education',
  project: 'Project',
  opensource: 'Open source',
  learning: 'Learning',
}

export function ConstellationTimeline() {
  const listRef = useRef<HTMLOListElement>(null)
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([])
  const [path, setPath] = useState('')
  const [lit, setLit] = useState<string[]>([])
  const [focusId, setFocusId] = useState(visibleMilestones[0]?.id ?? '')

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
      if (points.length < 2) return
      const d = points
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
        .join(' ')
      setPath(d)
    }

    draw()
    const observer = new ResizeObserver(draw)
    observer.observe(list)
    window.addEventListener('resize', draw)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', draw)
    }
  }, [])

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
      { threshold: 0.45 },
    )
    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="journey" aria-labelledby="journey-heading">
      <div className="section-shell">
        <SectionHeading
          id="journey-heading"
          kicker="05 · Flight log"
          title="A constellation of real work"
          description="Only milestones with a public trail are shown. The path is drawn from the nodes themselves, so it stays coherent as the layout changes."
        />

        <ol ref={listRef} className="relative mt-16 space-y-8 lg:space-y-4">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <path
              d={path}
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.32"
              strokeWidth="1.2"
            />
          </svg>

          {visibleMilestones.map((item, index) => {
            const isLit = lit.includes(item.id) || focusId === item.id
            const even = index % 2 === 0
            const className = `relative z-10 rounded-2xl border p-5 text-left transition ${
              isLit
                ? 'border-[color-mix(in_srgb,var(--accent)_50%,var(--border))] bg-[color-mix(in_srgb,var(--surface)_80%,transparent)]'
                : 'border-[var(--border)] bg-[color-mix(in_srgb,var(--void)_40%,transparent)]'
            }`
            const body = (
              <>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--accent)]">
                  {item.period} · {CATEGORY_LABEL[item.category]}
                </span>
                <span className="mt-2 block font-display text-xl">{item.title}</span>
                <span className="mt-2 block text-sm leading-6 text-[var(--text-soft)]">
                  {item.description}
                </span>
              </>
            )
            const card = item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className={className}
                onFocus={() => setFocusId(item.id)}
                onMouseEnter={() => setFocusId(item.id)}
              >
                {body}
              </a>
            ) : (
              <button
                type="button"
                className={`${className} w-full`}
                onFocus={() => setFocusId(item.id)}
                onMouseEnter={() => setFocusId(item.id)}
              >
                {body}
              </button>
            )

            return (
              <li
                key={item.id}
                className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr]"
              >
                <div className={even ? 'hidden lg:block' : 'order-2 lg:order-none'}>
                  {even ? null : card}
                </div>
                <span
                  ref={(node) => {
                    nodeRefs.current[index] = node
                  }}
                  data-milestone={item.id}
                  className="relative z-10 mx-auto grid h-4 w-4 place-items-center rounded-full border border-[var(--accent)] bg-[var(--void)]"
                  aria-hidden="true"
                >
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--accent)]"
                    style={{ opacity: isLit ? 1 : 0.35 }}
                  />
                </span>
                <div className={even ? 'order-2 lg:order-none' : 'hidden lg:block'}>
                  {even ? card : null}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
