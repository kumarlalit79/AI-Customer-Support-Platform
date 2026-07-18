import { FileText, File, FileType, FileCode, HelpCircle, Database } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import type { KnowledgeStatistics } from '../../types/knowledge'

interface KnowledgeStatsProps {
  stats: KnowledgeStatistics
}

const statItems = [
  {
    key: 'total_documents' as keyof KnowledgeStatistics,
    label: 'Total',
    icon: <Database className="w-5 h-5" />,
    colorStyles: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
  {
    key: 'total_pdf' as keyof KnowledgeStatistics,
    label: 'PDF',
    icon: <FileText className="w-5 h-5" />,
    colorStyles: 'bg-red-500/10 text-red-600 dark:text-red-400',
  },
  {
    key: 'total_txt' as keyof KnowledgeStatistics,
    label: 'TXT',
    icon: <File className="w-5 h-5" />,
    colorStyles: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    key: 'total_docx' as keyof KnowledgeStatistics,
    label: 'DOCX',
    icon: <FileType className="w-5 h-5" />,
    colorStyles: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  },
  {
    key: 'total_markdown' as keyof KnowledgeStatistics,
    label: 'Markdown',
    icon: <FileCode className="w-5 h-5" />,
    colorStyles: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    key: 'total_faq' as keyof KnowledgeStatistics,
    label: 'FAQ',
    icon: <HelpCircle className="w-5 h-5" />,
    colorStyles: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
]

export const KnowledgeStats = ({ stats }: KnowledgeStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statItems.map((item) => (
        <Card
          key={item.key}
          className="border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md transition-all duration-300 hover:shadow-md"
        >
          <CardContent className="p-5 flex flex-col gap-3 text-left">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.colorStyles}`}>
              {item.icon}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {item.label}
              </p>
              <p className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mt-0.5">
                {stats[item.key]}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default KnowledgeStats
