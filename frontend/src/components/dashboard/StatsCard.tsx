import React from 'react'
import { Card, CardContent } from '../ui/card'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
  gradient?: string
}

export const StatsCard = ({ title, value, icon, description, gradient }: StatsCardProps) => {
  return (
    <Card className="overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-6 relative">
        {gradient && (
          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-[0.08] dark:opacity-[0.05] rounded-bl-full pointer-events-none`} />
        )}
        <div className="flex items-center justify-between">
          <div className="space-y-1 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{title}</p>
            <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">{value}</h3>
            {description && (
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">{description}</p>
            )}
          </div>
          <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-300 shadow-sm shrink-0">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
