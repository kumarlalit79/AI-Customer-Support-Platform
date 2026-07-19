import { SquarePen } from 'lucide-react'

interface NewChatButtonProps {
  onClick: () => void
}

export function NewChatButton({ onClick }: NewChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 mx-3 mb-3 px-3 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold w-[calc(100%-24px)] transition-all duration-200 shadow-md shadow-purple-900/30 cursor-pointer group"
      aria-label="New conversation"
    >
      <SquarePen className="w-3.5 h-3.5 group-hover:rotate-6 transition-transform duration-200 shrink-0" />
      <span>New Conversation</span>
    </button>
  )
}
