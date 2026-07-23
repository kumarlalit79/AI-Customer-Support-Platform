import { useState } from 'react'
import { Check, Copy, RefreshCw, Sparkles } from 'lucide-react'
import { MarkdownRenderer } from './MarkdownRenderer'
import { SourceCard } from './SourceCard'
import { ConfidenceBadge } from './ConfidenceBadge'
import type { Message } from '../../types/chat'

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}


interface UserMessageProps {
  message: Message
}

export function UserMessage({ message }: UserMessageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 
    }
  }

  return (
    <div className="flex flex-col items-end gap-1 group">
      <div className="flex items-start gap-2 flex-row-reverse">
        <div className="w-8 h-8 rounded-full bg-zinc-700 border border-zinc-600 flex items-center justify-center shrink-0 text-xs font-bold text-zinc-300 select-none">
          U
        </div>

        <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-tr-sm bg-purple-600 text-white shadow-md shadow-purple-700/20">
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-[10px] text-zinc-500">{formatTime(message.created_at)}</span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors cursor-pointer"
          aria-label="Copy message"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>
    </div>
  )
}


interface AssistantMessageProps {
  message: Message
  onRegenerate?: () => void
}

export function AssistantMessage({ message, onRegenerate }: AssistantMessageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex flex-col items-start gap-1 group">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shrink-0 shadow-md">
          <Sparkles className="w-4 h-4 text-white" />
        </div>

        {/* Bubble */}
        <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tl-sm bg-white dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm">
          <MarkdownRenderer content={message.content} />

          {/* Confidence badge */}
          {message.confidence !== undefined && (
            <div className="mt-3">
              <ConfidenceBadge confidence={message.confidence} />
            </div>
          )}

          {/* Sources */}
          {message.sources && message.sources.length > 0 && (
            <SourceCard sources={message.sources} />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 px-11 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-[10px] text-zinc-500">{formatTime(message.created_at)}</span>

        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors cursor-pointer"
          aria-label="Copy message"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
        </button>

        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors cursor-pointer"
            aria-label="Regenerate response"
            title="Regenerate (UI only)"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  )
}
