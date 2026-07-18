import { BookOpen } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'

interface EmptyStateProps {
  onRefresh?: () => void
}

export const EmptyState = ({ onRefresh }: EmptyStateProps) => {
  return (
    <Card className="border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md p-12 text-center max-w-xl mx-auto shadow-md">
      <CardContent className="flex flex-col items-center p-0">
        <div className="w-16 h-16 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-5">
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
          No Documents Yet
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm text-sm">
          Upload your first document above to start building your AI knowledge base. Supported formats: PDF, TXT, DOCX, Markdown, and FAQ.
        </p>
        {onRefresh && (
          <Button onClick={onRefresh} variant="outline" className="h-10 px-6 font-semibold cursor-pointer">
            Refresh
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default EmptyState
