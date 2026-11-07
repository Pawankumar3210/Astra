import { useCallback, useEffect, useRef, useState } from 'react'
import { portfolio, type Project } from '@/content/portfolio'
import { ProjectCard } from './ProjectCard'
import { ProjectDetails } from './ProjectDetails'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function MissionArchive() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [closing, setClosing] = useState(false)
  const closeTimer = useRef<number | null>(null)
  const closingRef = useRef(false)
  const featured = portfolio.projects.find((project) => project.featured) ?? portfolio.projects[0]
  const rest = portfolio.projects.filter((project) => project.id !== featured.id)

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const handleOpen = useCallback(
    (project: Project) => {
      clearCloseTimer()
      closingRef.current = false
      setClosing(false)
      setSelected(project)
    },
    [clearCloseTimer],
  )

  const handleClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    setClosing(true)
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300
    closeTimer.current = window.setTimeout(() => {
      setSelected(null)
      setClosing(false)
      closingRef.current = false
      closeTimer.current = null
    }, duration)
  }, [])

  useEffect(() => {
    const onOpenProject = (event: Event) => {
      const id = (event as CustomEvent<string>).detail
      const project = portfolio.projects.find((item) => item.id === id)
      if (project) handleOpen(project)
    }
    window.addEventListener('astra:open-project', onOpenProject)
    return () => window.removeEventListener('astra:open-project', onOpenProject)
  }, [handleOpen])

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer])

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="section-shell">
        <SectionHeading
          id="projects-heading"
          kicker="03 · Mission archive"
          title="Projects as missions"
          description="Each card is a mission file: the problem, the approach, and the public trail of the work. Open a file for the longer brief."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal className="lg:col-span-2">
            <ProjectCard project={featured} featured onOpen={handleOpen} />
          </Reveal>
          {rest.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <ProjectCard project={project} onOpen={handleOpen} />
            </Reveal>
          ))}
        </div>
      </div>
      <ProjectDetails project={selected} closing={closing} onClose={handleClose} />
    </section>
  )
}
