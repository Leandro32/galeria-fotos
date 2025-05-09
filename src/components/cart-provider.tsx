"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the Photo type
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
  resolution?: string
  format?: string
  license?: string
}

// Define the CartContext type
interface CartContextType {
  items: Photo[]
  addToCart: (photo: Photo) => void
  removeFromCart: (photoId: number) => void
  clearCart: () => void
  calculateTotal: () => number
}

// Create a default value for the context
const defaultCartContext: CartContextType = {
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  calculateTotal: () => 0,
}

// Create the context with a default value
const CartContext = createContext<CartContextType>(defaultCartContext)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Photo[]>([])

  const addToCart = (photo: Photo) => {
    if (!photo || typeof photo.id !== "number") return

    setItems((prev) => {
      // Check if item already exists in cart
      if (prev.some((item) => item.id === photo.id)) {
        return prev
      }
      return [...prev, photo]
    })
  }

  const removeFromCart = (photoId: number) => {
    if (typeof photoId !== "number") return

    setItems((prev) => prev.filter((item) => item.id !== photoId))
  }

  const clearCart = () => {
    setItems([])
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (typeof item.price === "number" ? item.price : 0), 0)
  }

  // Create the context value
  const contextValue: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    calculateTotal,
  }

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export const useCart = () => {
  return useContext(CartContext)
}
