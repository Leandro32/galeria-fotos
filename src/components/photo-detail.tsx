"use client"

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useCart, type Photo } from "./cart-provider"
import { ShoppingCart, MapPin, Calendar, RatioIcon as AspectRatio } from "lucide-react"

interface PhotoDetailProps {
  photo: Photo
  onClose: () => void
}

export function PhotoDetail({ photo, onClose }: PhotoDetailProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    try {
      addToCart(photo)
      onClose()
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square md:aspect-auto">
            <img src={photo.url || "/placeholder.svg"} alt={photo.title} className="object-cover w-full h-full" />
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold">{photo.title}</DialogTitle>
                <DialogDescription className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {photo.location}
                </DialogDescription>
              </div>
              <Badge className="text-lg px-3 py-1">${photo.price.toFixed(2)}</Badge>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">{photo.description}</p>

              {photo.date && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{photo.date}</span>
                  </div>
                  <div className="flex items-center">
                    <AspectRatio className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm capitalize">{photo.orientation}</span>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {photo.categories.map((cat) => (
                    <Badge key={cat} variant="secondary">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              {(photo.resolution || photo.format || photo.license) && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Photo Details</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {photo.resolution && (
                      <div>
                        <span className="text-muted-foreground">Resolution:</span> {photo.resolution}
                      </div>
                    )}
                    {photo.format && (
                      <div>
                        <span className="text-muted-foreground">Format:</span> {photo.format}
                      </div>
                    )}
                    {photo.license && (
                      <div>
                        <span className="text-muted-foreground">License:</span> {photo.license}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button className="w-full" size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
