import { portfolio } from '@/content/portfolio'

export function NowPanel() {
  return (
    <section className="now-panel mt-16" aria-labelledby="now-heading">
      <div className="now-panel__header">
        <span className="now-panel__pulse" aria-hidden="true" />
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--accent)]">
            Now · updated {portfolio.now.updated}
          </p>
          <h3 id="now-heading" className="mt-1 font-display text-2xl tracking-tight">
            Currently in orbit
          </h3>
        </div>
        <span className="now-panel__badge">Live focus</span>
      </div>
      <ul className="now-panel__grid">
        {portfolio.now.items.map((item, index) => (
          <li key={item.label} className="now-panel__item">
            <span className="now-panel__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="font-display text-lg text-[var(--text)]">{item.label}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--text-soft)]">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
