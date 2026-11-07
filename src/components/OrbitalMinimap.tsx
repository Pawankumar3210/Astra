import { useMemo } from 'react'
import { portfolio } from '@/content/portfolio'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/cn'

export function OrbitalMinimap() {
  const ids = useMemo(() => portfolio.nav.map((item) => item.id), [])
  const active = useActiveSection(ids)

  return (
    <nav className="orbital-map" aria-label="Section orbital map">
      <span className="orbital-map__track" aria-hidden="true" />
      <span className="orbital-map__caption" aria-hidden="true">
        Orbit
      </span>
      {portfolio.nav.map((item, index) => {
        const isActive = active === item.id
        return (
          <a
            key={item.id}
            href={item.href}
            className={cn('orbital-map__link', isActive && 'orbital-map__link--active')}
            aria-label={`Go to ${item.label}`}
            aria-current={isActive ? 'location' : undefined}
          >
            <span className="orbital-map__node" aria-hidden="true">
              <span className="orbital-map__number">
                {String(index + 1).padStart(2, '0')}
              </span>
            </span>
            <span className="orbital-map__label">{item.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
