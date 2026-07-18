import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FileText, MessageSquare, MessageCircle, Database } from 'lucide-react'
import { dashboardService } from '../../../services/dashboard'
import { StatsCard } from '../../../components/dashboard/StatsCard'
import { FileTypeCard } from '../../../components/dashboard/FileTypeCard'
import RecentUploadsCard from '../../../components/dashboard/RecentUploadsCard'
import RecentConversationsCard from '../../../components/dashboard/RecentConversationsCard'
import { DashboardHeader } from '../../../components/dashboard/DashboardHeader'
import { DashboardSkeleton } from '../../../components/dashboard/DashboardSkeleton'
import { EmptyState } from '../../../components/dashboard/EmptyState'
import { ErrorState } from '../../../components/dashboard/ErrorState'

const DashboardPage = () => {
  const [lastRefetchedAt, setLastRefetchedAt] = useState<Date | undefined>(undefined)

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      const res = await dashboardService.getDashboardData()
      setLastRefetchedAt(new Date())
      return res
    },
  })

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center pb-6 border-b border-zinc-150 dark:border-zinc-800">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
            <div className="h-4 w-72 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          </div>
        </div>
        <DashboardSkeleton />
      </div>
    )
  }

  if (isError) {
    const errorMsg = (error as any)?.response?.data?.detail || error.message
    return (
      <div className="py-12">
        <ErrorState message={errorMsg} onRetry={() => refetch()} />
      </div>
    )
  }

  if (!data) {
    return <EmptyState onRefresh={() => refetch()} />
  }

  const totalKnowledgeSources =
    (data.file_types.pdf || 0) +
    (data.file_types.txt || 0) +
    (data.file_types.docx || 0) +
    (data.file_types.markdown || 0) +
    (data.file_types.faq || 0)

  const isDashboardEmpty =
    data.total_documents === 0 &&
    data.total_conversations === 0 &&
    data.total_messages === 0 &&
    totalKnowledgeSources === 0

  if (isDashboardEmpty) {
    return (
      <div className="space-y-8">
        <DashboardHeader
          onRefresh={() => refetch()}
          isRefetching={isRefetching}
          lastRefetchedAt={lastRefetchedAt}
        />
        <div className="py-12">
          <EmptyState onRefresh={() => refetch()} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 text-left">
      <DashboardHeader
        onRefresh={() => refetch()}
        isRefetching={isRefetching}
        lastRefetchedAt={lastRefetchedAt}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Documents"
          value={data.total_documents}
          icon={<FileText className="w-6 h-6 text-purple-650 dark:text-purple-400" />}
          description="Uploaded workspace files"
          gradient="from-purple-550 to-indigo-500"
        />
        <StatsCard
          title="Conversations"
          value={data.total_conversations}
          icon={<MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
          description="Customer support sessions"
          gradient="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Total Messages"
          value={data.total_messages}
          icon={<MessageCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
          description="Exchanged user / agent texts"
          gradient="from-emerald-500 to-teal-500"
        />
        <StatsCard
          title="Knowledge Sources"
          value={totalKnowledgeSources}
          icon={<Database className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
          description="Aggregated data sources"
          gradient="from-amber-500 to-orange-500"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">
          Knowledge Base Breakdown
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <FileTypeCard type="pdf" count={data.file_types.pdf} />
          <FileTypeCard type="txt" count={data.file_types.txt} />
          <FileTypeCard type="docx" count={data.file_types.docx} />
          <FileTypeCard type="markdown" count={data.file_types.markdown} />
          <FileTypeCard type="faq" count={data.file_types.faq} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentUploadsCard uploads={data.recent_uploads} />
        <RecentConversationsCard conversations={data.recent_conversations} />
      </div>
    </div>
  )
}

export default DashboardPage
