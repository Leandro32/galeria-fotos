import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '../pages/HomePage'
import { TestRouter } from './utils'

// Skip the initial mock setup since we're testing with the actual components
describe('App Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the layout with the photo gallery', () => {
    render(
      <TestRouter>
        <HomePage />
      </TestRouter>
    )
    
    // Check for main elements
    expect(screen.getByText('Photo Gallery')).toBeInTheDocument()
    expect(screen.getByText('Select a Location')).toBeInTheDocument()
  })
})

// Simplified version of the second test
describe('Photo Gallery with Cart Integration', () => {
  it('should render the complete app structure', async () => {
    render(
      <TestRouter>
        <HomePage />
      </TestRouter>
    )
    
    // Check for main components
    expect(screen.getByText('Photo Gallery')).toBeInTheDocument()
    
    // The cart button should exist (might be invisible if cart is empty)
    const cartButton = screen.getByText(/cart/i, {
      selector: 'button'
    })
    expect(cartButton).toBeInTheDocument()
    
    // Check for location selector
    expect(screen.getByText('Select a Location')).toBeInTheDocument()
    
    // At least one location should be visible
    const locationElements = screen.getAllByText(/(New York|Los Angeles|Chicago|San Francisco|Miami)/i)
    expect(locationElements.length).toBeGreaterThan(0)
  })
}) 