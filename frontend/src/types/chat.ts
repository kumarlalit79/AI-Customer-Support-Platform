// ─── Source & Chat Types ─────────────────────────────────────────────────────

export interface Source {
  filename: string
  page: number
}

export interface ChatRequest {
  question: string
  conversation_id?: number | null
}

export interface ChatResponse {
  success: boolean
  conversation_id: number
  answer: string
  confidence: number
  sources: Source[]
  error?: string | null
}

// ─── Conversation Types ───────────────────────────────────────────────────────

export interface Conversation {
  id: number
  title: string
  created_at: string
  updated_at: string
}

export interface RenameConversationRequest {
  title: string
}

// ─── Message Types ────────────────────────────────────────────────────────────

export type MessageRole = 'user' | 'assistant'

export interface Message {
  id: number
  conversation_id: number
  role: MessageRole
  content: string
  created_at: string
  // Client-side enriched fields (added after receiving ChatResponse)
  confidence?: number
  sources?: Source[]
}

// ─── UI State Types ───────────────────────────────────────────────────────────

export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface TypingStage {
  label: string
  duration: number
}

export interface ChatState {
  activeConversationId: number | null
  isGenerating: boolean
  isSidebarOpen: boolean
  setActiveConversationId: (id: number | null) => void
  setIsGenerating: (v: boolean) => void
  setSidebarOpen: (v: boolean) => void
}
