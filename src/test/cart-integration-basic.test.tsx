import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useCartStore } from '../stores/useCartStore'
import { act } from '@testing-library/react'
import { Button } from '../components/ui/button'

// We no longer need to mock localStorage here, as it's defined in setup.ts
// Instead, we'll just clear the localStorage mock before each test

// Create a simple cart button component for testing
const TestCartButton = () => {
  const addToCart = useCartStore((state) => state.addToCart)
  
  const handleAddToCart = () => {
    const testPhoto = {
      id: 1,
      title: 'Test Photo',
      description: 'A test photo',
      url: '/test.jpg',
      price: 9.99,
      location: 'Test Location',
      categories: ['test'],
      orientation: 'landscape'
    }
    
    addToCart(testPhoto)
  }
  
  return (
    <Button onClick={handleAddToCart} data-testid="add-to-cart-button">
      Add to Cart
    </Button>
  )
}

// Create a simple cart display component for testing
const TestCartDisplay = () => {
  const items = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)
  
  return (
    <div>
      <p data-testid="cart-count">Items in cart: {items.length}</p>
      <ul>
        {items.map(item => (
          <li key={item.id} data-testid={`cart-item-${item.id}`}>
            {item.title} - ${item.price}
            <button 
              onClick={() => removeFromCart(item.id)}
              data-testid={`remove-item-${item.id}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <button onClick={clearCart} data-testid="clear-cart">
          Clear Cart
        </button>
      )}
    </div>
  )
}

describe('Basic Cart Integration', () => {
  beforeEach(() => {
    // Reset the cart store before each test
    act(() => {
      useCartStore.getState().clearCart()
    })
    
    // Clear localStorage between tests
    window.localStorage.clear()
  })

  test('should add items to cart when button is clicked', async () => {
    render(
      <MemoryRouter>
        <TestCartButton />
        <TestCartDisplay />
      </MemoryRouter>
    )
    
    // Initially the cart should be empty
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Items in cart: 0')
    
    // Click the add to cart button
    fireEvent.click(screen.getByTestId('add-to-cart-button'))
    
    // Now the cart should have 1 item
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Items in cart: 1')
    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument()
  })
  
  test('should remove items from cart', async () => {
    // Add item to cart first
    act(() => {
      useCartStore.getState().addToCart({
        id: 1,
        title: 'Test Photo',
        description: 'A test photo',
        url: '/test.jpg',
        price: 9.99,
        location: 'Test Location',
        categories: ['test'],
        orientation: 'landscape'
      })
    })
    
    render(
      <MemoryRouter>
        <TestCartDisplay />
      </MemoryRouter>
    )
    
    // Cart should have 1 item
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Items in cart: 1')
    
    // Click remove button
    fireEvent.click(screen.getByTestId('remove-item-1'))
    
    // Cart should be empty
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Items in cart: 0')
    expect(screen.queryByTestId('cart-item-1')).not.toBeInTheDocument()
  })
  
  test('should clear all items from cart', async () => {
    // Add multiple items to cart
    act(() => {
      useCartStore.getState().addToCart({
        id: 1,
        title: 'Test Photo 1',
        description: 'A test photo',
        url: '/test1.jpg',
        price: 9.99,
        location: 'Test Location',
        categories: ['test'],
        orientation: 'landscape'
      })
      
      useCartStore.getState().addToCart({
        id: 2,
        title: 'Test Photo 2',
        description: 'Another test photo',
        url: '/test2.jpg',
        price: 19.99,
        location: 'Another Location',
        categories: ['test'],
        orientation: 'portrait'
      })
    })
    
    render(
      <MemoryRouter>
        <TestCartDisplay />
      </MemoryRouter>
    )
    
    // Cart should have 2 items
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Items in cart: 2')
    
    // Click clear cart button
    fireEvent.click(screen.getByTestId('clear-cart'))
    
    // Cart should be empty
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Items in cart: 0')
    expect(screen.queryByTestId('cart-item-1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('cart-item-2')).not.toBeInTheDocument()
  })
  
  test('should not add duplicate items to cart', async () => {
    render(
      <MemoryRouter>
        <TestCartButton />
        <TestCartDisplay />
      </MemoryRouter>
    )
    
    // Click the add to cart button twice
    fireEvent.click(screen.getByTestId('add-to-cart-button'))
    fireEvent.click(screen.getByTestId('add-to-cart-button'))
    
    // Cart should still have only 1 item
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Items in cart: 1')
    
    // Only one instance of the item should be present
    const cartItems = screen.getAllByTestId(/cart-item-/i)
    expect(cartItems.length).toBe(1)
  })
}) 