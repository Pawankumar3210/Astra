import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/content/portfolio'
import { cn } from '@/lib/cn'

type ProjectCardProps = {
  project: Project
  featured?: boolean
  onOpen: (project: Project) => void
}

const POSTER: Record<Project['visual']['accent'], string> = {
  cyan: 'poster-cyan',
  violet: 'poster-violet',
  aurora: 'poster-aurora',
}

function MissionPoster({ project }: { project: Project }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[1.1rem] border border-[var(--border)]',
        POSTER[project.visual.accent],
      )}
    >
      <div className="absolute inset-0 orbital-grid opacity-40" aria-hidden="true" />
      <div className="relative aspect-[16/10] p-5 sm:p-6">
        <p className="font-mono text-[0.65rem] tracking-[0.22em] text-[var(--accent)] uppercase">
          {project.visual.code}
        </p>
        <p className="mt-8 font-display text-3xl tracking-tight sm:text-4xl">{project.title}</p>
        <p className="mt-3 max-w-sm text-sm text-[var(--text-soft)]">{project.shortDescription}</p>
        <p className="absolute bottom-4 right-5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--text-soft)]">
          {project.visual.caption}
        </p>
      </div>
    </div>
  )
}

export function ProjectCard({ project, featured = false, onOpen }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group rounded-[1.5rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_55%,transparent)] p-3 transition duration-300',
        'hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--border))] hover:shadow-[var(--shadow)] motion-safe:hover:-translate-y-1',
        featured && 'lg:h-full lg:p-4',
      )}
    >
      {project.screenshot ? (
        <img
          src={project.screenshot}
          alt={`${project.title} preview`}
          width={1200}
          height={750}
          loading="lazy"
          className="aspect-[16/10] w-full rounded-[1.1rem] object-cover transition duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <MissionPoster project={project} />
      )}

      <div className="px-3 pb-3 pt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--accent)]">
            {project.missionId}
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--text-soft)]">
            {project.liveUrl ? 'Live demo' : 'Repository'}
          </p>
        </div>
        <h3 className="mt-3 font-display text-2xl tracking-tight">{project.title}</h3>
        <p className="mt-2 text-[var(--text-soft)]">{project.shortDescription}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 5 : 4).map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary !min-h-10" onClick={() => onOpen(project)}>
            Open mission file
            <ArrowUpRight size={16} />
          </button>
          {project.repositoryUrl ? (
            <a
              className="btn btn-ghost !min-h-10"
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Repository
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
