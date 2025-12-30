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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const q = query.trim()
    if (!q) return
    setLoading(true)
    setError('')
    
    const apiBaseUrl = process.env.REACT_APP_API_URL || 'https://legal-documentation-backend-1-6seq.onrender.com'
    const apiUrl = `${apiBaseUrl}/api/generate`
    
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
        const results = data.results || data.documents || []
        console.log('Search results', { query: q, count: results.length, docs: results.map((d:any)=>d.id) })
        setDocuments(results)
        setIsFallback((results.length > 0 && !!results[0].fallback) || false)
      })
      .catch((e) => {
        console.error('Search error:', e)
        setError(e.message || 'An error occurred connecting to the backend API.')
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
      
      {documents.length > 0 && (
        <div className="mb-4 text-sm text-slate-300">
          Found {documents.length} document{documents.length !== 1 ? 's' : ''} matching your query
        </div>
      )}
      
      <SearchInput initial={query} onSearch={handleInlineSearch} />
      {loading && <div className="status p-3 bg-blue-900/20 rounded text-blue-300">Loading…</div>}
      {error && (
        <div className="error p-3 bg-red-900/20 rounded border border-red-500/50">
          <strong className="text-red-300">Error:</strong> <span className="text-red-200">{error}</span>
          <div className="text-sm mt-2 text-red-300">
            Please check that the backend API is accessible and try again.
          </div>
        </div>
      )}
      <Results documents={documents} />
    </div>
  )
}
