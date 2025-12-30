import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(): JSX.Element {
  const [lightMode, setLightMode] = useState(false)

  useEffect(() => {
    // default to dark mode unless user explicitly set light
    const stored = localStorage.getItem('theme')
    if (stored === 'light') {
      document.body.classList.add('light')
      setLightMode(true)
    } else {
      document.body.classList.remove('light')
      setLightMode(false)
      localStorage.setItem('theme', 'dark')
    }
  }, [])

  const toggle = () => {
    if (lightMode) {
      document.body.classList.remove('light')
      localStorage.setItem('theme', 'dark')
      setLightMode(false)
    } else {
      document.body.classList.add('light')
      localStorage.setItem('theme', 'light')
      setLightMode(true)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-700 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between text-slate-100">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="h-8 w-8 rounded flex items-center justify-center overflow-hidden">
            <img src="/legal-system.png" alt="Legal System" className="h-8 w-8 object-cover" />
          </div>
          <div>
            <div className="font-semibold">Legal Search</div>
            <div className="text-xs text-slate-300">Document portal</div>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-slate-200">Home</Link>
          <Link to="/search" className="text-sm text-slate-200">Search</Link>
          <button onClick={toggle} aria-label="Toggle theme" className="ml-2 px-3 py-1 rounded bg-slate-700 text-slate-200 flex items-center gap-2 hover:opacity-90">
            {lightMode ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
                <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span className="text-sm">{lightMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
