import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface RenameDialogProps {
  open: boolean
  currentTitle: string
  onClose: () => void
  onRename: (title: string) => void
  isPending?: boolean
}

export function RenameDialog({
  open,
  currentTitle,
  onClose,
  onRename,
  isPending = false,
}: RenameDialogProps) {
  const [title, setTitle] = useState(currentTitle)

  useEffect(() => {
    if (open) setTitle(currentTitle)
  }, [open, currentTitle])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onRename(trimmed)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename conversation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="conversation-title">Title</Label>
            <Input
              id="conversation-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a new title..."
              autoFocus
              maxLength={100}
            />
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
              type="submit"
              disabled={!title.trim() || isPending}
            >
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
