import { Card, CardContent } from '../ui/card'
import { FileText, FileCode, HelpCircle, FileType, File } from 'lucide-react'

export type SupportedFileTypes = 'pdf' | 'txt' | 'docx' | 'markdown' | 'faq'

interface FileTypeCardProps {
  type: SupportedFileTypes
  count: number
}

const fileConfigs = {
  pdf: {
    label: 'PDF Documents',
    icon: <FileText className="w-5 h-5" />,
    colorStyles: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/10 dark:border-red-950/30',
  },
  txt: {
    label: 'Text Files',
    icon: <File className="w-5 h-5" />,
    colorStyles: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/10 dark:border-blue-950/30',
  },
  docx: {
    label: 'Word Documents',
    icon: <FileType className="w-5 h-5" />,
    colorStyles: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/10 dark:border-indigo-950/30',
  },
  markdown: {
    label: 'Markdown Pages',
    icon: <FileCode className="w-5 h-5" />,
    colorStyles: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10 dark:border-emerald-950/30',
  },
  faq: {
    label: 'FAQ Queries',
    icon: <HelpCircle className="w-5 h-5" />,
    colorStyles: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/10 dark:border-amber-950/30',
  },
}

export const FileTypeCard = ({ type, count }: FileTypeCardProps) => {
  const config = fileConfigs[type] || {
    label: type.toUpperCase(),
    icon: <File className="w-5 h-5" />,
    colorStyles: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/10 dark:border-zinc-950/30',
  }

  return (
    <Card className="border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md transition-all duration-300 hover:shadow-md hover:border-zinc-300/80 dark:hover:border-zinc-700/80">
      <CardContent className="p-5 flex items-center gap-4 text-left">
        <div className={`p-3 rounded-lg border ${config.colorStyles} shrink-0`}>
          {config.icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 truncate">
            {config.label}
          </p>
          <p className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mt-0.5">
            {count} <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">files</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
