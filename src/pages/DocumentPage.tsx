import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

type Doc = {
  id: string
  title: string
  content: string
  summary: string
  relevance_score: number
}

export default function DocumentPage(): JSX.Element {
  const { id } = useParams()
  const [doc, setDoc] = useState<Doc | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError('')
    
    const apiBaseUrl = process.env.REACT_APP_API_URL || 'https://legal-documentation-backend-wfkp.onrender.com'
    const apiUrl = `${apiBaseUrl}/api/documents/${encodeURIComponent(id)}`
    
    fetch(apiUrl)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setDoc(data))
      .catch((e) => {
        console.error('Document fetch error:', e)
        setError(e.message || 'Error fetching document. Please check that the backend API is accessible.')
      })
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div>
      <button className="mb-4 text-sm text-slate-300" onClick={() => navigate(-1)}>← Back</button>
      {loading && <div className="status">Loading…</div>}
      {error && <div className="error">{error}</div>}
      {doc && (
        <article>
          <h2 className="text-2xl font-semibold text-slate-100">{doc.title}</h2>
          <p className="text-slate-300 mt-2">{doc.summary}</p>
          <div className="mt-4 whitespace-pre-wrap bg-slate-800 p-4 rounded text-slate-100">{doc.content}</div>
          <div className="mt-4 text-sm text-slate-400">Relevance: {Math.round(doc.relevance_score * 100)}%</div>
        </article>
      )}
    </div>
  )
}
