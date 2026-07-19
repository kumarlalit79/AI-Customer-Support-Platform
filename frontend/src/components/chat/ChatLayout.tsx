import { useState } from 'react'
import { PanelLeftClose, PanelLeftOpen, Sparkles } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ConversationSidebar } from '../conversation/ConversationSidebar'
import { ChatWindow } from './ChatWindow'
import { EmptyChatState } from './EmptyChatState'
import { useChatStore } from '../../store/chat'
import { sendChatMessage } from '../../services/chat'

export function ChatLayout() {
  const queryClient = useQueryClient()
  const { activeConversationId, setActiveConversationId, setIsGenerating } = useChatStore()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleNewChat = () => {
    // New chat: clear active conversation, then ChatWindow will create one on first send
    setActiveConversationId(null)
  }

  /**
   * Handles sending the FIRST message when no conversation exists yet.
   * POSTs to /chat with no conversation_id, backend creates one and returns it,
   * then we set it as active so ChatWindow takes over.
   */
  const handleFirstSend = async (text: string) => {
    if (!text.trim()) return
    setIsGenerating(true)
    try {
      const response = await sendChatMessage({ question: text, conversation_id: null })
      setActiveConversationId(response.conversation_id)
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send message'
      toast.error(msg)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex h-full min-h-0 bg-zinc-50 dark:bg-zinc-950 rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
      {/* ── Sidebar (desktop) ──────────────────────────────────────────────── */}
      <div
        className={`hidden lg:flex flex-col transition-all duration-300 overflow-hidden ${
          sidebarOpen ? 'w-64' : 'w-0'
        }`}
      >
        <ConversationSidebar onNewChat={handleNewChat} />
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 flex flex-col h-full">
            <ConversationSidebar onNewChat={handleNewChat} />
          </div>
        </div>
      )}

      {/* ── Main chat area ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Topbar */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 shrink-0">
          {/* Toggle sidebar */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeftOpen className="w-4 h-4" />
            )}
          </button>

          {/* Title */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
              {activeConversationId ? 'AI Chat Agent' : 'Support AI'}
            </span>
          </div>

          {/* Status indicator */}
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Online</span>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col min-h-0">
          {activeConversationId ? (
            <ChatWindow conversationId={activeConversationId} />
          ) : (
            <EmptyChatState onFirstSend={handleFirstSend} />
          )}
        </div>
      </div>
    </div>
  )
}

