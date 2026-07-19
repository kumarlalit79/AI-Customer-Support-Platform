import { useEffect, useRef, useState, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { UserMessage, AssistantMessage } from './ChatBubble'
import { TypingLoader } from './TypingLoader'
import { ChatInput } from './ChatInput'
import { ChatSkeleton } from './ChatSkeleton'
import { ErrorState } from './ErrorState'
import { ScrollToBottomButton } from './ScrollToBottomButton'
import { getConversationMessages, sendChatMessage } from '../../services/chat'
import { useChatStore } from '../../store/chat'
import type { Message, Source } from '../../types/chat'

interface ChatWindowProps {
  conversationId: number
}

export function ChatWindow({ conversationId }: ChatWindowProps) {
  const queryClient = useQueryClient()
  const { isGenerating, setIsGenerating, setActiveConversationId } = useChatStore()
  const bottomRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showScrollBtn, setShowScrollBtn] = useState(false)

  // ─── Fetch messages ─────────────────────────────────────────────────────────
  const {
    data: messages = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => getConversationMessages(conversationId),
    enabled: !!conversationId,
  })

  // ─── Send message mutation ───────────────────────────────────────────────────
  // We maintain a local optimistic list for the current session
  const [localMessages, setLocalMessages] = useState<Message[]>([])

  // Sync on fresh load
  useEffect(() => {
    setLocalMessages(messages)
  }, [messages])

  const sendMutation = useMutation({
    mutationFn: sendChatMessage,
    onMutate: (variables) => {
      setIsGenerating(true)
      // Optimistically add user message
      const optimisticUser: Message = {
        id: Date.now(),
        conversation_id: conversationId,
        role: 'user',
        content: variables.question,
        created_at: new Date().toISOString(),
      }
      setLocalMessages((prev) => [...prev, optimisticUser])
    },
    onSuccess: (data) => {
      // If backend created a new conversation, update active
      if (data.conversation_id && data.conversation_id !== conversationId) {
        setActiveConversationId(data.conversation_id)
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        conversation_id: data.conversation_id,
        role: 'assistant',
        content: data.answer,
        created_at: new Date().toISOString(),
        confidence: data.confidence,
        sources: data.sources as Source[],
      }
      setLocalMessages((prev) => [...prev, aiMessage])

      // Invalidate conversations list (title may have been auto-set)
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

  // ─── Auto-scroll ─────────────────────────────────────────────────────────────
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    bottomRef.current?.scrollIntoView({ behavior })
  }, [])

  useEffect(() => {
    scrollToBottom('smooth')
  }, [localMessages, isGenerating, scrollToBottom])

  // ─── Scroll-to-bottom button visibility ──────────────────────────────────────
  const handleScroll = () => {
    const el = scrollContainerRef.current
    if (!el) return
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    setShowScrollBtn(distFromBottom > 200)
  }

  // ─── Send handler ─────────────────────────────────────────────────────────────
  const handleSend = (text: string) => {
    if (isGenerating) return
    sendMutation.mutate({
      question: text,
      conversation_id: conversationId,
    })
  }

  // ─── Loading & error states ──────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <ChatSkeleton />
        <ChatInput onSend={handleSend} disabled />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <ErrorState
          title="Failed to load messages"
          message="Could not fetch the conversation history. Please try again."
          onRetry={refetch}
        />
        <ChatInput onSend={handleSend} disabled />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      {/* Messages scroll area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto scroll-smooth"
      >
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {localMessages.map((msg) =>
            msg.role === 'user' ? (
              <UserMessage key={msg.id} message={msg} />
            ) : (
              <AssistantMessage
                key={msg.id}
                message={msg}
                onRegenerate={() => {
                  // UI-only placeholder
                  toast.info('Regenerate is not yet implemented.')
                }}
              />
            )
          )}

          {/* Typing indicator */}
          {isGenerating && <TypingLoader />}

          {/* Scroll anchor */}
          <div ref={bottomRef} className="h-1" />
        </div>
      </div>

      {/* Scroll-to-bottom button */}
      <ScrollToBottomButton
        visible={showScrollBtn}
        onClick={() => scrollToBottom('smooth')}
      />

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isGenerating} />
    </div>
  )
}
