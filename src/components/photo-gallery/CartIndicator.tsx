import { ShoppingCart } from "lucide-react"
import { Button } from "../ui/button"

interface CartIndicatorProps {
  count: number
}

const CartIndicator = ({ count }: CartIndicatorProps) => {
  if (count === 0) return null
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button variant="default">
        <ShoppingCart className="h-4 w-4 mr-2" />
        Cart ({count})
      </Button>
    </div>
  )
}

export default CartIndicator 