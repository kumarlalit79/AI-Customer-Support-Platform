import { Card, CardContent } from '../ui/card'

export const KnowledgeSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60">
            <CardContent className="p-5 space-y-2">
              <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-8 w-10 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload area skeleton */}
      <div className="h-44 bg-zinc-100 dark:bg-zinc-800/40 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700" />

      {/* Table skeleton */}
      <Card className="border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60">
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800">
          <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
        <CardContent className="p-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
              <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="flex-1 space-y-1.5">
                <div className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-3 w-1/5 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
              <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              <div className="h-8 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default KnowledgeSkeleton
