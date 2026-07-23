import { cn } from '../../lib/utils'

interface LoadingSkeletonProps {
  className?: string
  lines?: number
  rounded?: boolean
}


export function LoadingSkeleton({
  className,
  lines = 1,
  rounded = false,
}: LoadingSkeletonProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 animate-pulse bg-zinc-200 dark:bg-zinc-700/60',
            rounded ? 'rounded-full' : 'rounded-md',
            // Vary widths naturally
            i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-4/5' : 'w-3/5'
          )}
        />
      ))}
    </div>
  )
}

export function SkeletonLine({
  width = 'w-full',
  height = 'h-4',
}: {
  width?: string
  height?: string
}) {
  return (
    <div
      className={cn(
        'rounded-full animate-pulse bg-zinc-200 dark:bg-zinc-700/60',
        width,
        height
      )}
    />
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3',
        'bg-white dark:bg-zinc-900',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-zinc-200 dark:bg-zinc-700/60 animate-pulse shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonLine width="w-2/3" />
          <SkeletonLine width="w-1/3" height="h-3" />
        </div>
      </div>
      <SkeletonLine width="w-full" height="h-3" />
      <SkeletonLine width="w-4/5" height="h-3" />
    </div>
  )
}

export function SkeletonStatCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-4',
        'bg-white dark:bg-zinc-900',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <SkeletonLine width="w-24" height="h-3" />
        <div className="w-9 h-9 rounded-xl bg-zinc-200 dark:bg-zinc-700/60 animate-pulse" />
      </div>
      <SkeletonLine width="w-20" height="h-7" />
      <SkeletonLine width="w-32" height="h-3" />
    </div>
  )
}
