"use client"

import { useState } from "react"
// import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart, type Photo } from "@/components/cart-provider"
import { PhotoDetail } from "@/components/photo-detail"
import { ShoppingCart } from "lucide-react"
import { photos } from "@/data/photos"

export function PhotoGallery() {
  // const searchParams = useSearchParams()
  // const location = searchParams?.get("location") || ""
  // const category = searchParams?.get("category") || ""
  // const priceRange = searchParams?.get("priceRange") || ""
  // const orientation = searchParams?.get("orientation") || ""

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const { addToCart } = useCart()

  // Filter photos based on search params
  const filteredPhotos = photos.filter((photo) => {
    try {
      // Primary filter - location must match
      if (location && photo.location !== location) return false

      // Secondary filters
      if (category && !photo.categories.includes(category)) return false

      if (priceRange) {
        const [min, max] = priceRange.split("-").map(Number)
        if (!isNaN(min) && !isNaN(max) && (photo.price < min || photo.price > max)) return false
      }

      if (orientation && photo.orientation !== orientation) return false

      return true
    } catch (error) {
      console.error("Error filtering photo:", error)
      return false
    }
  })

  if (!location) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-semibold mb-4">Please select a location</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Start by selecting a location from the sidebar to view available photos
        </p>
      </div>
    )
  }

  if (filteredPhotos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl font-semibold mb-4">No photos found</h2>
        <p className="text-muted-foreground text-center max-w-md">Try adjusting your filters to see more results</p>
      </div>
    )
  }

  const handleAddToCart = (photo: Photo) => {
    try {
      addToCart(photo)
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {location && `Photos from ${location}`}
          <span className="ml-2 text-muted-foreground text-lg font-normal">({filteredPhotos.length} photos)</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="group relative border rounded-lg overflow-hidden bg-background">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={photo.url || "/placeholder.svg"}
                alt={photo.title}
                // fill
                className="object-cover transition-transform group-hover:scale-105"
                onClick={() => setSelectedPhoto(photo)}
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{photo.title}</h3>
                  <p className="text-sm text-muted-foreground">{photo.location}</p>
                </div>
                <Badge variant="outline">${photo.price.toFixed(2)}</Badge>
              </div>
              <div className="flex gap-2 mt-2">
                {photo.categories.slice(0, 2).map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>
              <Button className="w-full mt-4" onClick={() => handleAddToCart(photo)} size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && <PhotoDetail photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </div>
  )
}
