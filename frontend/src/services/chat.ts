import apiClient from '../lib/axios'
import type { ChatRequest, ChatResponse, Message } from '../types/chat'

// POST /chat
export const sendChatMessage = async (payload: ChatRequest): Promise<ChatResponse> => {
  const { data } = await apiClient.post<ChatResponse>('/chat', payload)
  return data
}

// GET /conversations/:id/messages
export const getConversationMessages = async (conversationId: number): Promise<Message[]> => {
  const { data } = await apiClient.get<Message[]>(`/conversations/${conversationId}/messages`)
  return data
}
