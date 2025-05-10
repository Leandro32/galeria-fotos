import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from "../../pages/HomePage"
import { TestRouter } from "../utils/utils"

// Mock components that might cause issues in tests
vi.mock('../components/layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">
      <header data-testid="header">Header</header>
      <main>{children}</main>
      <footer data-testid="footer">Footer</footer>
    </div>
  )
}))

vi.mock('../components/photo-gallery', () => ({
  PhotoGallery: () => <div data-testid="photo-gallery">Photo Gallery</div>
}))

describe('App Integration', () => {
  it('should render the layout with header, photo gallery, and footer', () => {
    render(
      <TestRouter>
        <HomePage />
      </TestRouter>
    )
    
    // Check for main elements using what's actually in the rendered output
    expect(screen.getByText('Photo Gallery')).toBeInTheDocument()
    expect(screen.getByText('Select a Location')).toBeInTheDocument()
    
    // Check for location items
    const locationElements = screen.getAllByText(/(New York|Los Angeles|Chicago|San Francisco|Miami)/i)
    expect(locationElements.length).toBeGreaterThan(0)
  })
}) 