import { AlertTriangle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'

type VariantKey = 'destructive' | 'warning' | 'default'

const variantConfig: Record<
  VariantKey,
  { iconClass: string; titleClass: string; confirmVariant: 'destructive' | 'default' }
> = {
  destructive: {
    iconClass: 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/40',
    titleClass: 'text-red-600 dark:text-red-400',
    confirmVariant: 'destructive',
  },
  warning: {
    iconClass: 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/40',
    titleClass: 'text-amber-600 dark:text-amber-400',
    confirmVariant: 'default',
  },
  default: {
    iconClass: 'text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700',
    titleClass: 'text-zinc-900 dark:text-zinc-100',
    confirmVariant: 'default',
  },
}

interface ConfirmationDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: VariantKey
  isPending?: boolean
  onConfirm: () => void
  onClose: () => void
}

/**
 * Generic confirmation dialog with variant support (destructive / warning / default).
 * Used for logout, delete, and other irreversible actions.
 */
export function ConfirmationDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  isPending = false,
  onConfirm,
  onClose,
}: ConfirmationDialogProps) {
  const cfg = variantConfig[variant]

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle
            className={cn('flex items-center gap-2.5', cfg.titleClass)}
          >
            <span
              className={cn(
                'w-8 h-8 rounded-xl flex items-center justify-center border shrink-0',
                cfg.iconClass
              )}
            >
              <AlertTriangle className="w-4 h-4" />
            </span>
            {title}
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 py-2 leading-relaxed">
          {description}
        </p>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="cursor-pointer"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={cfg.confirmVariant}
            onClick={onConfirm}
            disabled={isPending}
            className="cursor-pointer min-w-[88px]"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Processing…
              </span>
            ) : (
              confirmLabel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
