import apiClient from '../lib/axios'
import type { Conversation, RenameConversationRequest } from '../types/chat'

// GET /conversations
export const getConversations = async (): Promise<Conversation[]> => {
  const { data } = await apiClient.get<Conversation[]>('/conversations')
  return data
}

// GET /conversations/search?query=...
export const searchConversations = async (query: string): Promise<Conversation[]> => {
  const { data } = await apiClient.get<Conversation[]>('/conversations/search', {
    params: { query },
  })
  return data
}

// PATCH /conversations/:id
export const renameConversation = async (
  id: number,
  payload: RenameConversationRequest
): Promise<Conversation> => {
  const { data } = await apiClient.patch<Conversation>(`/conversations/${id}`, payload)
  return data
}

// DELETE /conversations/:id
export const deleteConversation = async (id: number): Promise<{ success: boolean }> => {
  const { data } = await apiClient.delete<{ success: boolean }>(`/conversations/${id}`)
  return data
}
