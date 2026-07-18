import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud } from 'lucide-react'
import { cn } from '../../lib/utils'

interface DragDropUploaderProps {
  onFileDrop: (files: File[]) => void
  isUploading: boolean
  accept?: Record<string, string[]>
  label?: string
}

export const DragDropUploader = ({
  onFileDrop,
  isUploading,
  accept,
  label,
}: DragDropUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragOver(false)
      if (acceptedFiles.length > 0 && !isUploading) {
        onFileDrop(acceptedFiles)
      }
    },
    [onFileDrop, isUploading]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    disabled: isUploading,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative flex flex-col items-center justify-center w-full min-h-[160px] rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer',
        isDragActive || isDragOver
          ? 'border-purple-500 bg-purple-50/80 dark:bg-purple-950/20 scale-[1.01]'
          : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50/60 dark:bg-zinc-800/20 hover:border-purple-400 hover:bg-purple-50/40 dark:hover:bg-purple-950/10',
        isUploading && 'opacity-60 cursor-not-allowed'
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3 text-center px-6 py-8">
        <div
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300',
            isDragActive
              ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400'
              : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400'
          )}
        >
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {isDragActive ? 'Drop your file here' : label || 'Drag & drop or click to upload'}
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
            {isUploading ? 'Uploading...' : 'PDF, TXT, DOCX, Markdown supported'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DragDropUploader
