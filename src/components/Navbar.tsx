import { useEffect, useId, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { portfolio } from '@/content/portfolio'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/cn'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const ids = portfolio.nav.map((item) => item.id)
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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background,border,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--void)_78%,transparent)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-[var(--header-h)] w-[min(1180px,calc(100%-1.5rem))] items-center justify-between gap-4">
        <a href="#home" className="font-display text-lg tracking-[0.28em] text-[var(--text)]">
          ASTRA
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {portfolio.nav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="relative font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--text-soft)] transition-colors hover:text-[var(--text)]"
              aria-current={active === item.id ? 'location' : undefined}
            >
              {item.label}
              {active === item.id ? <span className="nav-indicator" aria-hidden="true" /> : null}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="btn btn-ghost hidden !min-h-9 !px-3 !text-sm sm:inline-flex"
          >
            Collaborate
          </a>
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
          className="glass mx-3 mb-3 rounded-2xl p-4 lg:hidden"
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
