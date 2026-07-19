import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  language: string
  children: string
}

const SUPPORTED = new Set([
  'python', 'javascript', 'typescript', 'java', 'csharp',
  'cpp', 'json', 'sql', 'bash', 'shell', 'sh',
])

function normalizeLanguage(lang: string): string {
  const map: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    py: 'python',
    cs: 'csharp',
    'c++': 'cpp',
    sh: 'bash',
    shell: 'bash',
  }
  const normalized = lang.toLowerCase()
  return map[normalized] ?? (SUPPORTED.has(normalized) ? normalized : 'text')
}

export function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const lang = normalizeLanguage(language || 'text')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative group my-3 rounded-xl overflow-hidden border border-zinc-700/60 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700/60">
        <span className="text-xs text-zinc-400 font-mono font-medium">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700/60 transition-all duration-150 cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={lang}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.8rem',
          lineHeight: '1.6',
          background: '#1a1b26',
          borderRadius: 0,
        }}
        wrapLongLines={false}
        showLineNumbers={children.split('\n').length > 4}
      >
        {children.trimEnd()}
      </SyntaxHighlighter>
    </div>
  )
}
