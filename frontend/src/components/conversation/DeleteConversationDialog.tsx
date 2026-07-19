import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { AlertTriangle } from 'lucide-react'

interface DeleteConversationDialogProps {
  open: boolean
  title: string
  onClose: () => void
  onConfirm: () => void
  isPending?: boolean
}

export function DeleteConversationDialog({
  open,
  title,
  onClose,
  onConfirm,
  isPending = false,
}: DeleteConversationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            Delete conversation
          </DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              &ldquo;{title}&rdquo;
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
