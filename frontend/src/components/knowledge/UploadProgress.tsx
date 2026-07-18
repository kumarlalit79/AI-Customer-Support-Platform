import { Loader2, CheckCircle2, XCircle, FileUp } from 'lucide-react'
import { Progress } from '../ui/progress'

export type UploadStatus = 'uploading' | 'success' | 'error'

interface UploadProgressProps {
  filename: string
  progress: number
  status: UploadStatus
  errorMessage?: string
}

export const UploadProgress = ({ filename, progress, status, errorMessage }: UploadProgressProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 rounded-xl">
      <div className="shrink-0">
        {status === 'uploading' && (
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
            <FileUp className="w-5 h-5" />
          </div>
        )}
        {status === 'success' && (
          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        )}
        {status === 'error' && (
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{filename}</p>
          <div className="shrink-0 flex items-center gap-1.5">
            {status === 'uploading' && <Loader2 className="w-4 h-4 animate-spin text-purple-600" />}
            <span className={`text-xs font-semibold ${
              status === 'success' ? 'text-emerald-600' :
              status === 'error' ? 'text-red-600' :
              'text-purple-600 dark:text-purple-400'
            }`}>
              {status === 'uploading' ? `${progress}%` : status === 'success' ? 'Done' : 'Failed'}
            </span>
          </div>
        </div>
        {status === 'uploading' && (
          <Progress value={progress} className="h-1.5" />
        )}
        {status === 'error' && errorMessage && (
          <p className="text-xs text-red-500 dark:text-red-400">{errorMessage}</p>
        )}
      </div>
    </div>
  )
}

export default UploadProgress
