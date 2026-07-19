import { TableCell, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Trash2, Loader2 } from 'lucide-react'
import { ReindexButton } from './ReindexButton'
import type { Document } from '../../types/knowledge'

interface DocumentRowProps {
  document: Document
  onDeleteClick: (doc: Document) => void
  onReindex: (docId: number) => void
  isReindexing: boolean
}

export const DocumentRow = ({
  document,
  onDeleteClick,
  onReindex,
  isReindexing,
}: DocumentRowProps) => {
  const getFileType = (filename: string): string => {
    const parts = filename.split('.')
    if (parts.length <= 1) return 'unknown'
    const ext = parts[parts.length - 1].toLowerCase()
    if (ext === 'md') return 'markdown'
    return ext
  }

  const fileType = getFileType(document.original_filename)

  const typeColorClasses: Record<string, string> = {
    pdf: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/10 dark:border-red-950/30',
    txt: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/10 dark:border-blue-950/30',
    docx: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/10 dark:border-indigo-950/30',
    markdown: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10 dark:border-emerald-950/30',
    faq: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/10 dark:border-amber-950/30',
  }

  const typeColor = typeColorClasses[fileType] || 'bg-zinc-500/10 text-zinc-600 border-zinc-500/10'

  return (
    <TableRow className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
      <TableCell className="font-semibold text-zinc-900 dark:text-zinc-100 max-w-xs truncate" title={document.original_filename}>
        {document.original_filename}
      </TableCell>
      <TableCell className="capitalize">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${typeColor}`}>
          {fileType}
        </span>
      </TableCell>
      <TableCell className="text-zinc-500 dark:text-zinc-400 text-xs">
        {document.created_at
          ? new Date(document.created_at).toLocaleDateString([], {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : '—'}
      </TableCell>
      <TableCell>
        {document.status === 'PROCESSING' && (
          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/10 flex items-center gap-1.5 w-fit font-semibold">
            <Loader2 className="w-3 h-3 animate-spin" />
            Processing
          </Badge>
        )}
        {document.status === 'READY' && (
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10 w-fit font-semibold">
            Ready
          </Badge>
        )}
        {document.status === 'FAILED' && (
          <Badge variant="destructive" className="w-fit font-semibold">
            Failed
          </Badge>
        )}
        {document.status !== 'PROCESSING' && document.status !== 'READY' && document.status !== 'FAILED' && (
          <Badge variant="secondary" className="w-fit capitalize">
            {document.status.toLowerCase()}
          </Badge>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ReindexButton onReindex={() => onReindex(document.id)} isReindexing={isReindexing} />
          <Button
            onClick={() => onDeleteClick(document)}
            variant="ghost"
            className="text-zinc-400 hover:text-red-650 dark:hover:text-red-400 cursor-pointer h-8 w-8 p-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default DocumentRow
