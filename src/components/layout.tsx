"use client"

import { ReactNode } from "react"
import { CartProvider } from "./cart-provider"
import { ShoppingCart } from "./shopping-cart"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col" data-testid="layout">
        <header className="border-b bg-background sticky top-0 z-10" data-testid="header">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold">Photo Gallery</h1>
            <ShoppingCart />
          </div>
        </header>
        
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
        
        <footer className="border-t py-6 bg-background">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Photo Gallery. All rights reserved.
          </div>
        </footer>
      </div>
    </CartProvider>
  )
} 