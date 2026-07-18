import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { MessageSquare, ArrowUpRight } from 'lucide-react'

interface RecentConversationsCardProps {
  conversations: string[]
}

export const RecentConversationsCard = ({ conversations }: RecentConversationsCardProps) => {
  return (
    <Card className="border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 text-left border-b border-zinc-100 dark:border-zinc-850">
        <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Recent Conversations
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex-1 text-left">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center">
            <p className="text-sm text-zinc-400 dark:text-zinc-500">No recent conversations.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {conversations.map((title, idx) => (
              <li key={idx} className="flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate" title={title}>
                      {title}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Active thread</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shrink-0" />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
export default RecentConversationsCard
