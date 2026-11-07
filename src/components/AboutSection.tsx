import { TerminalSquare } from 'lucide-react'
import { portfolio } from '@/content/portfolio'
import { NowPanel } from './NowPanel'
import { SectionHeading } from './SectionHeading'

type AboutSectionProps = {
  onOpenTerminal: () => void
}

export function AboutSection({ onOpenTerminal }: AboutSectionProps) {
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

          <aside className="terminal-card relative isolate overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#071018] text-[#d7efe4] shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <p className="font-mono text-xs tracking-[0.18em] text-[#5dffb1]">ASTRA / DEV</p>
              <span className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#9ab7a8]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5dffb1]" aria-hidden="true" />
                ready
              </span>
            </div>

            <div className="px-5 py-5 font-mono text-[0.8rem] leading-7">
              <p>
                <span className="text-[#5dffb1]">visitor@astra:~$</span>{' '}
                <span className="text-[#f3f7f5]">whoami</span>
              </p>
              <p className="text-[#b9d8f8]">
                {portfolio.owner.name} · {portfolio.owner.title}
              </p>
              <p className="mt-3">
                <span className="text-[#5dffb1]">visitor@astra:~$</span>{' '}
                <span className="text-[#f3f7f5]">ls missions</span>
              </p>
              <p className="flex flex-wrap gap-x-3 text-[#b9d8f8]">
                {portfolio.projects.map((project) => (
                  <span key={project.id}>{project.id}</span>
                ))}
              </p>
              <p className="mt-3">
                <span className="text-[#5dffb1]">visitor@astra:~$</span>{' '}
                <span className="text-[#f3f7f5]">cat motto</span>
              </p>
              <p className="text-[#b9d8f8]">{portfolio.motto}</p>
              <p className="mt-3">
                <span className="text-[#5dffb1]">visitor@astra:~$</span>{' '}
                <span className="terminal-cursor" aria-hidden="true" />
              </p>
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <button
                type="button"
                onClick={onOpenTerminal}
                aria-keyshortcuts="Control+J Meta+J"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#5dffb1] px-4 font-mono text-sm font-medium text-[#071018] transition-colors hover:bg-[#8affc8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5dffb1]"
              >
                <TerminalSquare size={16} aria-hidden="true" />
                Launch terminal
              </button>
              <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[#9ab7a8]">
                or press {portfolio.terminalShortcut}
              </p>
            </div>
          </aside>
        </div>
        <NowPanel />
      </div>
    </section>
  )
}
