import { useEffect } from 'react'

const HEADER_GAP = 16
const ARRIVAL_DURATION = 1200

export function useSmoothAnchorNavigation() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return

      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return

      let destination: Element | null = null
      try {
        destination = document.querySelector(hash)
      } catch {
        return
      }
      if (!(destination instanceof HTMLElement)) return

      const header = document.querySelector('header')
      const headerBar = header?.firstElementChild
      const headerHeight = headerBar instanceof HTMLElement ? headerBar.offsetHeight : 72
      const isPageTop = hash === '#home' || hash === '#main-content'
      const shell = destination.querySelector<HTMLElement>(':scope > .section-shell')
      const shellPadding = shell ? Number.parseFloat(getComputedStyle(shell).paddingTop) || 0 : 0
      const contentTop = shell
        ? shell.getBoundingClientRect().top + shellPadding
        : destination.getBoundingClientRect().top
      const top = isPageTop
        ? 0
        : Math.max(0, window.scrollY + contentTop - headerHeight - HEADER_GAP)

      event.preventDefault()
      window.history.pushState(null, '', hash)

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
      if (destination.hasAttribute('tabindex')) {
        destination.focus({ preventScroll: true })
      }

      const arrivalTarget = shell ?? destination
      if (destination.tagName === 'SECTION') {
        arrivalTarget.classList.remove('section-arrival')
        void arrivalTarget.offsetWidth
        arrivalTarget.classList.add('section-arrival')
        window.setTimeout(() => arrivalTarget.classList.remove('section-arrival'), ARRIVAL_DURATION)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
