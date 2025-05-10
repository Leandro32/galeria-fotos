import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'
import React from 'react'

// Mock the cart provider
vi.mock('../components/cart-provider', () => ({
  CartProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useCart: () => ({
    items: [],
    removeFromCart: vi.fn(),
    clearCart: vi.fn(),
    calculateTotal: () => 0,
    addToCart: vi.fn(),
  })
}))

// Mock the shopping cart component
vi.mock('../components/shopping-cart', () => ({
  ShoppingCart: () => <div data-testid="shopping-cart">Shopping Cart</div>
}))

// Mock the photo gallery component
vi.mock('../components/photo-gallery', () => ({
  PhotoGallery: () => <div data-testid="photo-gallery">Photo Gallery Component</div>
}))

describe('App Integration', () => {
  it('should render the layout with header, photo gallery, and footer', () => {
    render(<App />)
    
    // Check for main components
    expect(screen.getByRole('heading', { name: 'Photo Gallery' })).toBeInTheDocument()
    expect(screen.getByTestId('shopping-cart')).toBeInTheDocument()
    expect(screen.getByTestId('photo-gallery')).toBeInTheDocument()
    
    // Check for footer
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument()
  })
}) 