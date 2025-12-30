import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import SearchPage from './SearchPage'

global.fetch = jest.fn()

const mockFetch = (global.fetch as jest.Mock)

const mockDocuments = [
  {
    id: 'doc1',
    title: 'Contract Law Fundamentals',
    content: 'Full content...',
    summary: 'Summary',
    relevance_score: 0.95,
    snippet: '...snippet...'
  }
]

describe('SearchPage Component', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  test('renders search page with query input', () => {
    render(
      <MemoryRouter initialEntries={['/search?query=contract']}>
        <SearchPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/Search results for/i)).toBeInTheDocument()
  })

  test('displays loading state while fetching', async () => {
    mockFetch.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        text: async () => JSON.stringify({ documents: mockDocuments })
      }), 100))
    )

    render(
      <MemoryRouter initialEntries={['/search?query=contract']}>
        <SearchPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/Loading/i)).toBeInTheDocument()
  })

  test('displays error message on API failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    render(
      <MemoryRouter initialEntries={['/search?query=contract']}>
        <SearchPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument()
    })
  })

  test('displays documents after successful fetch', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: async () => JSON.stringify({ documents: mockDocuments })
    })

    render(
      <MemoryRouter initialEntries={['/search?query=contract']}>
        <SearchPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Contract Law Fundamentals')).toBeInTheDocument()
    })
  })

  test('handles empty query parameter', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/Search results for/i)).toBeInTheDocument()
  })
})

