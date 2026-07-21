import { FileText } from 'lucide-react'
import type { Source } from '../../types/chat'

interface SourceCardProps {
  sources: Source[]
}

export function SourceCard({ sources }: SourceCardProps) {
  if (!sources || sources.length === 0) return null

  return (
    <div className="mt-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-700/60">
      <p className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
        Sources
      </p>
      <div className="flex flex-wrap gap-2">
        {sources.map((src, idx) => (
          <a
            key={idx}
            href="#"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700/70 hover:bg-white dark:hover:bg-zinc-700 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            <FileText className="w-3 h-3 shrink-0 text-purple-500" />
            {src.filename}
            <span className="text-zinc-400 dark:text-zinc-500">•</span>
            <span className="text-zinc-400 dark:text-zinc-500">Page {src.page}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
