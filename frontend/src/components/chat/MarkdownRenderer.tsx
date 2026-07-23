import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { CodeBlock } from './CodeBlock'

interface MarkdownRendererProps {
  content: string
}

const components: Components = {
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    const isInline = !match
    const code = String(children).replace(/\n$/, '')

    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded-md text-sm font-mono bg-zinc-100 dark:bg-zinc-800 text-purple-600 dark:text-purple-400 border border-zinc-200/70 dark:border-zinc-700/70"
          {...props}
        >
          {children}
        </code>
      )
    }

    return <CodeBlock language={match[1]}>{code}</CodeBlock>
  },

  // Headings
  h1: ({ children }) => (
    <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-5 mb-3 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mt-4 mb-2 leading-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mt-3 mb-2">
      {children}
    </h3>
  ),

  // Paragraph
  p: ({ children }) => (
    <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 mb-3 last:mb-0">
      {children}
    </p>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-5 mb-3 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-5 mb-3 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-purple-400 dark:border-purple-600 pl-4 py-1 my-3 text-sm italic text-zinc-600 dark:text-zinc-400 bg-purple-50/50 dark:bg-purple-900/10 rounded-r-lg">
      {children}
    </blockquote>
  ),

  // Table
  table: ({ children }) => (
    <div className="overflow-x-auto my-4 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-zinc-100/80 dark:bg-zinc-800/80">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-700/60">{children}</tbody>
  ),
  tr: ({ children }) => <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-2.5 text-left font-semibold text-zinc-700 dark:text-zinc-300 text-xs uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-400">{children}</td>
  ),

  // Horizontal rule
  hr: () => <hr className="my-4 border-zinc-200 dark:border-zinc-700" />,

  // Strong / Em
  strong: ({ children }) => (
    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-zinc-600 dark:text-zinc-400">{children}</em>
  ),

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
    >
      {children}
    </a>
  ),
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose-sm max-w-none">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  )
}
