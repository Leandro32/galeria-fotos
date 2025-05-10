import { describe, test, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCartStore, Photo } from "../../stores/useCartStore"
import { render, screen, fireEvent } from '@testing-library/react'

// Example hooks that demonstrate the usage of useCartStore
const useCartCount = () => {
  return useCartStore((state) => state.items.length)
}

const useCartTotal = () => {
  return useCartStore((state) => state.calculateTotal())
}

const useIsInCart = (photoId: number) => {
  return useCartStore((state) => state.items.some(item => item.id === photoId))
}

// Test components that use the cart hooks
const CartCounter = () => {
  const count = useCartCount()
  return <div data-testid="cart-count">{count}</div>
}

const CartTotalDisplay = () => {
  const total = useCartTotal()
  return <div data-testid="cart-total">${total.toFixed(2)}</div>
}

const AddToCartButton = ({ photo }: { photo: Photo }) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const isInCart = useIsInCart(photo.id)
  
  return (
    <button 
      onClick={() => addToCart(photo)}
      disabled={isInCart}
      data-testid="add-to-cart-button"
    >
      {isInCart ? 'In Cart' : 'Add to Cart'}
    </button>
  )
}

describe('Cart Hook Usage', () => {
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

  const testPhoto2: Photo = {
    id: 2,
    title: 'Another Test Photo',
    description: 'Another test photo',
    url: '/test2.jpg',
    price: 19.99,
    location: 'Another Location',
    categories: ['test'],
    orientation: 'portrait'
  }

  beforeEach(() => {
    // Reset the cart store before each test
    act(() => {
      useCartStore.getState().clearCart()
    })
  })

  test('useCartCount hook returns the current item count', () => {
    const { result, rerender } = renderHook(() => useCartCount())
    
    // Initially zero
    expect(result.current).toBe(0)
    
    // Add an item and check again
    act(() => {
      useCartStore.getState().addToCart(testPhoto)
    })
    rerender()
    expect(result.current).toBe(1)
    
    // Add another item
    act(() => {
      useCartStore.getState().addToCart(testPhoto2)
    })
    rerender()
    expect(result.current).toBe(2)
  })

  test('useCartTotal hook calculates the correct total', () => {
    const { result, rerender } = renderHook(() => useCartTotal())
    
    // Initially zero
    expect(result.current).toBe(0)
    
    // Add items and check total
    act(() => {
      useCartStore.getState().addToCart(testPhoto)
      useCartStore.getState().addToCart(testPhoto2)
    })
    rerender()
    
    const expectedTotal = testPhoto.price + testPhoto2.price
    expect(result.current).toBe(expectedTotal)
  })

  test('useIsInCart hook correctly tracks if an item is in cart', () => {
    const { result, rerender } = renderHook(() => useIsInCart(testPhoto.id))
    
    // Initially false
    expect(result.current).toBe(false)
    
    // Add the photo and check again
    act(() => {
      useCartStore.getState().addToCart(testPhoto)
    })
    rerender()
    expect(result.current).toBe(true)
    
    // Remove it
    act(() => {
      useCartStore.getState().removeFromCart(testPhoto.id)
    })
    rerender()
    expect(result.current).toBe(false)
  })

  test('CartCounter component shows the correct count', () => {
    const { rerender } = render(<CartCounter />)
    
    // Initially zero
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    
    // Add items and check
    act(() => {
      useCartStore.getState().addToCart(testPhoto)
      useCartStore.getState().addToCart(testPhoto2)
    })
    rerender(<CartCounter />)
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
  })

  test('CartTotalDisplay component shows the correct total', () => {
    const { rerender } = render(<CartTotalDisplay />)
    
    // Initially zero
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00')
    
    // Add items and check
    act(() => {
      useCartStore.getState().addToCart(testPhoto)
      useCartStore.getState().addToCart(testPhoto2)
    })
    rerender(<CartTotalDisplay />)
    
    const expectedTotal = testPhoto.price + testPhoto2.price
    expect(screen.getByTestId('cart-total')).toHaveTextContent(`$${expectedTotal.toFixed(2)}`)
  })

  test('AddToCartButton disables after adding item to cart', () => {
    render(<AddToCartButton photo={testPhoto} />)
    
    // Button should initially be enabled and say "Add to Cart"
    const button = screen.getByTestId('add-to-cart-button')
    expect(button).toBeEnabled()
    expect(button).toHaveTextContent('Add to Cart')
    
    // Click the button to add the item
    fireEvent.click(button)
    
    // Button should now be disabled and say "In Cart"
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('In Cart')
    
    // Check the item was actually added to the cart
    expect(useCartStore.getState().items.length).toBe(1)
    expect(useCartStore.getState().items[0].id).toBe(testPhoto.id)
  })
}) 