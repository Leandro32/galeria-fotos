import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CheckoutForm } from "../../components/checkout-form"
import React from 'react'

// Mock functions
const mockOnComplete = vi.fn()
const mockOnCancel = vi.fn()
const mockClearCart = vi.fn()

// Mock the cart provider
vi.mock('../components/cart-provider', () => ({
  useCart: () => ({
    items: [],
    removeFromCart: vi.fn(),
    clearCart: mockClearCart,
    calculateTotal: () => 0,
    addToCart: vi.fn(),
  })
}))

// Mock UI components that might cause issues
vi.mock('../components/ui/radio-group', () => ({
  RadioGroup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  RadioGroupItem: () => <div data-testid="radio-item" />
}))

describe('CheckoutForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should show empty cart message when cart is empty', () => {
    render(<CheckoutForm onComplete={mockOnComplete} onCancel={mockOnCancel} />)
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(screen.getByText('Return to Gallery')).toBeInTheDocument()
  })

  it('should call onCancel when return button is clicked with empty cart', () => {
    render(<CheckoutForm onComplete={mockOnComplete} onCancel={mockOnCancel} />)
    
    fireEvent.click(screen.getByText('Return to Gallery'))
    
    expect(mockOnCancel).toHaveBeenCalled()
  })
}) 