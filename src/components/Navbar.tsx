import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { portfolio } from '@/content/portfolio'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { cn } from '@/lib/cn'
import { ThemeToggle } from './ThemeToggle'

type NavbarProps = {
  onOpenPalette: () => void
}

export function Navbar({ onOpenPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const ids = useMemo(() => portfolio.nav.map((item) => item.id), [])
  const active = useActiveSection(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  useBodyScrollLock(open)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background,border,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--void)_78%,transparent)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-[var(--header-h)] w-[min(1180px,calc(100%-1.5rem))] items-center gap-4">
        <div className="hidden flex-1 lg:block" aria-hidden="true" />
        <nav className="hidden items-center gap-1.5 lg:flex xl:gap-2" aria-label="Primary">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn('nav-link', active === item.id && 'nav-link--active')}
              aria-current={active === item.id ? 'location' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-2">
          <span className="hidden sm:block">
            <a href="#contact" className="btn btn-ghost !min-h-9 !px-3 !text-sm">
              Collaborate
            </a>
          </span>
          <button
            type="button"
            className="command-trigger grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--text-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            aria-keyshortcuts="Control+K Meta+K"
            title={`Command palette (${portfolio.paletteShortcut})`}
          >
            <Search size={17} aria-hidden="true" />
          </button>
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          ref={panelRef}
          id={menuId}
          className="mobile-menu glass mx-3 mb-3 max-h-[calc(100svh-var(--header-h)-1.5rem)] overflow-y-auto rounded-2xl p-4 lg:hidden"
        >
          <nav className="grid gap-1" aria-label="Mobile">
            {portfolio.nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  'rounded-xl px-3 py-3 font-mono text-sm uppercase tracking-[0.16em]',
                  active === item.id
                    ? 'bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]'
                    : 'text-[var(--text-soft)]',
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn-primary mt-2"
              onClick={() => setOpen(false)}
            >
              Collaborate
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
