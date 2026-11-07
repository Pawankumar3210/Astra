import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/theme'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const reduced = usePrefersReducedMotion()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-switch"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <motion.span
        className="theme-switch__knob"
        animate={{ x: theme === 'dark' ? 0 : 22 }}
        transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {theme === 'dark' ? <Moon size={14} strokeWidth={1.75} /> : <Sun size={14} strokeWidth={1.75} />}
      </motion.span>
    </button>
  )
}
