import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowRight,
  Command,
  Cpu,
  Download,
  ExternalLink,
  Folder,
  Home,
  Mail,
  Moon,
  Orbit,
  Search,
  Send,
  Sparkles,
  Sun,
  TerminalSquare,
  User,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { portfolio, publicContact, type Project } from '@/content/portfolio'
import { useTheme } from '@/context/theme'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { cn } from '@/lib/cn'

const NAVIGATE_ICONS: Record<string, LucideIcon> = {
  home: Home,
  about: User,
  projects: Folder,
  stack: Cpu,
  journey: Orbit,
  trajectory: Send,
  contact: Mail,
}

type CommandItem = {
  id: string
  label: string
  group: string
  hint: string
  keywords?: string[]
  Icon: LucideIcon
  secret?: boolean
  run: () => void | Promise<void>
}

type CommandPaletteProps = {
  open: boolean
  onOpen: () => void
  onClose: () => void
  onOpenTerminal: () => void
}

function navigateTo(hash: string) {
  const anchor = document.querySelector<HTMLAnchorElement>(`a[href="${hash}"]`)
  if (anchor) {
    anchor.click()
    return
  }
  window.location.hash = hash
}

function openExternal(href: string) {
  window.open(href, '_blank', 'noopener,noreferrer')
}

export function CommandPalette({
  open,
  onOpen,
  onClose,
  onOpenTerminal,
}: CommandPaletteProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat) return
      const isCommandShortcut =
        (event.ctrlKey || event.metaKey) &&
        !event.altKey &&
        (event.code === 'KeyK' || event.key.toLowerCase() === 'k')
      if (isCommandShortcut) {
        event.preventDefault()
        event.stopPropagation()
        if (open) onClose()
        else onOpen()
        return
      }
      if (event.key === 'Escape' && open) {
        event.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey, { capture: true })
    return () => window.removeEventListener('keydown', onKey, { capture: true })
  }, [onClose, onOpen, open])

  if (!open) return null

  return <CommandPaletteDialog onClose={onClose} onOpenTerminal={onOpenTerminal} />
}

type CommandPaletteDialogProps = Pick<CommandPaletteProps, 'onClose' | 'onOpenTerminal'>

