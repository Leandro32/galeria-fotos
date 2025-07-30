import { MainNav } from "../photo-gallery/main-nav"
import { UserNav } from "../photo-gallery/user-nav"
import { ShoppingCart } from "lucide-react"
import { Button } from "./button"
import { useNavigate } from "react-router-dom"
import { useCartStore } from "../../stores/useCartStore"
import { Badge } from "./badge"

export function Header() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const count = items.length
  
  const handleCartClick = () => {
    navigate("/cart")
  }
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <MainNav />
        
        <div className="ml-auto flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleCartClick} 
            className="relative"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
              >
                {count}
              </Badge>
            )}
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  )
} 