import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '@/content/portfolio'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useFocusTrap } from '@/hooks/useFocusTrap'

type ProjectDetailsProps = {
  project: Project | null
  closing: boolean
  onClose: () => void
}

export function ProjectDetails({ project, closing, onClose }: ProjectDetailsProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  useBodyScrollLock(Boolean(project))
  useFocusTrap(Boolean(project), dialogRef)

  useEffect(() => {
    if (!project) return
    lastFocus.current = document.activeElement as HTMLElement
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      lastFocus.current?.focus()
    }
  }, [project, onClose])

  useEffect(() => {
    if (project) closeRef.current?.focus()
  }, [project])

  if (!project) return null

  return createPortal(
    <div
      className={`mission-overlay fixed inset-0 z-50 grid place-items-end bg-[color-mix(in_srgb,var(--void)_68%,transparent)] p-3 sm:place-items-center${closing ? ' mission-overlay--closing' : ''}`}
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mission-title"
        className="mission-dialog glass max-h-[92svh] w-full max-w-2xl overflow-auto rounded-[1.6rem] p-6 shadow-[var(--shadow)] sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="kicker">{project.missionId}</p>
            <h2 id="mission-title" className="mt-3 font-display text-3xl tracking-tight">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="mission-dialog__close grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--border)] transition hover:border-[var(--accent)]"
            onClick={onClose}
            aria-label="Close project details"
          >
            <X size={16} />
          </button>
        </div>

        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={`${project.title} interface preview`}
            width={1200}
            height={750}
            loading="lazy"
            decoding="async"
            className="mt-6 aspect-[16/10] w-full rounded-xl border border-[var(--border)] object-cover object-top"
          />
        ) : null}

        <div className="mt-8">
          <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--accent)]">
            Architecture
          </h3>
          <ol className="project-schematic mt-3" aria-label={`${project.title} architecture`}>
            {project.architecture.map((node, index) => (
              <li key={`${node.label}-${index}`} className="project-schematic__node">
                <span className="project-schematic__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="project-schematic__label">{node.label}</span>
                <span className="project-schematic__detail">{node.detail}</span>
              </li>
            ))}
          </ol>
        </div>

        <dl className="mt-8 grid gap-6 text-sm leading-6">
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--accent)]">
              Overview
            </dt>
            <dd className="mt-2 text-[var(--text-soft)]">{project.shortDescription}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--accent)]">
              Problem
            </dt>
            <dd className="mt-2 text-[var(--text-soft)]">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--accent)]">
              Solution
            </dt>
            <dd className="mt-2 text-[var(--text-soft)]">{project.solution}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--accent)]">
              Role
            </dt>
            <dd className="mt-2 text-[var(--text-soft)]">{project.role}</dd>
          </div>
        </dl>

        <h3 className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--accent)]">
          Features
        </h3>
        <ul className="mt-3 grid gap-2 text-[var(--text-soft)]">
          {project.features.map((feature) => (
            <li key={feature} className="pl-4 before:mr-2 before:text-[var(--accent)] before:content-['▹']">
              {feature}
            </li>
          ))}
        </ul>

        {project.contributions.length ? (
          <>
            <h3 className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--accent)]">
              Contributions
            </h3>
            <ul className="mt-3 grid gap-2 text-[var(--text-soft)]">
              {project.contributions.map((item) => (
                <li
                  key={item.label}
                  className="pl-4 before:mr-2 before:text-[var(--accent)] before:content-['▹']"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 border-b border-transparent transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      {item.label}
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              className="btn btn-primary"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Live demo
            </a>
          ) : null}
          {project.repositoryUrl ? (
            <a
              className="btn btn-ghost"
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Repository
            </a>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  )
}
