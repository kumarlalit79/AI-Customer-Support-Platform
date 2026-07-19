/**
 * Conversations Zustand store.
 *
 * Holds UI-level state related to the conversations list:
 * search query, selected conversation for dialogs, etc.
 * Data fetching is handled by TanStack Query (not stored here).
 */
import { create } from 'zustand'
import type { Conversation } from '../types/chat'

interface ConversationsState {
  // Search query (shared between sidebar and full page)
  searchQuery: string
  setSearchQuery: (q: string) => void

  // Dialog targets
  renameTarget: Conversation | null
  deleteTarget: Conversation | null
  setRenameTarget: (c: Conversation | null) => void
  setDeleteTarget: (c: Conversation | null) => void
}

export const useConversationsStore = create<ConversationsState>()((set) => ({
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  renameTarget: null,
  deleteTarget: null,
  setRenameTarget: (c) => set({ renameTarget: c }),
  setDeleteTarget: (c) => set({ deleteTarget: c }),
}))
