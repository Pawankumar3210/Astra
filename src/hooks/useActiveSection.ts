import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))

    if (!elements.length) return

    let frame = 0

    const update = () => {
      frame = 0
      const header = document.querySelector('header')
      const headerBar = header?.firstElementChild
      const headerHeight = headerBar instanceof HTMLElement ? headerBar.offsetHeight : 72
      const readingLine =
        window.scrollY + headerHeight + (window.innerHeight - headerHeight) * 0.28
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let current = elements[0].id

      if (atBottom) {
        current = elements[elements.length - 1].id
      } else {
        for (const element of elements) {
          const top = window.scrollY + element.getBoundingClientRect().top
          if (top > readingLine) break
          current = element.id
        }
      }

      setActive((previous) => (previous === current ? previous : current))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
