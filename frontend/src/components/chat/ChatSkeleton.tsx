function SkeletonLine({ width = 'w-full' }: { width?: string }) {
  return (
    <div
      className={`h-3 rounded-full bg-zinc-200 dark:bg-zinc-700/60 animate-pulse ${width}`}
    />
  )
}

function SkeletonBubble({ isUser = false }: { isUser?: boolean }) {
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse shrink-0" />

      {/* Bubble */}
      <div
        className={`rounded-2xl px-4 py-3 space-y-2 ${
          isUser
            ? 'bg-purple-100 dark:bg-purple-900/30 w-48 rounded-tr-sm'
            : 'bg-zinc-100 dark:bg-zinc-800/60 w-80 rounded-tl-sm'
        }`}
      >
        <SkeletonLine width={isUser ? 'w-32' : 'w-full'} />
        {!isUser && (
          <>
            <SkeletonLine width="w-11/12" />
            <SkeletonLine width="w-3/4" />
          </>
        )}
      </div>
    </div>
  )
}

export function ChatSkeleton() {
  return (
    <div className="flex-1 overflow-hidden flex flex-col px-4 py-6 gap-6">
      <SkeletonBubble isUser />
      <SkeletonBubble />
      <SkeletonBubble isUser />
      <SkeletonBubble />
    </div>
  )
}

export function ConversationListSkeleton() {
  return (
    <div className="space-y-1 px-2 py-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="px-3 py-3 rounded-xl flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-700/50 animate-pulse shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 rounded-full bg-zinc-700/50 animate-pulse w-3/4" />
            <div className="h-2.5 rounded-full bg-zinc-700/30 animate-pulse w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
