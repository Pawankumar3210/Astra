import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import type { Project } from '@/content/portfolio'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
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
        'relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[1.1rem] border border-[var(--border)] p-5 sm:p-6',
        POSTER[project.visual.accent],
      )}
    >
      <div className="absolute inset-0 orbital-grid opacity-40" aria-hidden="true" />
      <p className="relative font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--accent)]">
        {project.visual.code}
      </p>
      <div className="relative mt-10">
        <p className="font-display text-3xl tracking-tight sm:text-4xl">{project.title}</p>
        <p className="mt-3 max-w-sm text-sm text-[var(--text-soft)]">{project.shortDescription}</p>
      </div>
      <p className="relative mt-8 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--text-soft)]">
        {project.visual.caption}
      </p>
    </div>
  )
}

export function ProjectCard({ project, featured = false, onOpen }: ProjectCardProps) {
  const reduced = usePrefersReducedMotion()
  const cardRef = useRef<HTMLElement>(null)

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== 'mouse') return
    const card = event.currentTarget
    const box = card.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width
    const y = (event.clientY - box.top) / box.height
    card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`)
    card.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`)
  }

  const resetTilt = () => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <article
      ref={cardRef}
      className={cn(
        'project-tilt group relative rounded-[1.5rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_55%,transparent)] p-3 transition duration-300',
        'hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--border))] hover:shadow-[var(--shadow)] focus-within:border-[color-mix(in_srgb,var(--accent)_55%,var(--border))]',
        featured && 'lg:grid lg:grid-cols-[1.06fr_0.94fr] lg:items-stretch lg:p-4',
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onBlur={resetTilt}
    >
      <div
        className={cn(
          'relative isolate overflow-hidden rounded-[1.1rem] bg-[var(--navy)]',
          featured && 'lg:min-h-[390px]',
        )}
      >
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={`${project.title} interface preview`}
            width={1200}
            height={750}
            loading="lazy"
            decoding="async"
            className={cn(
              'aspect-[16/10] w-full object-cover object-top transition duration-700 ease-out motion-safe:group-hover:scale-[1.018]',
              featured && 'lg:aspect-auto lg:h-full',
            )}
          />
        ) : (
          <MissionPoster project={project} />
        )}
        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-3">
          <span className="mission-badge">{project.missionId}</span>
          <span className="mission-badge">
            {project.liveUrl ? (
              <>
                <span className="mission-badge__dot" aria-hidden="true" />
                Live demo
              </>
            ) : (
              'Repository'
            )}
          </span>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(3,7,16,0.55)] to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className={cn('px-3 pb-3 pt-5', featured && 'lg:flex lg:flex-col lg:justify-center lg:px-8 lg:py-6')}>
        <h3 className={cn('font-display text-2xl tracking-tight', featured && 'lg:text-3xl')}>
          {project.title}
        </h3>
        <p className="mt-2 max-w-md text-[var(--text-soft)]">{project.shortDescription}</p>
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
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          {project.liveUrl ? (
            <a
              className="btn btn-ghost !min-h-10"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Live site
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : project.repositoryUrl ? (
            <a
              className="btn btn-ghost !min-h-10"
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Repository
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
