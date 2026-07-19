import { useEffect, type ReactNode } from 'react'
import { useThemeStore } from '../../store/theme'

interface ThemeProviderProps {
  children: ReactNode
}

/**
 * ThemeProvider must be rendered high in the tree.
 * It reads the persisted theme from Zustand and applies
 * the correct 'dark' class to <html> before the first paint.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    const root = document.documentElement

    const apply = () => {
      if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        root.classList.toggle('dark', prefersDark)
      } else {
        root.classList.toggle('dark', theme === 'dark')
      }
    }

    apply()

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
  }, [theme])

  return <>{children}</>
}
