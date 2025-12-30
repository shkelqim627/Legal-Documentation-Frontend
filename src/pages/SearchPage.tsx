import React, { useEffect, useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import Results from '../components/Results'
import SearchInput from '../components/SearchInput'
import { useNavigate } from 'react-router-dom'

type Doc = {
  id: string
  title: string
  content: string
  summary: string
  relevance_score: number
}

export default function SearchPage(): JSX.Element {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const stateQuery = (location.state && (location.state as any).query) || (location.state && (location.state as any).q) || ''
  const query = searchParams.get('query') || stateQuery || ''
  const navigate = useNavigate()
  const [documents, setDocuments] = useState<Doc[]>([])
  const [isFallback, setIsFallback] = useState(false)
  const [diag, setDiag] = useState<{ count: number; ids?: string[] } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const q = query.trim()
    if (!q) return
    setLoading(true)
    setError('')
    
    // For local dev: use proxy to backend (http://localhost:8000/generate)
    // For Vercel production: use /api/generate (serverless function)
    const apiUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:8000/generate'
      : '/api/generate'
    
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q })
    })
      .then(async (res) => {
        const txt = await res.text()
        if (!res.ok) throw new Error(txt || `HTTP ${res.status}`)
        return JSON.parse(txt)
      })
      .then((data) => {
        console.log('Search results', { query: q, count: (data.documents || []).length, docs: (data.documents || []).map((d:any)=>d.id) })
        setDocuments(data.documents || [])
        setIsFallback((data.documents && data.documents.length > 0 && !!data.documents[0].fallback) || false)
      })
      .catch((e) => {
        console.error('Search error:', e)
        setError(e.message || 'An error occurred. Make sure the backend is running on port 8000 or deploy to Vercel.')
      })
      .finally(() => setLoading(false))
  }, [query])

  const handleInlineSearch = (q: string) => {
    const encoded = encodeURIComponent(q)
    navigate(`/search?query=${encoded}`)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-slate-100">Search results for "{query}"</h2>
      
      <div className="mb-4">
        <button
          className="text-sm px-3 py-1 rounded bg-slate-700 text-slate-100 hover:bg-slate-600 transition-colors"
          onClick={() => {
            const apiUrl = window.location.hostname === 'localhost' 
              ? 'http://localhost:8000/documents'
              : '/api/documents'
            fetch(`${apiUrl}?query=${encodeURIComponent(query)}`)
              .then((r) => r.json())
              .then((data) => setDiag({ count: data.count || 0, ids: (data.documents || []).slice(0, 10).map((d: any) => d.id) }))
              .catch(() => setDiag({ count: 0 }))
          }}
        >Check direct matches</button>
        {diag && <div className="text-sm text-slate-300 mt-2">Direct matches: {diag.count} {diag.ids && diag.ids.length > 0 ? ` — ids: ${diag.ids.join(',')}` : ''}</div>}
      </div>
      
      <SearchInput initial={query} onSearch={handleInlineSearch} />
      {loading && <div className="status p-3 bg-blue-900/20 rounded text-blue-300">Loading…</div>}
      {error && (
        <div className="error p-3 bg-red-900/20 rounded border border-red-500/50">
          <strong className="text-red-300">Error:</strong> <span className="text-red-200">{error}</span>
          <div className="text-sm mt-2 text-red-300">
            {window.location.hostname === 'localhost' 
              ? 'Make sure the backend is running: cd backend && npm run dev'
              : 'If deployed to Vercel, check that API routes are configured correctly.'}
          </div>
        </div>
      )}
      <Results documents={documents} />
    </div>
  )
}
