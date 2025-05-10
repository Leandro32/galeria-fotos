"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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

// Load cart from localStorage
const loadCartFromStorage = (): Photo[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error)
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Photo[]>([])
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    setItems(loadCartFromStorage())
  }, [])
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0 || loadCartFromStorage().length > 0) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items])

  const addToCart = (photo: Photo) => {
    if (!photo || typeof photo.id !== "number") {
      console.error("Invalid photo object:", photo)
      return
    }
    
    console.log("Cart Provider - Adding to cart:", photo)
    console.log("Cart Provider - Current items:", items)
    
    setItems((prev) => {
      // Check if item already exists in cart
      if (prev.some((item) => item.id === photo.id)) {
        console.log("Cart Provider - Item already in cart")
        return prev
      }
      const newItems = [...prev, photo]
      console.log("Cart Provider - New items:", newItems)
      return newItems
    })
  }

  const removeFromCart = (photoId: number) => {
    if (typeof photoId !== "number") return

    setItems((prev) => prev.filter((item) => item.id !== photoId))
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem('cart')
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
