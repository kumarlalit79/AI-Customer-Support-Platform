import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '../ui/table'
import { Card, CardContent } from '../ui/card'
import { DocumentRow } from './DocumentRow'
import type { Document } from '../../types/knowledge'

interface DocumentTableProps {
  documents: Document[]
  searchQuery: string
  onDeleteClick: (doc: Document) => void
  onReindex: (docId: number) => void
  reindexingIds: Record<number, boolean>
}

export const DocumentTable = ({
  documents,
  searchQuery,
  onDeleteClick,
  onReindex,
  reindexingIds,
}: DocumentTableProps) => {
  const filteredDocuments = documents.filter((doc) =>
    doc.original_filename.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card className="border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/20">
            <TableRow>
              <TableHead className="font-bold text-zinc-500 dark:text-zinc-400 pl-6 h-12">File Name</TableHead>
              <TableHead className="font-bold text-zinc-500 dark:text-zinc-400 h-12">File Type</TableHead>
              <TableHead className="font-bold text-zinc-500 dark:text-zinc-400 h-12">Upload Date</TableHead>
              <TableHead className="font-bold text-zinc-500 dark:text-zinc-400 h-12">Status</TableHead>
              <TableHead className="font-bold text-zinc-500 dark:text-zinc-400 h-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-zinc-500 dark:text-zinc-400 text-sm">
                  {documents.length === 0 ? 'No documents uploaded yet.' : 'No documents matching your search.'}
                </TableCell>
              </TableRow>
            ) : (
              filteredDocuments.map((doc) => (
                <DocumentRow
                  key={doc.id}
                  document={doc}
                  onDeleteClick={onDeleteClick}
                  onReindex={onReindex}
                  isReindexing={!!reindexingIds[doc.id]}
                />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default DocumentTable
