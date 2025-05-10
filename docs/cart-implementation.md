# Cart Implementation with Zustand

This document explains how the shopping cart functionality is implemented in the Photo Gallery application using Zustand for state management.

## Overview

The cart system allows users to:
- Add photos to their cart
- Remove photos from their cart
- View their cart contents
- Calculate the total price of items in the cart
- Clear the entire cart
- Proceed to checkout

## Technical Implementation

### Cart Store

The cart functionality is implemented using [Zustand](https://github.com/pmndrs/zustand), a small, fast and scalable state management solution. The cart store is located in `src/stores/useCartStore.ts`.

```typescript
// Example of the cart store
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Photo {
  id: number
  title: string
  description: string
  url: string
  price: number
  location: string
  categories: string[]
  orientation: string
  date?: string
  // ... other properties
}

interface CartState {
  items: Photo[]
  addToCart: (photo: Photo) => void
  removeFromCart: (photoId: number) => void
  clearCart: () => void
  calculateTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (photo) => {
        // Implementation...
      },
      
      removeFromCart: (photoId) => {
        // Implementation...
      },
      
      clearCart: () => set({ items: [] }),
      
      calculateTotal: () => {
        // Implementation...
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
)
```

### Key Features

1. **Persistence**: The cart state is persisted in localStorage, so users don't lose their cart items when they refresh the page or close the browser.

2. **Type Safety**: The store uses TypeScript for type safety, ensuring that all cart operations are type-checked.

3. **Immutable Updates**: State updates follow the immutable pattern, ensuring predictable state changes.

4. **Centralized Logic**: All cart-related logic is centralized in the store, making it easy to maintain and extend.

## Usage in Components

### Adding Items to Cart

```typescript
import { useCartStore, Photo as CartPhoto } from "../../stores/useCartStore"
import { Photo } from "../../types"

// In your component
const { addToCart } = useCartStore()

const handleAddToCart = (photo: Photo) => {
  const cartPhoto: CartPhoto = {
    id: photo.id,
    title: photo.title,
    description: photo.description,
    url: photo.url,
    price: photo.price,
    location: photo.location,
    categories: [], 
    orientation: "landscape",
    date: photo.date,
  }
  addToCart(cartPhoto)
}
```

### Displaying Cart Items

```typescript
import { useCartStore } from "../../stores/useCartStore"

// In your component
const items = useCartStore((state) => state.items)

// Use items in your JSX
return (
  <div>
    {items.map(item => (
      <div key={item.id}>
        {item.title} - ${item.price}
      </div>
    ))}
  </div>
)
```

### Removing Items from Cart

```typescript
import { useCartStore } from "../../stores/useCartStore"

// In your component
const { removeFromCart } = useCartStore()

// In your event handler
const handleRemove = (itemId: number) => {
  removeFromCart(itemId)
}
```

### Accessing Cart Outside of React Components

You can also access the cart state outside of React components using:

```typescript
import { useCartStore } from "../../stores/useCartStore"

// Get current state
const currentItems = useCartStore.getState().items

// Perform an action
useCartStore.getState().clearCart()
```

## Benefits of Using Zustand

1. **Simplicity**: Zustand has a minimal API that's easy to learn and use.
2. **Performance**: It's optimized for performance with minimal re-renders.
3. **Flexibility**: Works well with and without React, making it versatile for different parts of the application.
4. **DevTools Support**: Integrates with Redux DevTools for debugging.
5. **Middleware Support**: Supports middleware like persist for additional functionality.

## Migration from Context API

This implementation replaces the previous Context API-based cart system. The main advantages of the new implementation are:

- Simplified component integration (no need for Provider wrappers)
- Improved performance with selective re-renders
- Built-in persistence without additional code
- Easier testing and debugging

## Future Improvements

Potential improvements to the cart system could include:

- Adding quantity support for multiple copies of the same item
- Implementing a wishlist feature using a similar pattern
- Adding analytics tracking for cart actions
- Implementing cart item expiration for time-sensitive offers 