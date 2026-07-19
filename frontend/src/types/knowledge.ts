export interface Document {
  id: number
  filename: string
  original_filename: string
  status: 'PROCESSING' | 'READY' | 'FAILED' | string
  created_at?: string
}

export interface KnowledgeStatistics {
  total_documents: number
  total_pdf: number
  total_txt: number
  total_docx: number
  total_markdown: number
  total_faq: number
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQUploadPayload {
  title: string
  faqs: FAQItem[]
}

export type UploadableFileType = 'pdf' | 'txt' | 'docx' | 'markdown' | 'faq'
