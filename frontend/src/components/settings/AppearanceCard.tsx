import { Palette } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Separator } from '../ui/separator'
import { ThemeToggle } from '../common/ThemeToggle'

export function AppearanceCard() {
  return (
    <Card className="border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="pt-6 px-6 pb-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <Palette className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Appearance
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Choose your preferred display theme
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Theme
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              Light, Dark, or follow your system preference
            </p>
          </div>
          <ThemeToggle />
        </div>
      </CardContent>
    </Card>
  )
}
