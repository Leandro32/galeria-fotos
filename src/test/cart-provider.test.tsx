import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider, useCart, type Photo } from '../components/cart-provider'

// Mock photo for testing
const mockPhoto: Photo = {
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

// Test component that uses the cart context
const TestComponent = () => {
  const { items, addToCart, removeFromCart, clearCart, calculateTotal } = useCart()
  
  return (
    <div>
      <div data-testid="item-count">{items.length}</div>
      <div data-testid="total">{calculateTotal()}</div>
      <button data-testid="add-to-cart" onClick={() => addToCart(mockPhoto)}>Add to cart</button>
      <button data-testid="remove-from-cart" onClick={() => removeFromCart(mockPhoto.id)}>Remove from cart</button>
      <button data-testid="clear-cart" onClick={clearCart}>Clear cart</button>
      {items.map(item => (
        <div key={item.id} data-testid={`item-${item.id}`}>
          {item.title}
        </div>
      ))}
    </div>
  )
}

describe('CartProvider', () => {
  beforeEach(() => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
  })

  it('should start with an empty cart', () => {
    expect(screen.getByTestId('item-count').textContent).toBe('0')
    expect(screen.getByTestId('total').textContent).toBe('0')
  })

  it('should add an item to the cart', () => {
    fireEvent.click(screen.getByTestId('add-to-cart'))
    
    expect(screen.getByTestId('item-count').textContent).toBe('1')
    expect(screen.getByTestId('total').textContent).toBe(mockPhoto.price.toString())
    expect(screen.getByTestId(`item-${mockPhoto.id}`)).toBeInTheDocument()
  })

  it('should not add duplicate items to the cart', () => {
    fireEvent.click(screen.getByTestId('add-to-cart'))
    fireEvent.click(screen.getByTestId('add-to-cart'))
    
    expect(screen.getByTestId('item-count').textContent).toBe('1')
  })

  it('should remove an item from the cart', () => {
    // Add an item first
    fireEvent.click(screen.getByTestId('add-to-cart'))
    expect(screen.getByTestId('item-count').textContent).toBe('1')
    
    // Remove the item
    fireEvent.click(screen.getByTestId('remove-from-cart'))
    expect(screen.getByTestId('item-count').textContent).toBe('0')
    expect(screen.queryByTestId(`item-${mockPhoto.id}`)).not.toBeInTheDocument()
  })

  it('should clear the cart', () => {
    // Add an item first
    fireEvent.click(screen.getByTestId('add-to-cart'))
    expect(screen.getByTestId('item-count').textContent).toBe('1')
    
    // Clear the cart
    fireEvent.click(screen.getByTestId('clear-cart'))
    expect(screen.getByTestId('item-count').textContent).toBe('0')
    expect(screen.queryByTestId(`item-${mockPhoto.id}`)).not.toBeInTheDocument()
  })

  it('should calculate the total correctly', () => {
    fireEvent.click(screen.getByTestId('add-to-cart'))
    expect(screen.getByTestId('total').textContent).toBe(mockPhoto.price.toString())
  })
}) 