function CommandPaletteDialog({ onClose, onOpenTerminal }: CommandPaletteDialogProps) {
  const { theme, toggleTheme } = useTheme()
  const uid = useId().replace(/:/g, '')
  const titleId = `command-title-${uid}`
  const inputId = `command-input-${uid}`
  const resultsId = `command-results-${uid}`
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  useBodyScrollLock(true)
  useFocusTrap(true, panelRef)

  const openProject = useCallback(
    (project: Project) => {
      onClose()
      navigateTo('#projects')
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent('astra:open-project', { detail: project.id }))
      }, 420)
    },
    [onClose],
  )

  const commands = useMemo<CommandItem[]>(() => {
    const sections = portfolio.nav.map((item) => ({
      id: `nav-${item.id}`,
      label: `Go to ${item.label}`,
      group: 'Navigate',
      hint: 'Section',
      keywords: ['navigate', 'section', item.label.toLowerCase()],
      Icon: NAVIGATE_ICONS[item.id] ?? ArrowRight,
      run: () => {
        onClose()
        navigateTo(item.href)
      },
    }))

    const projects = portfolio.projects.map((project) => ({
      id: `project-${project.id}`,
      label: project.title,
      group: 'Mission archive',
      hint: 'Open project file',
      keywords: ['project', 'mission', ...project.technologies.map((tech) => tech.toLowerCase())],
      Icon: Folder,
      run: () => openProject(project),
    }))

    const github = publicContact.find((channel) => channel.id === 'github')
    const linkedin = publicContact.find((channel) => channel.id === 'linkedin')
    const email = publicContact.find((channel) => channel.id === 'email')

    return [
      ...sections,
      ...projects,
      {
        id: 'action-terminal',
        label: 'Open developer terminal',
        group: 'Actions',
        hint: portfolio.terminalShortcut,
        keywords: ['shell', 'console', 'command'],
        Icon: TerminalSquare,
        run: () => {
          onClose()
          window.setTimeout(() => onOpenTerminal(), 0)
        },
      },
      {
        id: 'action-theme',
        label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
        group: 'Actions',
        hint: 'Theme',
        keywords: ['color', 'appearance', 'dark', 'light'],
        Icon: theme === 'dark' ? Sun : Moon,
        run: toggleTheme,
      },
      {
        id: 'action-resume',
        label: 'Download résumé',
        group: 'Actions',
        hint: 'PDF',
        keywords: ['cv', 'resume', 'download'],
        Icon: Download,
        run: () => {
          const anchor = document.createElement('a')
          anchor.href = portfolio.resumeUrl
          anchor.download = ''
          anchor.click()
        },
      },
      {
        id: 'action-github',
        label: 'Open GitHub profile',
        group: 'Profiles',
        hint: 'External',
        keywords: ['code', 'repository'],
        Icon: ExternalLink,
        run: () => {
          if (github) openExternal(github.href)
        },
      },
      {
        id: 'action-linkedin',
        label: 'Open LinkedIn profile',
        group: 'Profiles',
        hint: 'External',
        keywords: ['professional', 'network'],
        Icon: ExternalLink,
        run: () => {
          if (linkedin) openExternal(linkedin.href)
        },
      },
      {
        id: 'action-email',
        label: 'Email Pawan',
        group: 'Profiles',
        hint: 'Mail app',
        keywords: ['contact', 'message'],
        Icon: Mail,
        run: () => {
          if (email) window.location.href = email.href
        },
      },
      {
        id: 'secret-warp',
        label: 'Engage warp drive',
        group: 'Secret',
        hint: 'Easter egg',
        keywords: ['warp', 'konami', 'orbit', 'secret', 'easter egg'],
        Icon: Zap,
        secret: true,
        run: () => {
          window.dispatchEvent(new CustomEvent('astra:warp'))
        },
      },
    ]
  }, [onClose, onOpenTerminal, openProject, theme, toggleTheme])

  const normalizedQuery = query.trim().toLowerCase()
  const filtered = useMemo(
    () =>
      commands.filter((command) => {
        if (command.secret && !normalizedQuery) return false
        if (!normalizedQuery) return true
        const haystack = [
          command.label,
          command.group,
          command.hint,
          ...(command.keywords ?? []),
        ]
          .join(' ')
          .toLowerCase()
        return haystack.includes(normalizedQuery)
      }),
    [commands, normalizedQuery],
  )

  const activeCommand = filtered[Math.min(activeIndex, Math.max(filtered.length - 1, 0))]
  const activeOptionId = activeCommand ? `command-${uid}-${activeCommand.id}` : undefined

  const runCommand = useCallback(
    (command: CommandItem | undefined) => {
      if (!command) return
      onClose()
      void command.run()
    },
    [onClose],
  )

  useEffect(() => {
    if (!activeOptionId) return
    document.getElementById(activeOptionId)?.scrollIntoView({ block: 'nearest' })
  }, [activeOptionId])

  useEffect(() => {
    lastFocus.current = document.activeElement as HTMLElement
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40)
    return () => {
      window.clearTimeout(timer)
      lastFocus.current?.focus()
    }
  }, [])

  return createPortal(
    <div
      className="command-overlay fixed inset-0 z-[60] grid place-items-start overflow-y-auto bg-[rgba(2,7,12,0.84)] p-3 pt-[10vh] sm:place-items-center sm:pt-0"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="command-palette w-full max-w-xl overflow-hidden rounded-[1.4rem] border border-[var(--border)] shadow-[0_36px_110px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3 sm:px-5">
          <Command size={16} className="shrink-0 text-[var(--accent)]" aria-hidden="true" />
          <p id={titleId} className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--text-soft)]">
            ASTRA // command
          </p>
          <span className="ml-auto font-mono text-[0.62rem] text-[var(--muted)]">
            {portfolio.paletteShortcut}
          </span>
        </div>

        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3 sm:px-5">
          <Search size={18} className="shrink-0 text-[var(--muted)]" aria-hidden="true" />
          <label htmlFor={inputId} className="sr-only">
            Search commands
          </label>
          <input
            id={inputId}
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                setActiveIndex((current) =>
                  filtered.length ? (current + 1) % filtered.length : 0,
                )
              } else if (event.key === 'ArrowUp') {
                event.preventDefault()
                setActiveIndex((current) =>
                  filtered.length
                    ? (current - 1 + filtered.length) % filtered.length
                    : 0,
                )
              } else if (event.key === 'Home') {
                event.preventDefault()
                setActiveIndex(0)
              } else if (event.key === 'End') {
                event.preventDefault()
                setActiveIndex(Math.max(filtered.length - 1, 0))
              } else if (event.key === 'Enter') {
                event.preventDefault()
                runCommand(activeCommand)
              }
            }}
            role="combobox"
            aria-expanded="true"
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-controls={resultsId}
            aria-activedescendant={activeOptionId}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Search sections, projects, or actions…"
            className="min-w-0 flex-1 bg-transparent text-[0.98rem] text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
          />
          <kbd className="command-kbd">esc</kbd>
        </div>

        <ul
          id={resultsId}
          role="listbox"
          aria-label="Commands"
          className="max-h-[min(27rem,55svh)] overflow-y-auto p-2"
        >
          {filtered.length ? (
            filtered.map((command, index) => {
              const isActive = activeCommand?.id === command.id
              return (
                <li
                  key={command.id}
                  id={`command-${uid}-${command.id}`}
                  role="option"
                  aria-selected={isActive}
                  className={cn('command-item', isActive && 'command-item--active')}
                  onMouseMove={() => setActiveIndex(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => runCommand(command)}
                >
                  <span className="command-item__icon" aria-hidden="true">
                    <command.Icon size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.92rem] text-[var(--text)]">
                      {command.label}
                    </span>
                    <span className="block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                      {command.group}
                    </span>
                  </span>
                  <span className="command-item__hint">{command.hint}</span>
                  <ArrowRight
                    size={14}
                    className={cn('shrink-0 text-[var(--muted)]', isActive && 'text-[var(--accent)]')}
                    aria-hidden="true"
                  />
                </li>
              )
            })
          ) : (
            <li className="px-4 py-10 text-center text-sm text-[var(--muted)]" role="presentation">
              No signal matches “{query.trim()}”. Try a section, project, or action.
            </li>
          )}
        </ul>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--border)] px-4 py-2.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[var(--muted)] sm:px-5">
          <span><kbd className="command-kbd">↑↓</kbd> navigate</span>
          <span><kbd className="command-kbd">↵</kbd> open</span>
          <span><kbd className="command-kbd">esc</kbd> close</span>
          <span className="ml-auto flex items-center gap-1 text-[var(--accent)]">
            <Sparkles size={12} aria-hidden="true" />
            signal-ready
          </span>
        </div>
      </div>
    </div>,
    document.body,
  )
}
