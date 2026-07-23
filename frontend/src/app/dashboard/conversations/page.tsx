import { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import {
  MessageSquare,
  Search,
  X,
  Pencil,
  Trash2,
  ArrowRight,
  Clock,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../../../components/ui/button'
import { EmptyState } from '../../../components/common/EmptyState'
import { ErrorState } from '../../../components/common/ErrorState'
import { SkeletonCard } from '../../../components/common/LoadingSkeleton'
import { RenameDialog } from '../../../components/conversation/RenameDialog'
import { ConfirmationDialog } from '../../../components/common/ConfirmationDialog'
import {
  getConversations,
  renameConversation,
  deleteConversation,
} from '../../../services/conversations'
import { useChatStore } from '../../../store/chat'
import { useAuthStore } from '../../../store/auth'
import { getRoleHomePath } from '../../../lib/roleRoutes'
import type { Conversation } from '../../../types/chat'

function formatDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffDays === 0)
    return `Today at ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7)
    return d.toLocaleDateString([], { weekday: 'long' })
  return d.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })
}

interface ConversationRowProps {
  conversation: Conversation
  onContinue: (id: number) => void
  onRename: (c: Conversation) => void
  onDelete: (c: Conversation) => void
}

function ConversationRow({
  conversation,
  onContinue,
  onRename,
  onDelete,
}: ConversationRowProps) {
  return (
    <div className="group flex items-center gap-4 px-5 py-4 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 hover:border-purple-300/60 dark:hover:border-purple-700/40 hover:shadow-sm transition-all duration-200">
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0 border border-purple-100 dark:border-purple-800/30">
        <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate leading-tight">
          {conversation.title}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Clock className="w-3 h-3 text-zinc-400 dark:text-zinc-600 shrink-0" />
          <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
            {formatDate(conversation.updated_at)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <button
          onClick={() => onRename(conversation)}
          title="Rename"
          aria-label={`Rename conversation: ${conversation.title}`}
          className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(conversation)}
          title="Delete"
          aria-label={`Delete conversation: ${conversation.title}`}
          className="p-2 rounded-lg text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onContinue(conversation.id)}
          title="Continue conversation"
          aria-label={`Continue conversation: ${conversation.title}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors cursor-pointer"
        >
          Continue
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}

export default function ConversationsPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { setActiveConversationId } = useChatStore()
  const { user } = useAuthStore()
  const [search, setSearch] = useState('')
  const [renameTarget, setRenameTarget] = useState<Conversation | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Conversation | null>(null)

  const {
    data: conversations = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: getConversations,
  })

  const filtered = useMemo(() => {
    if (!search.trim()) return conversations
    const q = search.toLowerCase()
    return conversations.filter((c) => c.title.toLowerCase().includes(q))
  }, [conversations, search])

  const renameMutation = useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      renameConversation(id, { title }),
    onMutate: async ({ id, title }) => {
      await queryClient.cancelQueries({ queryKey: ['conversations'] })
      const previous = queryClient.getQueryData<Conversation[]>(['conversations'])
      queryClient.setQueryData<Conversation[]>(['conversations'], (old = []) =>
        old.map((c) => (c.id === id ? { ...c, title } : c))
      )
      return { previous }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['conversations'], context.previous)
      }
      toast.error('Failed to rename conversation')
    },
    onSuccess: () => {
      toast.success('Conversation renamed')
      setRenameTarget(null)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteConversation(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['conversations'] })
      const previous = queryClient.getQueryData<Conversation[]>(['conversations'])
      queryClient.setQueryData<Conversation[]>(['conversations'], (old = []) =>
        old.filter((c) => c.id !== id)
      )
      return { previous }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['conversations'], context.previous)
      }
      toast.error('Failed to delete conversation')
    },
    onSuccess: () => {
      toast.success('Conversation deleted')
      setDeleteTarget(null)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
  })

  const handleContinue = (id: number) => {
    setActiveConversationId(id)
    navigate(user?.role === 'customer' ? '/support' : '/dashboard/chat')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-md shadow-purple-500/20">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Conversations
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {isLoading ? '…' : `${conversations.length} conversation${conversations.length !== 1 ? 's' : ''} total`}
          </p>
        </div>
      </div>

      {!isError && (
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations…"
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-purple-400 dark:focus:border-purple-600 focus:ring-2 focus:ring-purple-400/20 dark:focus:ring-purple-600/20 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : isError ? (
        <ErrorState
          title="Failed to load conversations"
          message="Could not fetch your conversations. Please check your connection and try again."
          onRetry={refetch}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title={search ? 'No results found' : 'No conversations yet'}
          description={
            search
              ? `No conversations match "${search}". Try a different search term.`
              : 'Start a new chat to create your first conversation.'
          }
          action={
            !search ? (
              <Button
                onClick={() => navigate(getRoleHomePath(user?.role))}
                className="gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Start a conversation
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <ConversationRow
              key={c.id}
              conversation={c}
              onContinue={handleContinue}
              onRename={setRenameTarget}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <RenameDialog
        open={!!renameTarget}
        currentTitle={renameTarget?.title ?? ''}
        onClose={() => setRenameTarget(null)}
        onRename={(title) => {
          if (renameTarget) renameMutation.mutate({ id: renameTarget.id, title })
        }}
        isPending={renameMutation.isPending}
      />

      <ConfirmationDialog
        open={!!deleteTarget}
        title="Delete conversation"
        description={`Are you sure you want to delete "${deleteTarget?.title ?? ''}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        isPending={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate(deleteTarget.id)
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  )
}
