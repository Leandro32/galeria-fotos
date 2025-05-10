"use client"

import { useState } from "react"
import { ShoppingCart as CartIcon, X, Trash2, Check } from "lucide-react"
import { useCart } from "./cart-provider"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"
import { Separator } from "./ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { CheckoutForm } from "./checkout-form"

export function ShoppingCart() {
  const { items, removeFromCart, clearCart, calculateTotal } = useCart()
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const handleCheckout = () => {
    setIsCheckout(true)
  }

  const handleCheckoutComplete = () => {
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      setIsCheckout(false)
    }, 3000)
  }

  const handleCancel = () => {
    setIsCheckout(false)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative" data-testid="shopping-cart-button">
          <CartIcon className="h-5 w-5" />
          {items.length > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Thank you for your purchase!</h2>
            <p className="text-center text-muted-foreground mb-4">
              Your photos will be available for download in your account.
            </p>
          </div>
        ) : isCheckout ? (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <CartIcon className="mr-2 h-5 w-5" />
                Checkout
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-auto py-4">
              <CheckoutForm onComplete={handleCheckoutComplete} onCancel={handleCancel} />
            </div>
          </>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <CartIcon className="mr-2 h-5 w-5" />
                Shopping Cart
                <Badge variant="outline" className="ml-2">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </Badge>
                {items.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto" 
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </SheetTitle>
            </SheetHeader>
            
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 py-12">
                <CartIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto py-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <Card key={item.id} className="p-3">
                        <div className="flex gap-3">
                          <div className="h-20 w-20 overflow-hidden rounded-md">
                            <img 
                              src={item.url || "/placeholder.svg"} 
                              alt={item.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium line-clamp-1">{item.title}</h3>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={() => removeFromCart(item.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.location}</p>
                            <div className="flex justify-between items-center mt-2">
                              <Badge variant="outline">${item.price.toFixed(2)}</Badge>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Subtotal</span>
                      <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                    </div>
                    <Button className="w-full" onClick={handleCheckout}>
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  )
} 