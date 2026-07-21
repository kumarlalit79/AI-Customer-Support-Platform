import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

const STAGES = [
  { label: 'Searching sources...', duration: 1200 },
  { label: 'Thinking...', duration: 1400 },
  { label: 'Generating response...', duration: Infinity },
]

export function TypingLoader() {
  const [stageIndex, setStageIndex] = useState(0)

  useEffect(() => {
    if (stageIndex >= STAGES.length - 1) return
    const timer = setTimeout(() => {
      setStageIndex((prev) => Math.min(prev + 1, STAGES.length - 1))
    }, STAGES[stageIndex].duration)
    return () => clearTimeout(timer)
  }, [stageIndex])

  return (
    <div className="flex items-start gap-3 px-4 py-3">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shrink-0 shadow-md">
        <Sparkles className="w-4 h-4 text-white" />
      </div>

      {/* Bubble */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl rounded-tl-sm bg-white dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm max-w-xs">
        {/* Dots */}
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-purple-500/80 animate-pulse"
            style={{ animationDelay: '0ms', animationDuration: '1.2s' }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-purple-500/80 animate-pulse"
            style={{ animationDelay: '200ms', animationDuration: '1.2s' }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-purple-500/80 animate-pulse"
            style={{ animationDelay: '400ms', animationDuration: '1.2s' }}
          />
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium transition-opacity duration-300">
          {STAGES[stageIndex].label}
        </span>
      </div>
    </div>
  )
}
