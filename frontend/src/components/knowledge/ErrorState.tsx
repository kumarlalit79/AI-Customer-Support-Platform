import { AlertCircle } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'

interface ErrorStateProps {
  message?: string
  onRetry: () => void
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <Card className="border border-red-500/15 bg-red-500/5 p-10 text-center max-w-xl mx-auto">
      <CardContent className="flex flex-col items-center p-0">
        <div className="w-14 h-14 bg-red-500/10 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-5 border border-red-500/20">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-red-900 dark:text-red-400 mb-2">
          Failed to Load Documents
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm text-sm">
          {message || 'An unexpected error occurred. Please check your connection and try again.'}
        </p>
        <Button
          onClick={onRetry}
          className="h-10 px-6 font-semibold bg-red-600 hover:bg-red-700 text-white cursor-pointer"
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}

export default ErrorState
