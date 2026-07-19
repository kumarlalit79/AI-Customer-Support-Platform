import { create } from 'zustand'
import type { ChatState } from '../types/chat'

export const useChatStore = create<ChatState>()((set) => ({
  activeConversationId: null,
  isGenerating: false,
  isSidebarOpen: true,

  setActiveConversationId: (id) => set({ activeConversationId: id }),
  setIsGenerating: (v) => set({ isGenerating: v }),
  setSidebarOpen: (v) => set({ isSidebarOpen: v }),
}))
