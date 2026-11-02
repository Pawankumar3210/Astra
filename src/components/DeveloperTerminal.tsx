import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { portfolio } from '@/content/portfolio'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { runCommand } from '@/lib/terminal'
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
  useFocusTrap(open, panelRef)
  const [value, setValue] = useState('')
  const [lines, setLines] = useState<Line[]>([
    { id: 0, text: `ASTRA terminal · ${portfolio.terminalShortcut}` },
    { id: 1, text: 'Type `help` to list commands.' },
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
      if ((event.ctrlKey || event.metaKey) && event.key === '`') {
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

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [lines, open])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const command = value
    const result = runCommand(command)
    setValue('')
    if (result.type === 'clear') {
      setLines([])
      return
    }
    if (result.type === 'exit') {
      onClose()
      return
    }
    setLines((current) => [
      ...current,
      { id: Date.now(), text: `› ${command}` },
      ...result.lines.map((text, index) => ({ id: Date.now() + index + 1, text })),
    ])
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="terminal-title"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto w-[min(680px,calc(100%-1.5rem))] overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--accent)_24%,var(--border))] bg-[#071018] text-[#d7efe4] shadow-[var(--shadow)]"
          initial={reduced ? false : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <p id="terminal-title" className="font-mono text-xs tracking-[0.18em] text-[#5dffb1]">
              ASTRA / DEV
            </p>
            <button
              type="button"
              className="rounded-md px-2 py-1 font-mono text-xs text-[#9ab7a8]"
              onClick={onClose}
            >
              close
            </button>
          </div>
          <div ref={logRef} className="max-h-[42svh] overflow-auto px-4 py-3 font-mono text-sm leading-6">
            {lines.map((line) => (
              <p key={line.id}>{line.text}</p>
            ))}
          </div>
          <form className="flex items-center gap-2 border-t border-white/10 px-4 py-3" onSubmit={submit}>
            <label htmlFor={inputId} className="sr-only">
              Terminal command
            </label>
            <span aria-hidden="true" className="text-[#5dffb1]">
              ›
            </span>
            <input
              id={inputId}
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="w-full bg-transparent text-[#d7efe4] outline-none"
              autoComplete="off"
              spellCheck={false}
              aria-describedby="terminal-title"
            />
            <span className="terminal-cursor" aria-hidden="true" />
          </form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
