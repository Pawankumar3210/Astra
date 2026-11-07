import { useState } from 'react'
import {
  Binary,
  Boxes,
  Braces,
  Database,
  Server,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { portfolio } from '@/content/portfolio'
import { cn } from '@/lib/cn'
import { SectionHeading } from './SectionHeading'

const MODULE_ICONS: Record<string, LucideIcon> = {
  languages: Braces,
  frontend: Boxes,
  backend: Server,
  databases: Database,
  tools: Wrench,
  foundations: Binary,
  emerging: Sparkles,
}

export function TechStack() {
  const [active, setActive] = useState(portfolio.tech[0]?.id ?? '')
  const current = portfolio.tech.find((group) => group.id === active) ?? portfolio.tech[0]
  const currentIndex = portfolio.tech.findIndex((group) => group.id === current.id)
  const totalItems = portfolio.tech.reduce((total, group) => total + group.items.length, 0)

  return (
    <section id="stack" aria-labelledby="stack-heading">
      <div className="section-shell">
        <SectionHeading
          id="stack-heading"
          kicker="04 · Instrumentation"
          title="A practical stack, not a catalogue"
          description="Grouped by how I have used them, with the working context for each. Select a channel to inspect the tools and the work behind them. There are no invented skill meters here."
        />

        <div className="tech-console mt-12">
          <div className="tech-console__bar">
            <p className="tech-console__status">
              <span className="tech-console__pulse" aria-hidden="true" />
              Instrument bus online
            </p>
            <p className="tech-console__meta">
              {String(portfolio.tech.length).padStart(2, '0')} channels /{' '}
              {String(totalItems).padStart(2, '0')} tools
            </p>
          </div>

          <div className="tech-console__body">
            <div className="tech-console__rail" role="group" aria-label="Technology groups">
              {portfolio.tech.map((group, index) => {
                const Icon = MODULE_ICONS[group.id] ?? Boxes
                const isActive = group.id === current.id
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActive(group.id)}
                    className={cn('tech-console__tab', isActive && 'tech-console__tab--active')}
                    aria-pressed={isActive}
                    aria-controls="tech-module-panel"
                  >
                    <span className="tech-console__tab-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Icon size={14} strokeWidth={1.7} aria-hidden="true" />
                    <span className="tech-console__tab-label">{group.shortTitle}</span>
                    <span className="tech-console__tab-count" aria-hidden="true">
                      {String(group.items.length).padStart(2, '0')}
                    </span>
                  </button>
                )
              })}
            </div>

            <div
              id="tech-module-panel"
              className="tech-console__display"
              aria-live="polite"
              aria-atomic="true"
            >
              <div key={current.id} className="tech-console__content">
                <div className="tech-console__display-head">
                  <div>
                    <p className="tech-console__eyebrow">
                      Module {String(currentIndex + 1).padStart(2, '0')} / selected
                    </p>
                    <h3>{current.title}</h3>
                    <p className="tech-console__count">
                      {current.items.length} linked {current.items.length === 1 ? 'tool' : 'tools'}
                    </p>
                  </div>
                  <div className="tech-radar" aria-hidden="true">
                    <span className="tech-radar__sweep" />
                    <span className="tech-radar__dot tech-radar__dot--one" />
                    <span className="tech-radar__dot tech-radar__dot--two" />
                    <span className="tech-radar__core" />
                  </div>
                </div>

                <div className="tech-console__items">
                  {current.items.map((item, index) => (
                    <div key={item.name} className="tech-module">
                      <div className="tech-module__top">
                        <span className="tech-module__code">
                          CH-{String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="tech-module__status">
                          <span aria-hidden="true" />
                          linked
                        </span>
                      </div>
                      <p className="tech-module__name">{item.name}</p>
                      <p className="tech-module__context">{item.context}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
