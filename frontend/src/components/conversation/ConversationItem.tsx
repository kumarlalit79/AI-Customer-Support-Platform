import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal, Pencil, Trash2, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import { RenameDialog } from './RenameDialog'
import { DeleteConversationDialog } from './DeleteConversationDialog'
import { renameConversation, deleteConversation } from '../../services/conversations'
import { useChatStore } from '../../store/chat'
import type { Conversation } from '../../types/chat'

interface ConversationItemProps {
  conversation: Conversation
  isActive: boolean
  onClick: () => void
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffDays === 0) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return d.toLocaleDateString([], { weekday: 'short' })
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

export function ConversationItem({ conversation, isActive, onClick }: ConversationItemProps) {
  const queryClient = useQueryClient()
  const { setActiveConversationId } = useChatStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [renameOpen, setRenameOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  // ─── Rename ─────────────────────────────────────────────────────────────────
  const renameMutation = useMutation({
    mutationFn: (title: string) => renameConversation(conversation.id, { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
      setRenameOpen(false)
      toast.success('Conversation renamed')
    },
    onError: () => toast.error('Failed to rename conversation'),
  })

  // ─── Delete ─────────────────────────────────────────────────────────────────
  const deleteMutation = useMutation({
    mutationFn: () => deleteConversation(conversation.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
      if (isActive) setActiveConversationId(null)
      setDeleteOpen(false)
      toast.success('Conversation deleted')
    },
    onError: () => toast.error('Failed to delete conversation'),
  })

  return (
    <>
      <div
        className={`group relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
          isActive
            ? 'bg-purple-100 dark:bg-purple-600/20 border border-purple-200 dark:border-purple-500/30 text-purple-900 dark:text-zinc-100'
            : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
        }`}
        onClick={onClick}
      >
        {/* Icon */}
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
            isActive
              ? 'bg-purple-200 dark:bg-purple-600/40 text-purple-700 dark:text-purple-300'
              : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-400'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold truncate leading-tight">{conversation.title}</p>
          <p className="text-[10px] text-zinc-600 mt-0.5">{formatDate(conversation.updated_at)}</p>
        </div>

        {/* Context menu trigger */}
        <button
          className={`p-1 rounded-lg transition-all duration-150 cursor-pointer shrink-0 ${
            menuOpen
              ? 'opacity-100 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-300'
              : 'opacity-0 group-hover:opacity-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300'
          }`}
          onClick={(e) => {
            e.stopPropagation()
            setMenuOpen((v) => !v)
          }}
          aria-label="Conversation options"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={(e) => {
                e.stopPropagation()
                setMenuOpen(false)
              }}
            />
            <div className="absolute right-0 top-8 z-50 w-40 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 shadow-xl overflow-hidden py-1">
              <button
                className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuOpen(false)
                  setRenameOpen(true)
                }}
              >
                <Pencil className="w-3.5 h-3.5" />
                Rename
              </button>
              <button
                className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuOpen(false)
                  setDeleteOpen(true)
                }}
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Dialogs */}
      <RenameDialog
        open={renameOpen}
        currentTitle={conversation.title}
        onClose={() => setRenameOpen(false)}
        onRename={(title) => renameMutation.mutate(title)}
        isPending={renameMutation.isPending}
      />
      <DeleteConversationDialog
        open={deleteOpen}
        title={conversation.title}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
        isPending={deleteMutation.isPending}
      />
    </>
  )
}
