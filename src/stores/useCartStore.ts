import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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

// Define the cart store state
interface CartState {
  items: Photo[]
  addToCart: (photo: Photo) => void
  removeFromCart: (photoId: number) => void
  clearCart: () => void
  calculateTotal: () => number
}

// Create the cart store with persistence
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (photo: Photo) => {
        if (!photo || typeof photo.id !== "number") {
          console.error("Invalid photo object:", photo)
          return
        }
        
        set((state) => {
          // Check if item already exists in cart
          if (state.items.some((item) => item.id === photo.id)) {
            return state // Return unchanged state if item already exists
          }
          return { items: [...state.items, photo] }
        })
      },
      
      removeFromCart: (photoId: number) => {
        if (typeof photoId !== "number") return
        
        set((state) => ({
          items: state.items.filter((item) => item.id !== photoId)
        }))
      },
      
      clearCart: () => set({ items: [] }),
      
      calculateTotal: () => {
        return get().items.reduce(
          (total, item) => total + (typeof item.price === "number" ? item.price : 0), 
          0
        )
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
) 