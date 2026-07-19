import { Sun, Moon, Monitor } from 'lucide-react'
import { useThemeStore, type Theme } from '../../store/theme'
import { cn } from '../../lib/utils'

interface ThemeOption {
  value: Theme
  label: string
  icon: React.ElementType
}

const OPTIONS: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'dark', label: 'Dark', icon: Moon },
]

interface ThemeToggleProps {
  /** When true, shows a compact icon-only button that cycles through themes */
  compact?: boolean
  className?: string
}

export function ThemeToggle({ compact = false, className }: ThemeToggleProps) {
  const { theme, setTheme } = useThemeStore()

  if (compact) {
    const current = OPTIONS.find((o) => o.value === theme) ?? OPTIONS[1]
    const next = OPTIONS[(OPTIONS.indexOf(current) + 1) % OPTIONS.length]
    const Icon = current.icon
    return (
      <button
        onClick={() => setTheme(next.value)}
        aria-label={`Switch to ${next.label} theme`}
        title={`Current: ${current.label}. Click for ${next.label}.`}
        className={cn(
          'p-2 rounded-lg text-zinc-500 dark:text-zinc-400',
          'hover:text-zinc-900 dark:hover:text-zinc-100',
          'hover:bg-zinc-100 dark:hover:bg-zinc-800',
          'transition-all duration-200 cursor-pointer',
          className
        )}
      >
        <Icon className="w-4 h-4" />
      </button>
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme selector"
      className={cn(
        'inline-flex items-center gap-1 p-1 rounded-xl',
        'bg-zinc-100 dark:bg-zinc-800',
        'border border-zinc-200 dark:border-zinc-700',
        className
      )}
    >
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value
        return (
          <button
            key={value}
            role="radio"
            aria-checked={isActive}
            aria-label={`${label} theme`}
            onClick={() => setTheme(value)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer',
              isActive
                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
