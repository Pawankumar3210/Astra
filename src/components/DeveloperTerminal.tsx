import { useEffect, useId, useRef, useState, type FormEvent } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { portfolio } from '@/content/portfolio'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { AUTOCOMPLETE_COMMANDS, runCommand } from '@/lib/terminal'
import { useTheme } from '@/context/theme'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Line = { id: number; text: string }

type DeveloperTerminalProps = {
  open: boolean
  onOpen: () => void
  onClose: () => void
}

export function DeveloperTerminal({ open, onOpen, onClose }: DeveloperTerminalProps) {
  const reduced = usePrefersReducedMotion()
  const inputId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const lineId = useRef(9)
  useFocusTrap(open, panelRef)
  const { toggleTheme } = useTheme()
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [lines, setLines] = useState<Line[]>([
    { id: 0, text: `ASTRA / DEV · ${portfolio.terminalShortcut}` },
    { id: 1, text: 'Type `help` to list commands.' },
    { id: 2, text: '' },
    { id: 3, text: 'visitor@astra:~$ whoami' },
    { id: 4, text: `${portfolio.owner.name} · ${portfolio.owner.title}` },
    { id: 5, text: '' },
    { id: 6, text: 'visitor@astra:~$ ls missions' },
    { id: 7, text: portfolio.projects.map((project) => project.id).join('  ') },
    { id: 8, text: '' },
  ])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      if (event.key === 'Escape' && open) {
        onClose()
        return
      }
      if (typing && target !== inputRef.current) return
      if (
        (event.ctrlKey || event.metaKey) &&
        !event.altKey &&
        (event.key.toLowerCase() === 'j' || event.key === '`')
      ) {
        event.preventDefault()
        if (open) onClose()
        else onOpen()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, onOpen])

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement
      window.setTimeout(() => inputRef.current?.focus(), 40)
    } else {
      lastFocus.current?.focus()
    }
  }, [open])

  useBodyScrollLock(open)

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [lines, open])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const command = value.trim()
    if (!command) return
    const result = runCommand(command)
    setValue('')
    setHistory((current) => [command, ...current].slice(0, 50))
    setHistoryIndex(-1)
    if (result.type === 'clear') {
      setLines([])
      return
    }
    if (result.type === 'exit') {
      onClose()
      return
    }
    if (result.type === 'effect') {
      if (result.effect === 'theme-toggle') toggleTheme()
      if (result.effect === 'warp') {
        window.dispatchEvent(new CustomEvent('astra:warp'))
      }
    }
    setLines((current) => [
      ...current,
      { id: lineId.current++, text: `› ${command}` },
      ...result.lines.map((text) => ({ id: lineId.current++, text })),
    ])
  }

  const navigateHistory = (direction: 'up' | 'down') => {
    if (!history.length) return
    if (direction === 'up') {
      const next = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(next)
      setValue(history[next])
      return
    }
    const next = historyIndex - 1
    setHistoryIndex(next)
    setValue(next < 0 ? '' : history[next])
  }

  const completeCommand = () => {
    const query = value.trim().toLowerCase()
    if (!query || query.includes(' ')) return
    const match = AUTOCOMPLETE_COMMANDS.find((command) => command.startsWith(query))
    if (!match) return
    setValue(match)
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="terminal-overlay fixed inset-0 z-50 grid place-items-center bg-[rgba(2,7,12,0.72)] p-3 backdrop-blur-sm sm:p-6"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="terminal-title"
            aria-keyshortcuts="Control+J Meta+J"
            className="flex h-[min(680px,86svh)] w-[min(960px,100%)] flex-col overflow-hidden rounded-xl border border-[#294238] bg-[#050c12] text-[#d7efe4] shadow-[0_36px_110px_rgba(0,0,0,0.78)]"
            initial={reduced ? false : { opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-[#09131a] px-4 py-3 sm:px-5">
              <div className="flex shrink-0 gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <p
                id="terminal-title"
                className="min-w-0 flex-1 truncate text-center font-mono text-xs tracking-[0.16em] text-[#9ab7a8]"
              >
                ASTRA / DEV
              </p>
              <button
                type="button"
                className="min-h-8 shrink-0 rounded-md px-2 font-mono text-xs text-[#9ab7a8] transition-colors hover:text-[#d7efe4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5dffb1]"
                onClick={onClose}
              >
                close
              </button>
            </div>

            <div className="flex shrink-0 items-center gap-2 border-b border-white/5 px-5 py-2 font-mono text-[0.68rem] text-[#68877a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5dffb1]" aria-hidden="true" />
              visitor@astra
              <span className="text-[#3b544a]" aria-hidden="true">
                /
              </span>
              ~
            </div>

            <div
              ref={logRef}
              className="min-h-0 flex-1 overflow-auto px-5 py-5 font-mono text-[0.9rem] leading-7 sm:px-6 sm:text-base"
              aria-live="polite"
            >
              {lines.map((line) => (
                <p key={line.id} className="whitespace-pre-wrap break-words">
                  {line.text}
                </p>
              ))}
            </div>

            <form
              className="terminal-form flex shrink-0 items-center gap-2 border-t border-white/10 bg-[#071018] px-5 py-4 font-mono transition-colors sm:px-6"
              onSubmit={submit}
            >
              <span aria-hidden="true" className="hidden shrink-0 text-[#5dffb1] sm:inline">
                visitor@astra:~$
              </span>
              <span aria-hidden="true" className="shrink-0 text-[#5dffb1] sm:hidden">
                ›
              </span>
              <label htmlFor={inputId} className="sr-only">
                Terminal command
              </label>
              <input
                id={inputId}
                ref={inputRef}
                value={value}
                onChange={(event) => {
                  setValue(event.target.value)
                  setHistoryIndex(-1)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowUp') {
                    event.preventDefault()
                    navigateHistory('up')
                  } else if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    navigateHistory('down')
                  } else if (event.key === 'Tab') {
                    event.preventDefault()
                    completeCommand()
                  }
                }}
                className="terminal-input min-w-0 flex-1 bg-transparent text-base text-[#d7efe4] outline-none placeholder:text-[#5d7268]"
                placeholder="Type a command…"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                aria-describedby="terminal-title"
              />
              <span className="terminal-cursor" aria-hidden="true" />
            </form>

            <div className="flex shrink-0 items-center justify-between border-t border-white/5 bg-[#09131a] px-4 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[#68877a]">
              <span>ASTRA shell</span>
              <span>tab complete · ↑↓ history · UTF-8</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
