import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ShoppingCart } from "../../components/shopping-cart"
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

// Mock functions
const mockRemoveFromCart = vi.fn()
const mockClearCart = vi.fn()
const mockCalculateTotal = vi.fn(() => 19.99)
const mockAddToCart = vi.fn()

// Create a mock cart hook
let mockCartItems: MockPhoto[] = []

// Mock the cart provider
vi.mock('../../components/cart-provider', () => ({
  useCart: () => ({
    items: mockCartItems,
    removeFromCart: mockRemoveFromCart,
    clearCart: mockClearCart,
    calculateTotal: mockCalculateTotal,
    addToCart: mockAddToCart,
  })
}))

// The sheet component is crucial for this test since it relies on sheet component elements
// Rather than mocking the UI components, let's test the button rendering and cart state
// Mock sheet components
vi.mock('../../components/ui/sheet', () => ({
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
    mockCartItems = []
  })
  
  it('should render a cart button', () => {
    render(<ShoppingCart />)
    
    // The button should be rendered with the ShoppingCart icon
    const button = screen.getByTestId('shopping-cart-button')
    expect(button).toBeInTheDocument()
  })
  
  it('should show empty cart message', () => {
    render(<ShoppingCart />)
    
    // Check if empty cart message is rendered somewhere in the component
    const emptyCartMessage = screen.getByText('Your cart is empty')
    expect(emptyCartMessage).toBeInTheDocument()
  })
  
  it('should display cart items when cart has items', () => {
    // Add an item to the mock cart
    mockCartItems = [mockPhoto]
    
    render(<ShoppingCart />)
    
    // Check if the cart displays the item title
    const itemTitle = screen.getByText('Test Photo')
    expect(itemTitle).toBeInTheDocument()
    
    // Check if the price is displayed (there are multiple elements with this text, so use getAllByText)
    const itemPrices = screen.getAllByText('$19.99')
    expect(itemPrices.length).toBeGreaterThan(0)
  })
}) 