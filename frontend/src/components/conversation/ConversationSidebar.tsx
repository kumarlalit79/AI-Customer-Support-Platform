import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MessageSquare } from 'lucide-react'
import { ConversationItem } from './ConversationItem'
import { ConversationSearch } from './ConversationSearch'
import { NewChatButton } from './NewChatButton'
import { ConversationListSkeleton } from '../chat/ChatSkeleton'
import { getConversations } from '../../services/conversations'
import { useChatStore } from '../../store/chat'
import type { Conversation } from '../../types/chat'

interface ConversationSidebarProps {
  onNewChat: () => void
}

export function ConversationSidebar({ onNewChat }: ConversationSidebarProps) {
  const { activeConversationId, setActiveConversationId } = useChatStore()
  const [search, setSearch] = useState('')

  const { data: conversations = [], isLoading } = useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: getConversations,
    refetchInterval: 30_000,
  })

  // Client-side filtering (instant feedback; server search available via BE /search endpoint)
  const filtered = useMemo(() => {
    if (!search.trim()) return conversations
    return conversations.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [conversations, search])

  // Group by relative date
  const today = new Date()
  const todayStr = today.toDateString()
  const yesterdayStr = new Date(today.getTime() - 86400000).toDateString()

  function getGroup(iso: string): string {
    const d = new Date(iso)
    const ds = d.toDateString()
    if (ds === todayStr) return 'Today'
    if (ds === yesterdayStr) return 'Yesterday'
    const diff = Math.floor((today.getTime() - d.getTime()) / 86400000)
    if (diff < 7) return 'This week'
    if (diff < 30) return 'This month'
    return 'Older'
  }

  const grouped = useMemo(() => {
    const order = ['Today', 'Yesterday', 'This week', 'This month', 'Older']
    const map = new Map<string, Conversation[]>()
    for (const c of filtered) {
      const g = getGroup(c.updated_at)
      if (!map.has(g)) map.set(g, [])
      map.get(g)!.push(c)
    }
    return order.filter((k) => map.has(k)).map((k) => ({ label: k, items: map.get(k)! }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered])

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200/60 dark:border-zinc-800 w-64 shrink-0 select-none">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-zinc-200/60 dark:border-zinc-800">
        <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
          Conversations
        </h2>
        <NewChatButton onClick={onNewChat} />
        <ConversationSearch value={search} onChange={setSearch} />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto py-2">
        {isLoading ? (
          <ConversationListSkeleton />
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 px-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-zinc-600" />
            </div>
            <p className="text-xs text-zinc-500">
              {search ? 'No results found' : 'No conversations yet'}
            </p>
            {!search && (
              <p className="text-[10px] text-zinc-600">
                Start a new conversation to get going
              </p>
            )}
          </div>
        ) : (
          grouped.map(({ label, items }) => (
            <div key={label} className="mb-3">
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                {label}
              </p>
              <div className="px-2 space-y-0.5">
                {items.map((c) => (
                  <ConversationItem
                    key={c.id}
                    conversation={c}
                    isActive={c.id === activeConversationId}
                    onClick={() => setActiveConversationId(c.id)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
