import { TerminalSquare } from 'lucide-react'
import { portfolio, publicContact } from '@/content/portfolio'

type FooterProps = {
  onOpenTerminal: () => void
}

export function Footer({ onOpenTerminal }: FooterProps) {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex w-[min(1180px,calc(100%-1.5rem))] flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-xl tracking-[0.24em]">ASTRA</p>
          <p className="mt-2 italic text-[var(--text-soft)]">{portfolio.motto}</p>
          <p className="mt-4 font-mono text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} {portfolio.owner.name}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#home" className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-soft)]">
            Home
          </a>
          <a href="#projects" className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-soft)]">
            Projects
          </a>
          {publicContact.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-soft)]"
              target="_blank"
              rel="noreferrer noopener"
            >
              {channel.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenTerminal}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--accent)]"
            aria-label={`Open developer terminal (${portfolio.terminalShortcut})`}
            title={`Open developer terminal (${portfolio.terminalShortcut})`}
          >
            <TerminalSquare size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
