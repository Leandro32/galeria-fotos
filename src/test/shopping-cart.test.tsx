import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ShoppingCart } from '../components/shopping-cart'
import React from 'react'

// Define a mock photo type
interface MockPhoto {
  id: number
  title: string
  description: string
  url: string
  price: number
  location: string
  categories: string[]
  orientation: string
  date?: string
}

// Define a mock photo for testing
const mockPhoto: MockPhoto = {
  id: 1,
  title: 'Test Photo',
  description: 'A test photo',
  url: '/test.jpg',
  price: 19.99,
  location: 'Test Location',
  categories: ['test', 'sample'],
  orientation: 'landscape',
  date: '2023-01-01',
}

// Create a mock cart hook
const mockCartItems: MockPhoto[] = []
const mockRemoveFromCart = vi.fn()
const mockClearCart = vi.fn()
const mockCalculateTotal = vi.fn(() => 0)
const mockAddToCart = vi.fn()

// Mock the cart provider
vi.mock('../components/cart-provider', () => ({
  useCart: () => ({
    items: mockCartItems,
    removeFromCart: mockRemoveFromCart,
    clearCart: mockClearCart,
    calculateTotal: mockCalculateTotal,
    addToCart: mockAddToCart,
  })
}))

// Mock the checkout form
vi.mock('../components/checkout-form', () => ({
  CheckoutForm: ({ onComplete, onCancel }: { onComplete: () => void, onCancel: () => void }) => (
    <div data-testid="checkout-form">
      <button data-testid="complete-checkout" onClick={onComplete}>Complete</button>
      <button data-testid="cancel-checkout" onClick={onCancel}>Cancel</button>
    </div>
  )
}))

// Mock the Sheet component from UI
vi.mock('../components/ui/sheet', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet">{children}</div>,
  SheetTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-trigger">{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-content">{children}</div>,
  SheetHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-header">{children}</div>,
  SheetTitle: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-title">{children}</div>,
}))

describe('ShoppingCart', () => {
  beforeEach(() => {
    // Reset mocks and cart items before each test
    vi.clearAllMocks()
    mockCartItems.length = 0
  })
  
  it('should render a cart button', () => {
    render(<ShoppingCart />)
    
    // The button should be rendered with the ShoppingCart icon
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
  
  it('should show empty cart message when cart is empty', () => {
    render(<ShoppingCart />)
    
    // The sheet content should include the empty cart message
    expect(screen.getByTestId('sheet-content')).toHaveTextContent('Your cart is empty')
  })
  
  it('should display cart items count badge', () => {
    // Add an item to the mock cart
    mockCartItems.push(mockPhoto)
    
    render(<ShoppingCart />)
    
    // Check if the badge with count is displayed
    expect(screen.getByText('1')).toBeInTheDocument()
  })
}) 