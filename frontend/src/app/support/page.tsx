import { Headphones, MessageSquarePlus, Sparkles } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ConversationSidebar } from '../../components/conversation/ConversationSidebar'
import { ChatWindow } from '../../components/chat/ChatWindow'
import { ChatInput } from '../../components/chat/ChatInput'
import { sendChatMessage } from '../../services/chat'
import { useChatStore } from '../../store/chat'

function SupportEmptyState() {
  const queryClient = useQueryClient()
  const { isGenerating, setActiveConversationId, setIsGenerating } = useChatStore()

  const sendMutation = useMutation({
    mutationFn: sendChatMessage,
    onMutate: () => {
      setIsGenerating(true)
    },
    onSuccess: (data) => {
      setActiveConversationId(data.conversation_id)
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
      queryClient.invalidateQueries({ queryKey: ['messages', data.conversation_id] })
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : 'Failed to send message'
      toast.error(msg)
    },
    onSettled: () => {
      setIsGenerating(false)
    },
  })

  const handleSend = (text: string) => {
    if (isGenerating) return
    sendMutation.mutate({
      question: text,
      conversation_id: null,
    })
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
            <Sparkles className="w-9 h-9 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-zinc-50 dark:border-zinc-950 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 tracking-tight">
          How can I help?
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm leading-relaxed">
          Ask a question and the Support Assistant will answer with confidence and source citations when available.
        </p>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
          <MessageSquarePlus className="w-4 h-4" />
          Start a conversation below
        </div>
      </div>

      <ChatInput
        onSend={handleSend}
        disabled={isGenerating}
        placeholder="Ask the Support Assistant..."
      />
    </div>
  )
}

export default function SupportPage() {
  const { activeConversationId, setActiveConversationId } = useChatStore()

  const handleNewChat = () => {
    setActiveConversationId(null)
  }

  return (
    <div
      className="
        -mx-6 -my-6
        md:-mx-10 md:-my-10
        h-[calc(100vh-4rem)]
        lg:h-screen
        flex flex-col
      "
    >
      <div className="flex h-full min-h-0 bg-zinc-50 dark:bg-zinc-950 overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm lg:rounded-none rounded-xl">
        <div className="hidden xl:flex flex-col">
          <ConversationSidebar onNewChat={handleNewChat} />
        </div>

        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          <div className="flex items-center gap-3 px-4 h-14 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 shrink-0">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center">
              <Headphones className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
              Support Assistant
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Online</span>
            </div>
          </div>

          <div className="xl:hidden border-b border-zinc-200/60 dark:border-zinc-800/60 h-56 shrink-0">
            <ConversationSidebar onNewChat={handleNewChat} />
          </div>

          {activeConversationId ? (
            <ChatWindow conversationId={activeConversationId} />
          ) : (
            <SupportEmptyState />
          )}
        </div>
      </div>
    </div>
  )
}
