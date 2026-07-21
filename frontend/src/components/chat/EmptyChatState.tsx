import { MessageSquarePlus, Sparkles, KeyRound, Receipt, BookOpen, HelpCircle } from 'lucide-react'
import { ChatInput } from './ChatInput'
import { useChatStore } from '../../store/chat'

interface EmptyChatStateProps {
  onFirstSend: (text: string) => void
}

const SUGGESTIONS = [
  { icon: KeyRound, text: 'How do I reset my password?', color: 'text-amber-500' },
  { icon: Receipt, text: 'What is your refund policy?', color: 'text-blue-500' },
  { icon: BookOpen, text: 'Where can I find the API documentation?', color: 'text-purple-500' },
  { icon: HelpCircle, text: 'How can I contact support?', color: 'text-emerald-500' },
]

export function EmptyChatState({ onFirstSend }: EmptyChatStateProps) {
  const { isGenerating } = useChatStore()

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Centered hero content */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center p-8 text-center select-none">
          {/* Hero icon */}
          <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
            <Sparkles className="w-9 h-9 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-zinc-50 dark:border-zinc-950 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 tracking-tight">
          How can we help you today?
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm leading-relaxed">
          Ask questions about products, policies, troubleshooting, documentation, or anything available in our knowledge base.
        </p>

        {/* Suggestion chips — clicking sends the suggestion as the first message */}
        <div className="flex flex-col gap-2 w-full max-w-sm mb-4">
          {SUGGESTIONS.map(({ icon: Icon, text, color }) => (
            <button
              key={text}
              onClick={() => onFirstSend(text)}
              disabled={isGenerating}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 hover:border-purple-400/50 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 text-left group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon className={`w-4 h-4 shrink-0 ${color}`} />
              <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                {text}
              </span>
            </button>
          ))}
        </div>

        {/* New chat hint */}
        <button
          onClick={() => {}} // Already on the new chat screen
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm font-medium transition-all duration-200 cursor-default"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Or type your question below
        </button>
        </div>
      </div>

      {/* Input area — functional, sends the first message and creates the conversation */}
      <ChatInput
        onSend={onFirstSend}
        disabled={isGenerating}
        placeholder="Start a new conversation..."
      />
    </div>
  )
}

