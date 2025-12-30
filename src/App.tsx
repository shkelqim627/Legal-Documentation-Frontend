import React from 'react'
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import DocumentPage from './pages/DocumentPage'


function App(): JSX.Element {

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-transparent pt-20 flex flex-col">
        <Navbar />
        <main className="container flex-1">
          <Routes>
            <Route path="/" element={(
              <>
                <header className="mb-4" >
                  <Hero />
                </header>
              </>
            )} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/doc/:id" element={<DocumentPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
