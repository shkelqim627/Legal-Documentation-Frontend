import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero(): JSX.Element {
  const navigate = useNavigate()
  const go = (q: string) => navigate(`/search?query=${encodeURIComponent(q)}`, { state: { query: q } })
  return (
    <section className="rounded-md p-6 mb-6 bg-slate-800 card">
      <h2 className="text-2xl font-semibold text-slate-100">Legal Document Search</h2>
      <p className="mt-2 text-slate-300">Search a curated library of legal documents and guides. Use the search box to find relevant summaries and references.</p>
      <div className="mt-4 p-4 bg-slate-900 rounded">
        <h3 className="text-lg font-medium text-slate-100">How it works</h3>
        <ul className="mt-2 text-sm text-slate-300 space-y-1">
          <li>• Enter a query (min 3 letters) to find relevant documents and summaries.</li>
          <li>• Results show a concise summary and a preview snippet highlighting relevant content.</li>
          <li>• Click View to read the full document and see relevance score.</li>
        </ul>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <div className="font-medium text-slate-100">Featured</div>
          <div className="text-sm text-slate-300 mt-2">
            <button className="text-legal-400 underline" onClick={() => navigate('/doc/doc6')}>Contract Law — Part 1</button>
            <div className="text-sm text-slate-400">Summary and sample clauses</div>
          </div>
        </div>
        <div>
          <div className="font-medium text-slate-100">Featured</div>
          <div className="text-sm text-slate-300 mt-2">
            <button className="text-legal-400 underline" onClick={() => navigate('/doc/doc12')}>Employment Rights — Part 2</button>
            <div className="text-sm text-slate-400">Practical tips</div>
          </div>
        </div>
        <div>
          <div className="font-medium text-slate-100">Featured</div>
          <div className="text-sm text-slate-300 mt-2">
            <button className="text-legal-400 underline" onClick={() => navigate('/doc/doc18')}>IP Overview — Part 3</button>
            <div className="text-sm text-slate-400">Key takeaways</div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 bg-slate-900 rounded shadow-sm">
          <div className="font-medium text-slate-100">Fast summaries</div>
          <div className="text-sm text-slate-400">Get concise legal summaries for quick review.</div>
        </div>
        <div className="p-3 bg-slate-900 rounded shadow-sm">
          <div className="font-medium text-slate-100">Curated content</div>
          <div className="text-sm text-slate-400">Hand-picked foundational documents and guides.</div>
        </div>
        <div className="p-3 bg-slate-900 rounded shadow-sm">
          <div className="font-medium text-slate-100">Actionable insights</div>
          <div className="text-sm text-slate-400">Practical takeaways and sample queries to start searching.</div>
        </div>
      </div>
      <div className="mt-4 text-sm text-slate-300">Try sample queries: 
        <button className="ml-2 px-2 py-1 rounded bg-legal-500 text-white text-sm" onClick={() => go('contract')}>contract</button>
        <button className="ml-2 px-2 py-1 rounded bg-legal-500 text-white text-sm" onClick={() => go('employment')}>employment</button>
        <button className="ml-2 px-2 py-1 rounded bg-legal-500 text-white text-sm" onClick={() => go('intellectual property')}>intellectual property</button>
      </div>
    </section>
  )
}
