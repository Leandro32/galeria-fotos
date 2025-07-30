"use client"

import { useState } from "react"
import { useCartStore } from "../stores/useCartStore"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { CreditCard, Landmark, Wallet } from "lucide-react"

interface CheckoutFormProps {
  onComplete: () => void
  onCancel: () => void
}

export function CheckoutForm({ onComplete, onCancel }: CheckoutFormProps) {
  const { items, calculateTotal, clearCart } = useCartStore()
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Process successful payment
      onComplete()
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Your cart is empty</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={onCancel} className="w-full">
            Return to Gallery
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Please enter your contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="John Doe" 
                required 
                value={formData.name} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="john@example.com" 
                required 
                value={formData.email} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea 
                id="address" 
                name="address" 
                placeholder="123 Main St, Apt 4B" 
                value={formData.address} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  name="city" 
                  placeholder="New York" 
                  value={formData.city} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input 
                  id="zipCode" 
                  name="zipCode" 
                  placeholder="10001" 
                  value={formData.zipCode} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select how you want to pay</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod} 
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    Credit / Debit Card
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                    <Landmark className="h-4 w-4" />
                    Bank Transfer
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
                    <Wallet className="h-4 w-4" />
                    Cash on Delivery
                  </Label>
                </div>
              </RadioGroup>
              
              {paymentMethod === "card" && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber" 
                      name="cardNumber" 
                      placeholder="1234 5678 9012 3456" 
                      required={paymentMethod === "card"} 
                      value={formData.cardNumber} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Expiry Date</Label>
                      <Input 
                        id="cardExpiry" 
                        name="cardExpiry" 
                        placeholder="MM/YY" 
                        required={paymentMethod === "card"} 
                        value={formData.cardExpiry} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardCvc">CVC</Label>
                      <Input 
                        id="cardCvc" 
                        name="cardCvc" 
                        placeholder="123" 
                        required={paymentMethod === "card"} 
                        value={formData.cardCvc} 
                        onChange={handleInputChange} 
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your order before confirming</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="max-h-40 overflow-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between py-2">
                      <div className="flex gap-2">
                        <div className="h-10 w-10 rounded overflow-hidden">
                          <img 
                            src={item.url || "/placeholder.svg"} 
                            alt={item.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-sm line-clamp-1">{item.title}</span>
                      </div>
                      <span className="text-sm font-medium">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${(calculateTotal() * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={onCancel} 
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-1">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Complete Purchase"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </form>
  )
} 