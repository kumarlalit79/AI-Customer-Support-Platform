import { Card, CardContent } from '../ui/card'

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-2.5">
                <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                <div className="h-8 w-12 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
              </div>
              <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-11 h-11 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  <div className="h-6 w-8 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i} className="border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60">
            <div className="p-5 border-b border-zinc-100 dark:border-zinc-800">
              <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            </div>
            <CardContent className="p-5 space-y-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3.5 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                    <div className="h-2.5 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
export default DashboardSkeleton
