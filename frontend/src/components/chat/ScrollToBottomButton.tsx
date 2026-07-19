import { ChevronDown } from 'lucide-react'

interface ScrollToBottomButtonProps {
  onClick: () => void
  visible: boolean
}

export function ScrollToBottomButton({ onClick, visible }: ScrollToBottomButtonProps) {
  if (!visible) return null

  return (
    <button
      onClick={onClick}
      className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-zinc-800 dark:bg-zinc-700 border border-zinc-600/50 text-zinc-300 hover:text-white hover:bg-zinc-700 dark:hover:bg-zinc-600 shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer animate-in fade-in slide-in-from-bottom-2"
      aria-label="Scroll to bottom"
    >
      <ChevronDown className="w-4 h-4" />
    </button>
  )
}
