import { portfolio } from '@/content/portfolio'
import { SectionHeading } from './SectionHeading'

export function AboutSection() {
  return (
    <section id="about" className="relative" aria-labelledby="about-heading">
      <div className="section-shell">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading
              id="about-heading"
              kicker="02 · Explorer"
              title="A person behind the interface"
            />
            <div className="mt-8 space-y-5 text-[1.05rem] leading-7 text-[var(--text-soft)]">
              {portfolio.owner.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {portfolio.owner.identityLabels.map((item) => (
                <li key={item.label} className="chip" title={item.detail}>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <aside className="relative isolate overflow-hidden rounded-[1.6rem] border border-[var(--border)] p-8">
            <div className="orbital-grid absolute inset-0 opacity-70" aria-hidden="true" />
            <svg
              viewBox="0 0 240 240"
              className="relative mx-auto w-full max-w-sm text-[var(--accent)]"
              aria-hidden="true"
            >
              <circle cx="120" cy="120" r="92" fill="none" stroke="currentColor" strokeOpacity="0.18" />
              <circle cx="120" cy="120" r="58" fill="none" stroke="currentColor" strokeOpacity="0.28" />
              <ellipse
                cx="120"
                cy="120"
                rx="110"
                ry="36"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.35"
                transform="rotate(-18 120 120)"
              />
              <circle cx="214" cy="86" r="4" fill="currentColor" />
              <circle cx="120" cy="120" r="6" fill="currentColor" />
            </svg>
            <p className="relative font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--accent)]">
              Orbital dossier
            </p>
            <dl className="relative mt-4 grid gap-4 font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-soft)]">
              <div className="flex justify-between gap-4">
                <dt>Subject</dt>
                <dd className="text-[var(--text)]">{portfolio.owner.shortName}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Vector</dt>
                <dd className="text-[var(--text)]">{portfolio.owner.title}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Motto</dt>
                <dd className="text-[var(--accent)]">{portfolio.motto}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  )
}
