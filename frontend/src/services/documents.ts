import apiClient from '../lib/axios'
import type { Document, KnowledgeStatistics, FAQUploadPayload } from '../types/knowledge'

export const documentService = {
  // GET all documents
  getDocuments: async (): Promise<Document[]> => {
    const response = await apiClient.get<Document[]>('/documents')
    return response.data
  },

  // GET statistics
  getStatistics: async (): Promise<KnowledgeStatistics> => {
    const response = await apiClient.get<KnowledgeStatistics>('/documents/statistics')
    return response.data
  },

  // Upload generic (PDF via multipart/form-data)
  uploadDocument: async (file: File): Promise<Document> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await apiClient.post<Document>('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  // Upload TXT
  uploadTxt: async (file: File): Promise<Document> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await apiClient.post<Document>('/documents/upload/txt', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  // Upload DOCX
  uploadDocx: async (file: File): Promise<Document> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await apiClient.post<Document>('/documents/upload/docx', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  // Upload Markdown
  uploadMarkdown: async (file: File): Promise<Document> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await apiClient.post<Document>('/documents/upload/markdown', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  // Upload FAQ (JSON body)
  uploadFaq: async (payload: FAQUploadPayload): Promise<Document> => {
    const response = await apiClient.post<Document>('/documents/upload/faq', payload)
    return response.data
  },

  // DELETE document
  deleteDocument: async (documentId: number): Promise<{ success: boolean }> => {
    const response = await apiClient.delete<{ success: boolean }>(`/documents/${documentId}`)
    return response.data
  },

  // REINDEX document
  reindexDocument: async (documentId: number): Promise<Document> => {
    const response = await apiClient.post<Document>(`/documents/${documentId}/reindex`)
    return response.data
  },
}
