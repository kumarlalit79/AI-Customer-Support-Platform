import { RefreshCw } from 'lucide-react'
import { Button } from '../ui/button'

interface ReindexButtonProps {
  onReindex: () => void
  isReindexing: boolean
}

export const ReindexButton = ({ onReindex, isReindexing }: ReindexButtonProps) => {
  return (
    <Button
      onClick={onReindex}
      disabled={isReindexing}
      variant="outline"
      size="sm"
      className="flex items-center gap-1.5 cursor-pointer text-xs h-8 border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-900"
    >
      <RefreshCw className={`w-3.5 h-3.5 ${isReindexing ? 'animate-spin' : ''}`} />
      <span>{isReindexing ? 'Indexing...' : 'Reindex'}</span>
    </Button>
  )
}

export default ReindexButton
