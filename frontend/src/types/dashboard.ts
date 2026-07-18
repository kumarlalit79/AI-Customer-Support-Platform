export interface FileTypeCount {
  pdf: number
  txt: number
  docx: number
  markdown: number
  faq: number
}

export interface DashboardData {
  total_documents: number
  total_conversations: number
  total_messages: number
  recent_uploads: string[]
  recent_conversations: string[]
  file_types: FileTypeCount
}
