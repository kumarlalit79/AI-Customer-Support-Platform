import { AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}


export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while communicating with the server. Please check your connection and try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'py-16 px-6',
        className
      )}
    >
      {/* Icon bubble */}
      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-5 border border-red-100 dark:border-red-800/40">
        <AlertCircle className="w-6 h-6 text-red-500 dark:text-red-400" />
      </div>

      <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100 mb-1.5 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="mt-6 gap-2 cursor-pointer font-medium"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try again
        </Button>
      )}
    </div>
  )
}
