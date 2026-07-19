import { Search, X } from 'lucide-react'

interface ConversationSearchProps {
  value: string
  onChange: (v: string) => void
}

export function ConversationSearch({ value, onChange }: ConversationSearchProps) {
  return (
    <div className="relative mx-3 mb-2">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search conversations..."
        className="w-full h-8 pl-8 pr-7 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-xs text-zinc-300 placeholder-zinc-600 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}
