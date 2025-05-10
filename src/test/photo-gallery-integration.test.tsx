import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../App'

// Mock the components
vi.mock('../components/photo-gallery', () => ({
  PhotoGallery: () => <div data-testid="photo-gallery">Photo Gallery Component</div>
}))

vi.mock('../components/layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">
      <header data-testid="header">
        <h1>Photo Gallery</h1>
        <div data-testid="shopping-cart-button">Cart Button</div>
      </header>
      <main>{children}</main>
    </div>
  )
}))

describe('App Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the layout with the photo gallery', () => {
    render(<App />)
    
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('photo-gallery')).toBeInTheDocument()
    expect(screen.getByTestId('shopping-cart-button')).toBeInTheDocument()
  })
})

// Create a more complete integration test with real components
vi.unmock('../components/layout')
vi.unmock('../components/photo-gallery')

// Mock the cart provider to avoid actual state management
vi.mock('../components/cart-provider', () => {
  const originalModule = vi.importActual('../components/cart-provider')
  
  return {
    ...originalModule,
    CartProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    useCart: () => ({
      items: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      clearCart: vi.fn(),
      calculateTotal: () => 0,
    }),
  }
})

// Mock components that might cause issues in tests
vi.mock('../components/photo-detail', () => ({
  PhotoDetail: () => <div data-testid="photo-detail">Photo Detail</div>
}))

// Update the mock to include the shopping-cart-button data-testid
vi.mock('../components/shopping-cart', () => ({
  ShoppingCart: () => <div data-testid="shopping-cart"><button data-testid="shopping-cart-button">Cart Button</button></div>
}))

// Mock the photos data
vi.mock('../data/photos', () => ({
  photos: [
    {
      id: 1,
      title: 'Test Photo 1',
      description: 'Test Description 1',
      url: '/test1.jpg',
      price: 19.99,
      location: 'Los Angeles',
      size: 'medium',
      date: '2023-01-01',
      photographer: 'Test Photographer',
      hour: 'Morning',
    },
    {
      id: 2,
      title: 'Test Photo 2',
      description: 'Test Description 2',
      url: '/test2.jpg',
      price: 24.99,
      location: 'Los Angeles',
      size: 'large',
      date: '2023-02-01',
      photographer: 'Test Photographer',
      hour: 'Evening',
    },
  ],
  locations: [
    {
      id: 'los-angeles',
      name: 'Los Angeles',
      image: '/placeholder.svg',
    },
  ],
}))

describe('Photo Gallery with Cart Integration', () => {
  it('should render the complete app structure', async () => {
    render(<App />)
    
    // Check for main components
    expect(screen.getByText('Photo Gallery')).toBeInTheDocument()
    expect(screen.getByTestId('shopping-cart')).toBeInTheDocument()
    
    // Wait for the photo gallery to load
    await waitFor(() => {
      expect(screen.getByText(/Photos from Los Angeles/i)).toBeInTheDocument()
    })
  })
}) 