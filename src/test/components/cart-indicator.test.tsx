import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CartIndicator from "../../components/photo-gallery/CartIndicator"
import { useCartStore, Photo } from "../../stores/useCartStore"
import { act } from '@testing-library/react'

// Mock the ShoppingCart icon from lucide-react
vi.mock('lucide-react', async () => {
  const actual = await vi.importActual('lucide-react')
  return {
    ...actual as any,
    ShoppingCart: () => <div data-testid="shopping-cart-icon">🛒</div>,
  }
})

// Mock router navigation
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual as any,
    useNavigate: () => mockNavigate
  }
})

describe('CartIndicator', () => {
  const testPhoto: Photo = {
    id: 1,
    title: 'Test Photo',
    description: 'A test photo',
    url: '/test.jpg',
    price: 9.99,
    location: 'Test Location',
    categories: ['test'],
    orientation: 'landscape'
  }

  beforeEach(() => {
    // Reset the store and mocks before each test
    act(() => {
      useCartStore.getState().clearCart()
    })
    mockNavigate.mockClear()
  })

  afterEach(() => {
    cleanup()
  })

  test('renders invisible when cart is empty', () => {
    render(
      <MemoryRouter>
        <CartIndicator />
      </MemoryRouter>
    )

    // The cart indicator should exist but be invisible
    const cartButton = screen.getByRole('button')
    expect(cartButton).toBeInTheDocument()
    expect(cartButton.parentElement).toHaveClass('invisible')
  })

  test('renders visible when cart has items', () => {
    // Add item to cart
    act(() => {
      useCartStore.getState().addToCart(testPhoto)
    })

    render(
      <MemoryRouter>
        <CartIndicator />
      </MemoryRouter>
    )

    // The cart indicator should be visible
    const cartButton = screen.getByRole('button')
    expect(cartButton).toBeInTheDocument()
    expect(cartButton.parentElement).toHaveClass('visible')
  })

  test('displays correct item count', () => {
    // Add items to cart
    act(() => {
      useCartStore.getState().addToCart(testPhoto)
      useCartStore.getState().addToCart({...testPhoto, id: 2})
    })

    render(
      <MemoryRouter>
        <CartIndicator />
      </MemoryRouter>
    )

    // Should show "Cart (2)"
    expect(screen.getByText(/Cart \(2\)/i)).toBeInTheDocument()
  })

  test('navigates to cart page when clicked', () => {
    // Add item to cart so it's visible
    act(() => {
      useCartStore.getState().addToCart(testPhoto)
    })

    render(
      <MemoryRouter>
        <CartIndicator />
      </MemoryRouter>
    )

    // Click on the cart button
    const cartButton = screen.getByRole('button')
    fireEvent.click(cartButton)

    // Should navigate to /cart
    expect(mockNavigate).toHaveBeenCalledWith('/cart')
  })

  test('updates when cart items change', () => {
    // Start with empty cart
    const { rerender } = render(
      <MemoryRouter>
        <CartIndicator />
      </MemoryRouter>
    )

    // Initially invisible
    expect(screen.getByRole('button').parentElement).toHaveClass('invisible')

    // Add item to cart
    act(() => {
      useCartStore.getState().addToCart(testPhoto)
    })

    // Re-render same component
    rerender(
      <MemoryRouter>
        <CartIndicator />
      </MemoryRouter>
    )

    // Now should be visible with count
    expect(screen.getByRole('button').parentElement).toHaveClass('visible')
    expect(screen.getByText(/Cart \(1\)/i)).toBeInTheDocument()

    // Remove item
    act(() => {
      useCartStore.getState().removeFromCart(testPhoto.id)
    })

    // Re-render again
    rerender(
      <MemoryRouter>
        <CartIndicator />
      </MemoryRouter>
    )

    // Should be invisible again
    expect(screen.getByRole('button').parentElement).toHaveClass('invisible')
  })
}) 