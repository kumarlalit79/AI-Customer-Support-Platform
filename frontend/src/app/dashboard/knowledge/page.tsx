import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { documentService } from '../../../services/documents'
import { KnowledgeStats } from '../../../components/knowledge/KnowledgeStats'
import { UploadSection } from '../../../components/knowledge/UploadSection'
import { SearchBar } from '../../../components/knowledge/SearchBar'
import { DocumentTable } from '../../../components/knowledge/DocumentTable'
import { DeleteDialog } from '../../../components/knowledge/DeleteDialog'
import { KnowledgeSkeleton } from '../../../components/knowledge/KnowledgeSkeleton'
import { ErrorState } from '../../../components/knowledge/ErrorState'
import { Button } from '../../../components/ui/button'
import type { Document } from '../../../types/knowledge'

export const KnowledgePage = () => {
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState('')
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [reindexingIds, setReindexingIds] = useState<Record<number, boolean>>({})

  const {
    data: documents,
    isLoading: isDocsLoading,
    isError: isDocsError,
    error: docsError,
    refetch: refetchDocs,
    isRefetching: isDocsRefetching,
  } = useQuery({
    queryKey: ['documents'],
    queryFn: documentService.getDocuments,
  })

  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
    error: statsError,
    refetch: refetchStats,
    isRefetching: isStatsRefetching,
  } = useQuery({
    queryKey: ['documents-stats'],
    queryFn: documentService.getStatistics,
  })

  const reindexMutation = useMutation({
    mutationFn: documentService.reindexDocument,
    onMutate: (docId) => {
      setReindexingIds((prev) => ({ ...prev, [docId]: true }))
    },
    onSuccess: (data) => {
      toast.success(`Successfully started reindexing for "${data.original_filename}"`)
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['documents-stats'] })
    },
    onError: (err: any) => {
      const msg = err.response?.data?.detail || 'Failed to start reindexing.'
      toast.error(`Reindexing failed: ${msg}`)
    },
    onSettled: (_data, _error, docId) => {
      setReindexingIds((prev) => {
        const next = { ...prev }
        delete next[docId]
        return next
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (docId: number) => documentService.deleteDocument(docId),
    onSuccess: () => {
      toast.success(`Document deleted successfully`)
      setIsDeleteOpen(false)
      setSelectedDoc(null)
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['documents-stats'] })
    },
    onError: (err: any) => {
      const msg = err.response?.data?.detail || 'Failed to delete document.'
      toast.error(`Deletion failed: ${msg}`)
    },
  })

  const handleRefresh = async () => {
    await Promise.all([refetchDocs(), refetchStats()])
  }

  const handleDeleteClick = (doc: Document) => {
    setSelectedDoc(doc)
    setIsDeleteOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (selectedDoc) {
      deleteMutation.mutate(selectedDoc.id)
    }
  }

  const isPageLoading = isDocsLoading || isStatsLoading
  const isPageError = isDocsError || isStatsError
  const pageError = docsError || statsError

  if (isPageLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center pb-6 border-b border-zinc-150 dark:border-zinc-800">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
            <div className="h-4 w-72 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          </div>
        </div>
        <KnowledgeSkeleton />
      </div>
    )
  }

  if (isPageError) {
    const errorMsg = (pageError as any)?.response?.data?.detail || pageError?.message
    return (
      <div className="py-12">
        <ErrorState message={errorMsg} onRetry={handleRefresh} />
      </div>
    )
  }

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800/80">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">
            Knowledge Base
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-sm">
            Manage files that educate your customer support assistant agent.
          </p>
        </div>

        <Button
          onClick={handleRefresh}
          disabled={isDocsRefetching || isStatsRefetching}
          variant="outline"
          className="h-10 px-4 flex items-center gap-2 cursor-pointer font-semibold bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850 text-zinc-700 dark:text-zinc-300 self-start sm:self-center shrink-0 animate-fade-in"
        >
          <RefreshCw className={`w-4 h-4 ${isDocsRefetching || isStatsRefetching ? 'animate-spin' : ''}`} />
          {isDocsRefetching || isStatsRefetching ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {stats && <KnowledgeStats stats={stats} />}

      <UploadSection
        onUploadSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['documents'] })
          queryClient.invalidateQueries({ queryKey: ['documents-stats'] })
        }}
      />

      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">
            All Documents
          </h2>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {documents && (
          <DocumentTable
            documents={documents}
            searchQuery={searchQuery}
            onDeleteClick={handleDeleteClick}
            onReindex={(docId) => reindexMutation.mutate(docId)}
            reindexingIds={reindexingIds}
          />
        )}
      </div>

      {selectedDoc && (
        <DeleteDialog
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false)
            setSelectedDoc(null)
          }}
          onConfirm={handleDeleteConfirm}
          isDeleting={deleteMutation.isPending}
          filename={selectedDoc.original_filename}
        />
      )}
    </div>
  )
}

export default KnowledgePage
