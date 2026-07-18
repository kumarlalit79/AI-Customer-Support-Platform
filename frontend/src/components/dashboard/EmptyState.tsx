import { FileQuestion } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'

interface EmptyStateProps {
  onRefresh?: () => void
}

export const EmptyState = ({ onRefresh }: EmptyStateProps) => {
  return (
    <Card className="border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md p-8 md:p-12 text-center max-w-2xl mx-auto shadow-xl">
      <CardContent className="flex flex-col items-center justify-center p-0">
        <div className="w-16 h-16 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-6">
          <FileQuestion className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
          No Support Data Found
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md">
          To get started, navigate to the Knowledge Base to upload your support documents (PDFs, TXT, DOCX) or start a chat with the AI support agent.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          {onRefresh && (
            <Button onClick={onRefresh} variant="outline" className="h-10 px-5 font-semibold cursor-pointer">
              Refresh Page
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
export default EmptyState
