import { TerminalSquare } from 'lucide-react'
import { portfolio, publicContact } from '@/content/portfolio'

const YEAR = new Date().getFullYear()

type FooterProps = {
  onOpenTerminal: () => void
}

export function Footer({ onOpenTerminal }: FooterProps) {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex w-[min(1180px,calc(100%-1.5rem))] flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs text-[var(--muted)]">
            © {YEAR} {portfolio.owner.name}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#home"
            className="footer-link"
          >
            Home
          </a>
          <a
            href="#projects"
            className="footer-link"
          >
            Projects
          </a>
          {publicContact.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              className="footer-link"
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noreferrer noopener' : undefined}
            >
              {channel.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenTerminal}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--border)] px-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--accent)] transition hover:border-[var(--accent)]"
            aria-keyshortcuts="Control+J Meta+J"
            aria-label={`Open developer terminal (${portfolio.terminalShortcut})`}
            title={`Open developer terminal (${portfolio.terminalShortcut})`}
          >
            <TerminalSquare size={15} aria-hidden="true" />
            Terminal
          </button>
        </div>
      </div>
    </footer>
  )
}
