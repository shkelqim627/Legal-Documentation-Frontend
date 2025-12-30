import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchInput({ onSearch, initial = '' }: { onSearch?: (q: string) => void, initial?: string }): JSX.Element {
  const navigate = useNavigate()
  const [query, setQuery] = useState(initial)
  const [showValidation, setShowValidation] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed.length < 3) {
      setShowValidation(true)
      return
    }
    setShowValidation(false)
    const encoded = encodeURIComponent(trimmed)
    navigate(`/search?query=${encoded}`)
    if (onSearch) onSearch(trimmed)
  }
  React.useEffect(() => {
    setQuery(initial)
  }, [initial])
  return (
    <form className="flex flex-col gap-2 mb-4" onSubmit={handleSubmit} id="search">
      <div className="flex gap-3">
        <input
          className="flex-1 rounded-md border border-slate-700 bg-slate-800 text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-legal-400"
          placeholder="Enter search query (min 3 letters)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search query"
        />
        <button className="flex items-center gap-2 bg-legal-500 hover:bg-legal-600 text-white px-4 py-2 rounded-md">Search</button>
      </div>
      {showValidation && <div className="text-sm text-red-400">Enter at least 3 characters</div>}
    </form>
  )
}
