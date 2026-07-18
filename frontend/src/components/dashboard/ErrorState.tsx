import { AlertCircle } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'

interface ErrorStateProps {
  message?: string
  onRetry: () => void
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <Card className="border border-red-500/15 bg-red-500/5 backdrop-blur-md p-8 md:p-12 text-center max-w-xl mx-auto shadow-md">
      <CardContent className="flex flex-col items-center justify-center p-0">
        <div className="w-14 h-14 bg-red-500/10 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-5 border border-red-500/20 shrink-0">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-red-900 dark:text-red-400 mb-2">
          Failed to Load Dashboard Data
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm text-sm">
          {message || 'An unexpected error occurred while communicating with the server. Please verify your connection.'}
        </p>
        <Button
          onClick={onRetry}
          variant="default"
          className="h-10 px-5 font-semibold bg-red-600 hover:bg-red-750 text-white cursor-pointer transition-colors"
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}
export default ErrorState
