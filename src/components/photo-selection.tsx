"use client"

import { useState } from "react"
import { Check, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { useCart, type Photo } from "./cart-provider"
import { Badge } from "./ui/badge"

interface PhotoSelectionProps {
  photos: Photo[]
  onPhotoClick: (photo: Photo) => void
}

export function PhotoSelection({ photos, onPhotoClick }: PhotoSelectionProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([])
  const { addToCart } = useCart()
  
  const togglePhotoSelection = (photoId: number) => {
    setSelectedPhotos(prev => 
      prev.includes(photoId)
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    )
  }
  
  const handleAddSelectedToCart = () => {
    const photosToAdd = photos.filter(photo => selectedPhotos.includes(photo.id))
    photosToAdd.forEach(photo => addToCart(photo))
    setSelectedPhotos([])
  }
  
  const isPhotoSelected = (photoId: number) => selectedPhotos.includes(photoId)
  
  return (
    <div className="space-y-6">
      {selectedPhotos.length > 0 && (
        <div className="sticky top-0 z-10 bg-background p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <Badge variant="outline" className="mr-2">
              {selectedPhotos.length} {selectedPhotos.length === 1 ? "photo" : "photos"} selected
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setSelectedPhotos([])}>
              Clear
            </Button>
          </div>
          <Button size="sm" onClick={handleAddSelectedToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className={`group relative border rounded-lg overflow-hidden bg-background ${
              isPhotoSelected(photo.id) ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant={isPhotoSelected(photo.id) ? "default" : "outline"}
                size="icon"
                className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                onClick={() => togglePhotoSelection(photo.id)}
              >
                <Check className={`h-4 w-4 ${isPhotoSelected(photo.id) ? "opacity-100" : "opacity-0"}`} />
              </Button>
            </div>
            
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={photo.url || "/placeholder.svg"}
                alt={photo.title}
                className="object-cover transition-transform group-hover:scale-105"
                onClick={() => onPhotoClick(photo)}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 