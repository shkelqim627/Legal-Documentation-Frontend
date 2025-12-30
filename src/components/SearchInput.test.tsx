import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SearchInput from './SearchInput'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('SearchInput Component', () => {
  test('renders search input field', () => {
    renderWithRouter(<SearchInput />)
    const input = screen.getByLabelText('Search query')
    expect(input).toBeInTheDocument()
  })

  test('displays initial value when provided', () => {
    renderWithRouter(<SearchInput initial="contract law" />)
    const input = screen.getByLabelText('Search query') as HTMLInputElement
    expect(input.value).toBe('contract law')
  })

  test('updates input value on change', () => {
    renderWithRouter(<SearchInput />)
    const input = screen.getByLabelText('Search query') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'employment' } })
    expect(input.value).toBe('employment')
  })

  test('shows validation error for query less than 3 characters', () => {
    renderWithRouter(<SearchInput />)
    const input = screen.getByLabelText('Search query')
    const button = screen.getByText('Search')
    
    fireEvent.change(input, { target: { value: 'ab' } })
    fireEvent.click(button)
    
    expect(screen.getByText('Enter at least 3 characters')).toBeInTheDocument()
  })

  test('does not show validation error for valid query', () => {
    renderWithRouter(<SearchInput />)
    const input = screen.getByLabelText('Search query')
    const button = screen.getByText('Search')
    
    fireEvent.change(input, { target: { value: 'contract' } })
    fireEvent.click(button)
    
    expect(screen.queryByText('Enter at least 3 characters')).not.toBeInTheDocument()
  })

  test('calls onSearch callback when provided', () => {
    const onSearchMock = jest.fn()
    renderWithRouter(<SearchInput onSearch={onSearchMock} />)
    const input = screen.getByLabelText('Search query')
    const button = screen.getByText('Search')
    
    fireEvent.change(input, { target: { value: 'contract' } })
    fireEvent.click(button)
    
    expect(onSearchMock).toHaveBeenCalledWith('contract')
  })

  test('submits form on Enter key press', () => {
    const onSearchMock = jest.fn()
    renderWithRouter(<SearchInput onSearch={onSearchMock} />)
    const input = screen.getByLabelText('Search query')
    
    fireEvent.change(input, { target: { value: 'employment' } })
    fireEvent.submit(input.closest('form')!)
    
    expect(onSearchMock).toHaveBeenCalledWith('employment')
  })
})

