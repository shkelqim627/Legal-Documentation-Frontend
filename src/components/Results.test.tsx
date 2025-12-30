import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Results from './Results'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

const mockDocuments = [
  {
    id: 'doc1',
    title: 'Contract Law Fundamentals',
    content: 'Full content about contract law...',
    summary: 'Summary of contract law',
    relevance_score: 0.95,
    snippet: '...contract law fundamentals...'
  },
  {
    id: 'doc2',
    title: 'Employment Rights Guide',
    content: 'Full content about employment...',
    summary: 'Summary of employment rights',
    relevance_score: 0.88,
    snippet: '...employment rights guide...'
  }
]

describe('Results Component', () => {
  test('renders "No results" message when documents array is empty', () => {
    renderWithRouter(<Results documents={[]} />)
    expect(screen.getByText('No results to display.')).toBeInTheDocument()
  })

  test('renders "No results" message when documents is undefined', () => {
    renderWithRouter(<Results documents={undefined} />)
    expect(screen.getByText('No results to display.')).toBeInTheDocument()
  })

  test('renders document titles when documents are provided', () => {
    renderWithRouter(<Results documents={mockDocuments} />)
    expect(screen.getByText('Contract Law Fundamentals')).toBeInTheDocument()
    expect(screen.getByText('Employment Rights Guide')).toBeInTheDocument()
  })

  test('renders document summaries', () => {
    renderWithRouter(<Results documents={mockDocuments} />)
    expect(screen.getByText('Summary of contract law')).toBeInTheDocument()
    expect(screen.getByText('Summary of employment rights')).toBeInTheDocument()
  })

  test('renders relevance scores', () => {
    renderWithRouter(<Results documents={mockDocuments} />)
    expect(screen.getByText('95%')).toBeInTheDocument()
    expect(screen.getByText('88%')).toBeInTheDocument()
  })

  test('renders snippets when available', () => {
    renderWithRouter(<Results documents={mockDocuments} />)
    expect(screen.getByText('...contract law fundamentals...')).toBeInTheDocument()
    expect(screen.getByText('...employment rights guide...')).toBeInTheDocument()
  })

  test('renders View button for each document', () => {
    renderWithRouter(<Results documents={mockDocuments} />)
    const viewButtons = screen.getAllByText('View')
    expect(viewButtons).toHaveLength(2)
  })

  test('shows fallback message when documents have fallback flag', () => {
    const fallbackDocs = [{ ...mockDocuments[0], fallback: true }]
    renderWithRouter(<Results documents={fallbackDocs as any} />)
    expect(screen.getByText(/No direct matches — showing top documents as fallback/i)).toBeInTheDocument()
  })
})

