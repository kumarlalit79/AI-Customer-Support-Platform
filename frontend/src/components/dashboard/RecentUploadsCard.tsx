import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { FileUp, FileText } from 'lucide-react'

interface RecentUploadsCardProps {
  uploads: string[]
}

export const RecentUploadsCard = ({ uploads }: RecentUploadsCardProps) => {
  return (
    <Card className="border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-left border-b border-zinc-100 dark:border-zinc-850">
        <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <FileUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          Recent Uploads
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1 text-left">
        {uploads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center">
            <p className="text-sm text-zinc-400 dark:text-zinc-500">No documents uploaded yet.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {uploads.map((filename, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate" title={filename}>
                    {filename}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Ready for AI Q&A</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
export default RecentUploadsCard
