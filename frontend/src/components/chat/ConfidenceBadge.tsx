import type { ConfidenceLevel } from '../../types/chat'

interface ConfidenceBadgeProps {
  confidence: number
}

function getLevel(confidence: number): ConfidenceLevel {
  if (confidence >= 0.8) return 'high'
  if (confidence >= 0.5) return 'medium'
  return 'low'
}

const levelConfig: Record<
  ConfidenceLevel,
  { label: string; classes: string; dot: string }
> = {
  high: {
    label: 'High',
    classes:
      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  medium: {
    label: 'Medium',
    classes:
      'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    dot: 'bg-amber-500',
  },
  low: {
    label: 'Low',
    classes:
      'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
    dot: 'bg-rose-500',
  },
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  const level = getLevel(confidence)
  const { label, classes, dot } = levelConfig[level]
  const pct = Math.round(confidence * 100)

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${classes}`}
      title={`Confidence: ${pct}%`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label} confidence
    </span>
  )
}
