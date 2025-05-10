import { describe, test, expect, beforeEach } from 'vitest'
import { act } from '@testing-library/react'

// Import the store directly from the file (to avoid module caching issues)
import { useCartStore } from "../../stores/useCartStore"

// Define a Photo type for tests
interface Photo {
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

describe('Cart Store Persistence', () => {
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
    // Reset the store before each test
    act(() => {
      useCartStore.getState().clearCart()
    })
  })

  test('adds items to cart', () => {
    // Add an item directly to the store state
    act(() => {
      const store = useCartStore.getState()
      store.addToCart(testPhoto as any)
    })
    
    // Check that the item was added to the store
    const items = useCartStore.getState().items
    expect(items.length).toBe(1)
    expect(items[0].id).toBe(testPhoto.id)
  })

  test('removes items from cart', () => {
    // Add two items to cart
    act(() => {
      const store = useCartStore.getState()
      store.addToCart(testPhoto as any)
      store.addToCart({...testPhoto, id: 2} as any)
    })
    
    // Verify we have 2 items
    expect(useCartStore.getState().items.length).toBe(2)
    
    // Remove one item
    act(() => {
      const store = useCartStore.getState()
      store.removeFromCart(testPhoto.id)
    })
    
    // Verify we now have 1 item
    const items = useCartStore.getState().items
    expect(items.length).toBe(1)
    expect(items[0].id).toBe(2)
  })

  test('clears all items from cart', () => {
    // Add item to cart
    act(() => {
      const store = useCartStore.getState()
      store.addToCart(testPhoto as any)
    })
    
    // Verify we have 1 item
    expect(useCartStore.getState().items.length).toBe(1)
    
    // Clear the cart
    act(() => {
      const store = useCartStore.getState()
      store.clearCart()
    })
    
    // Verify cart is empty
    expect(useCartStore.getState().items.length).toBe(0)
  })

  test('calculates total correctly', () => {
    // Add two items to cart
    act(() => {
      const store = useCartStore.getState()
      store.addToCart(testPhoto as any)
      store.addToCart({...testPhoto, id: 2, price: 19.99} as any)
    })
    
    // Calculate expected total
    const expectedTotal = testPhoto.price + 19.99
    
    // Check total calculation
    expect(useCartStore.getState().calculateTotal()).toBeCloseTo(expectedTotal)
  })
})