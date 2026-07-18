import { RefreshCw } from 'lucide-react'
import { Button } from '../ui/button'
import { useAuthStore } from '../../store/auth'

interface DashboardHeaderProps {
  onRefresh: () => void
  isRefetching: boolean
  lastRefetchedAt?: Date
}

export const DashboardHeader = ({ onRefresh, isRefetching, lastRefetchedAt }: DashboardHeaderProps) => {
  const { user } = useAuthStore()

  const formattedTime = lastRefetchedAt
    ? lastRefetchedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : ''

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800/80">
      <div className="text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 m-0">
          Welcome back, {user?.full_name || 'Agent'}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-sm">
          Here is the overview of your platform activity and knowledge sources.
        </p>
      </div>

      <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
        {formattedTime && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium hidden md:inline">
            Last updated: {formattedTime}
          </span>
        )}
        <Button
          onClick={onRefresh}
          disabled={isRefetching}
          variant="outline"
          className="h-10 px-4 flex items-center gap-2 cursor-pointer font-semibold active:scale-[0.98] transition-all bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-850 text-zinc-700 dark:text-zinc-300"
        >
          <RefreshCw className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`} />
          {isRefetching ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>
    </div>
  )
}
export default DashboardHeader
