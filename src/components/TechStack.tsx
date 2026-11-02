import { useState } from 'react'
import { portfolio } from '@/content/portfolio'
import { SectionHeading } from './SectionHeading'

export function TechStack() {
  const [active, setActive] = useState(portfolio.tech[0]?.id ?? '')
  const current = portfolio.tech.find((group) => group.id === active) ?? portfolio.tech[0]

  return (
    <section id="stack" aria-labelledby="stack-heading">
      <div className="section-shell">
        <SectionHeading
          id="stack-heading"
          kicker="04 · Instrumentation"
          title="A practical stack, not a catalogue"
          description="Grouped by how I actually use them. Hover or focus a label for the context. There are no invented skill meters here."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-wrap gap-2 lg:flex-col">
            {portfolio.tech.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setActive(group.id)}
                className="rounded-full border border-[var(--border)] px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.16em] transition"
                style={{
                  background:
                    group.id === active
                      ? 'color-mix(in srgb, var(--accent) 14%, transparent)'
                      : 'transparent',
                  color: group.id === active ? 'var(--accent)' : 'var(--text-soft)',
                }}
                aria-pressed={group.id === active}
              >
                {group.title}
              </button>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[1.6rem] border border-[var(--border)] p-6 sm:p-8">
            <div className="orbital-grid absolute inset-0 opacity-40" aria-hidden="true" />
            <h3 className="relative mb-2 font-display text-2xl">{current.title}</h3>
            <ul>
            {current.items.map((item) => (
              <li
                key={item.name}
                className="group relative border-t border-[var(--border)] py-4"
              >
                <p className="font-display text-lg">{item.name}</p>
                <p className="mt-1 text-sm text-[var(--text-soft)] transition group-hover:text-[var(--text)] group-focus-within:text-[var(--text)]">
                  {item.context}
                </p>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
