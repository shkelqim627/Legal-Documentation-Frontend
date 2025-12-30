import React from 'react'
import { useNavigate } from 'react-router-dom'

type Doc = {
  id: string
  title: string
  content: string
  summary: string
  relevance_score: number
  snippet?: string
}

function ResultItem({ doc }: { doc: Doc }): JSX.Element {
  const navigate = useNavigate()
  return (
    <article className="p-4 rounded-lg bg-slate-800 border border-slate-700">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg text-slate-100 font-medium">{doc.title}</h3>
          <p className="text-sm text-slate-300 mt-1">{doc.summary}</p>
          {doc.snippet && <p className="text-sm text-slate-400 mt-2 italic">{doc.snippet}</p>}
        </div>
        <div className="text-sm text-slate-400 text-right">{Math.round(doc.relevance_score * 100)}%</div>
      </div>
      <div className="mt-3 flex gap-3">
        <button onClick={() => navigate(`/doc/${doc.id}`)} className="text-sm text-legal-400 underline hover:opacity-80">View</button>
      </div>
    </article>
  )
}

export default function Results({ documents }: { documents: Doc[] | undefined }): JSX.Element {
  if (!documents || documents.length === 0) {
    return (
      <div className="no-results text-slate-400 p-6 text-center bg-slate-800/50 rounded-lg border border-slate-700">
        <p className="text-lg mb-2">No results to display.</p>
        <p className="text-sm">Try a different search query.</p>
      </div>
    )
  }
  const isFallback = (documents && documents.length > 0 && (documents as any)[0].fallback)
  const header = isFallback ? <div className="text-sm text-yellow-300 mb-2 p-2 bg-yellow-900/20 rounded border border-yellow-500/30">No direct matches — showing top documents as fallback.</div> : null
  return (
    <section className="grid gap-4">
      {header}
      {documents.map((d) => (
        <ResultItem key={d.id} doc={d} />
      ))}
    </section>
  )
}

