import { ShoppingCart } from "lucide-react"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { X, Home } from "lucide-react"
import { useState } from "react"
import { CheckoutForm } from "../components/checkout-form"
import { useCartStore } from "../stores/useCartStore"

const CartPage = () => {
  const { items, removeFromCart, clearCart, calculateTotal } = useCartStore()
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
      clearCart()
    }, 3000)
  }

  const handleCancel = () => {
    setIsCheckout(false)
  }

  console.log({items})

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <ShoppingCart className="mr-3 h-6 w-6" />
          Shopping Cart
          {items.length > 0 && (
            <Badge variant="outline" className="ml-2 text-base">
              {items.length} {items.length === 1 ? "item" : "items"}
            </Badge>
          )}
        </h1>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.location.href = "/"}>
            <Home className="h-4 w-4 mr-1" />
            Back to Home
          </Button>
          
          {items.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearCart}
            >
              <X className="h-4 w-4 mr-1" />
              Clear Cart
            </Button>
          )}
        </div>
      </div>

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-3">Thank you for your purchase!</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Your photos will be available for download in your account.
          </p>
          <Button onClick={() => window.location.href = "/"}>
            Continue Shopping
          </Button>
        </div>
      ) : isCheckout ? (
        <div className="max-w-xl mx-auto">
          <CheckoutForm onComplete={handleCheckoutComplete} onCancel={handleCancel} />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-6" />
          <p className="text-xl text-muted-foreground mb-6">Your cart is empty</p>
          <Button onClick={() => window.location.href = "/"}>
            Start Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <div className="h-24 w-24 overflow-hidden rounded-md flex-shrink-0">
                    <img 
                      src={item.url || "/placeholder.svg"} 
                      alt={item.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                    <div className="flex justify-between items-center mt-3">
                      <Badge variant="outline" className="text-base px-3 py-1">${item.price.toFixed(2)}</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <Separator className="my-6" />
          
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between text-lg mb-4">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold">${calculateTotal().toFixed(2)}</span>
            </div>
            <Button className="w-full py-6 text-lg" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage 