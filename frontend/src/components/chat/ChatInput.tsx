import { useRef, useState, useCallback, type KeyboardEvent } from 'react'
import { ArrowUp, Loader2 } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Ask anything...',
}: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-grow textarea
  const adjustHeight = useCallback(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 180) + 'px'
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    adjustHeight()
  }

  const handleSend = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [value, disabled, onSend])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const canSend = value.trim().length > 0 && !disabled

  return (
    <div className="px-4 py-3 border-t border-zinc-200/60 dark:border-zinc-700/60 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto">
        <div
          className={`flex items-end gap-3 px-4 py-3 rounded-2xl border transition-all duration-200 ${
            disabled
              ? 'bg-zinc-100 dark:bg-zinc-800/50 border-zinc-200/60 dark:border-zinc-700/60'
              : 'bg-white dark:bg-zinc-800 border-zinc-200/60 dark:border-zinc-700/60 shadow-sm focus-within:border-purple-400/70 focus-within:shadow-md focus-within:shadow-purple-500/5'
          }`}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? 'AI is generating...' : placeholder}
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none border-none min-h-[24px] max-h-[180px] leading-relaxed disabled:cursor-not-allowed"
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!canSend}
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${
              canSend
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm shadow-purple-500/30'
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            {disabled ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowUp className="w-4 h-4" />
            )}
          </button>
        </div>

        <p className="text-center text-[10px] text-zinc-400 dark:text-zinc-600 mt-2">
          Press{' '}
          <kbd className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px]">
            Enter
          </kbd>{' '}
          to send ·{' '}
          <kbd className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px]">
            Shift+Enter
          </kbd>{' '}
          for newline
        </p>
      </div>
    </div>
  )
}
