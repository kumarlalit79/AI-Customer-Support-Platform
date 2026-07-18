import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { Plus, Trash2, Loader2, FileUp, HelpCircle } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { DragDropUploader } from './DragDropUploader'
import { UploadProgress, type UploadStatus } from './UploadProgress'
import { documentService } from '../../services/documents'
import type { FAQItem, UploadableFileType } from '../../types/knowledge'

interface UploadSectionProps {
  onUploadSuccess: () => void
}

interface ActiveUpload {
  id: string
  filename: string
  progress: number
  status: UploadStatus
  errorMessage?: string
}

export const UploadSection = ({ onUploadSuccess }: UploadSectionProps) => {
  const [selectedType, setSelectedType] = useState<UploadableFileType>('pdf')
  const [activeUploads, setActiveUploads] = useState<ActiveUpload[]>([])
  const [isFaqOpen, setIsFaqOpen] = useState(false)
  const [faqTitle, setFaqTitle] = useState('')
  const [faqItems, setFaqItems] = useState<FAQItem[]>([{ question: '', answer: '' }])

  // File type accept restrictions for Dropzone
  const acceptTypes: Record<UploadableFileType, Record<string, string[]>> = {
    pdf: { 'application/pdf': ['.pdf'] },
    txt: { 'text/plain': ['.txt'] },
    docx: { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    markdown: { 'text/markdown': ['.md', '.markdown'] },
    faq: { 'application/json': ['.json'] },
  }

  // Upload Mutation
  const uploadMutation = useMutation({
    mutationFn: async ({ file, type }: { file: File; type: UploadableFileType }) => {
      switch (type) {
        case 'pdf':
          return await documentService.uploadDocument(file)
        case 'txt':
          return await documentService.uploadTxt(file)
        case 'docx':
          return await documentService.uploadDocx(file)
        case 'markdown':
          return await documentService.uploadMarkdown(file)
        default:
          throw new Error('Unsupported file type upload method')
      }
    },
    onSuccess: (_data, variables) => {
      // Update upload state to success
      setActiveUploads((prev) =>
        prev.map((up) =>
          up.filename === variables.file.name ? { ...up, progress: 100, status: 'success' } : up
        )
      )
      toast.success(`Successfully uploaded and indexed "${variables.file.name}"`)
      onUploadSuccess()

      // Clear successful upload after 3 seconds
      setTimeout(() => {
        setActiveUploads((prev) => prev.filter((up) => up.filename !== variables.file.name))
      }, 3000)
    },
    onError: (error: any, variables) => {
      const message = error.response?.data?.detail || 'Failed to upload and index file.'
      setActiveUploads((prev) =>
        prev.map((up) =>
          up.filename === variables.file.name ? { ...up, status: 'error', errorMessage: message } : up
        )
      )
      toast.error(`Failed to upload "${variables.file.name}": ${message}`)
    },
  })

  // FAQ upload mutation
  const uploadFaqMutation = useMutation({
    mutationFn: async () => {
      if (!faqTitle.trim()) throw new Error('FAQ Title is required')
      const invalidFaq = faqItems.some((item) => !item.question.trim() || !item.answer.trim())
      if (invalidFaq) throw new Error('Please fill in all questions and answers')

      return await documentService.uploadFaq({
        title: faqTitle,
        faqs: faqItems,
      })
    },
    onSuccess: (_data) => {
      toast.success(`Successfully uploaded FAQ: "${faqTitle}"`)
      setIsFaqOpen(false)
      setFaqTitle('')
      setFaqItems([{ question: '', answer: '' }])
      onUploadSuccess()
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || error.message || 'Failed to submit FAQ list.'
      toast.error(`FAQ creation failed: ${message}`)
    },
  })

  const handleFileDrop = (files: File[]) => {
    files.forEach((file) => {
      // Create local active upload tracking item
      const uploadId = Math.random().toString(36).substring(7)
      setActiveUploads((prev) => [
        ...prev,
        { id: uploadId, filename: file.name, progress: 10, status: 'uploading' },
      ])

      // Trigger actual upload mutation
      uploadMutation.mutate({ file, type: selectedType })
    })
  }

  // Simulate file upload progress during mutation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUploads((prev) =>
        prev.map((up) => {
          if (up.status === 'uploading' && up.progress < 90) {
            return { ...up, progress: up.progress + Math.floor(Math.random() * 15) }
          }
          return up
        })
      )
    }, 400)

    return () => clearInterval(interval)
  }, [])

  // FAQ form management
  const addFaqItem = () => {
    setFaqItems([...faqItems, { question: '', answer: '' }])
  }

  const removeFaqItem = (index: number) => {
    setFaqItems(faqItems.filter((_, i) => i !== index))
  }

  const updateFaqItem = (index: number, field: keyof FAQItem, value: string) => {
    const updated = [...faqItems]
    updated[index][field] = value
    setFaqItems(updated)
  }

  const handleFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    uploadFaqMutation.mutate()
  }

  return (
    <div className="space-y-6 text-left">
      <Card className="border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
            <FileUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Upload Knowledge Base Sources
          </h2>

          {/* Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(['pdf', 'txt', 'docx', 'markdown', 'faq'] as UploadableFileType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer capitalize ${
                  selectedType === type
                    ? 'bg-purple-650 text-white border-purple-650 shadow-sm'
                    : 'bg-zinc-100 hover:bg-zinc-150 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {type === 'markdown' ? 'Markdown' : type.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Conditional upload interface */}
          {selectedType === 'faq' ? (
            <div className="p-6 bg-zinc-50 dark:bg-zinc-800/20 rounded-xl border border-zinc-200 dark:border-zinc-800/80 flex flex-col items-center justify-center text-center gap-4">
              <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Build manual Q&A list entries
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-555 mt-1">
                  Construct query sheets dynamically to resolve client FAQ questions
                </p>
              </div>
              <Button
                onClick={() => setIsFaqOpen(true)}
                className="bg-purple-600 hover:bg-purple-750 text-white font-semibold cursor-pointer h-10 px-5 flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Create FAQ Source
              </Button>
            </div>
          ) : (
            <DragDropUploader
              onFileDrop={handleFileDrop}
              isUploading={uploadMutation.isPending}
              accept={acceptTypes[selectedType]}
              label={`Drag & drop your ${selectedType.toUpperCase()} here, or click to browse`}
            />
          )}
        </CardContent>
      </Card>

      {/* Progress Indicators stack */}
      {activeUploads.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Active uploads</h3>
          <div className="space-y-2">
            {activeUploads.map((up) => (
              <UploadProgress
                key={up.id}
                filename={up.filename}
                progress={up.progress}
                status={up.status}
                errorMessage={up.errorMessage}
              />
            ))}
          </div>
        </div>
      )}

      {/* FAQ Creation Form Dialog */}
      <Dialog open={isFaqOpen} onOpenChange={(open) => !open && setIsFaqOpen(false)}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create FAQ Knowledge Source</DialogTitle>
            <DialogDescription>
              Provide a title and insert key question & answer pairs to populate the index.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFaqSubmit} className="space-y-6 pt-4 text-left">
            <div className="space-y-2">
              <Label htmlFor="faq-title" className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                FAQ Document Title
              </Label>
              <Input
                id="faq-title"
                type="text"
                placeholder="Product Return Policies"
                value={faqTitle}
                onChange={(e) => setFaqTitle(e.target.value)}
                required
                className="h-11 bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-800"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Q&A Entries
                </Label>
                <Button
                  type="button"
                  onClick={addFaqItem}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Q&A
                </Button>
              </div>

              <div className="space-y-4 divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {faqItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start pt-4 first:pt-0">
                    <div className="flex-1 space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor={`q-${idx}`} className="text-xs text-zinc-400">Question {idx + 1}</Label>
                        <Input
                          id={`q-${idx}`}
                          type="text"
                          placeholder="What is your return window?"
                          value={item.question}
                          onChange={(e) => updateFaqItem(idx, 'question', e.target.value)}
                          required
                          className="h-10 bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-800"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`a-${idx}`} className="text-xs text-zinc-400">Answer {idx + 1}</Label>
                        <Input
                          id={`a-${idx}`}
                          type="text"
                          placeholder="We offer a 30-day return policy."
                          value={item.answer}
                          onChange={(e) => updateFaqItem(idx, 'answer', e.target.value)}
                          required
                          className="h-10 bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-800"
                        />
                      </div>
                    </div>
                    {faqItems.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeFaqItem(idx)}
                        variant="ghost"
                        size="icon-sm"
                        className="text-zinc-450 hover:text-red-500 shrink-0 mt-6 h-9 w-9 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="border-t border-zinc-100 dark:border-zinc-800 pt-4 -mx-6 -mb-6 px-6 bg-zinc-50/50 dark:bg-zinc-900/30">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFaqOpen(false)}
                disabled={uploadFaqMutation.isPending}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={uploadFaqMutation.isPending}
                className="bg-purple-600 hover:bg-purple-750 text-white font-semibold cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                {uploadFaqMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving FAQ...
                  </>
                ) : (
                  'Save FAQ Source'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default UploadSection
