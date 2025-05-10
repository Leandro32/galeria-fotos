import { ShoppingCart } from "lucide-react"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useCartStore } from "../../stores/useCartStore"

interface CartIndicatorProps {}

const CartIndicator = ({}: CartIndicatorProps) => {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const count = items.length
  
  useEffect(() => {
    console.log("CartIndicator count:", count)
  }, [count])
  
  // Always render the component, but conditionally apply visibility
  const visibility = count === 0 ? "invisible" : "visible"
  
  const handleClick = () => {
    console.log("Navigating to cart page")
    navigate("/cart")
  }
  
  return (
    <div className={`fixed top-4 right-4 z-50 ${visibility}`}>
      <Button variant="default" onClick={handleClick}>
        <ShoppingCart className="h-4 w-4 mr-2" />
        Cart ({count})
      </Button>
    </div>
  )
}

export default CartIndicator 