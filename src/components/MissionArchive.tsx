import { useState } from 'react'
import { portfolio, type Project } from '@/content/portfolio'
import { ProjectCard } from './ProjectCard'
import { ProjectDetails } from './ProjectDetails'
import { SectionHeading } from './SectionHeading'

export function MissionArchive() {
  const [selected, setSelected] = useState<Project | null>(null)
  const featured = portfolio.projects.find((project) => project.featured) ?? portfolio.projects[0]
  const rest = portfolio.projects.filter((project) => project.id !== featured.id)

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
          <div className="lg:row-span-2">
            <ProjectCard project={featured} featured onOpen={setSelected} />
          </div>
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
          ))}
        </div>
      </div>
      <ProjectDetails project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
