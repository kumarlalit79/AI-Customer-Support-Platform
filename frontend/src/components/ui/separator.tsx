import { cn } from '../../lib/utils'

interface SeparatorProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Simple separator / divider component.
 * Does not depend on @radix-ui/react-separator.
 */
function Separator({ className, orientation = 'horizontal' }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'bg-border shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
    />
  )
}

export { Separator }
