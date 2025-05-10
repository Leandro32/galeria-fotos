"use client"

import { useState } from "react"
// import { useSearchParams } from "next/navigation"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useCart, type Photo } from "./cart-provider"
import { PhotoDetail } from "./photo-detail"
import { PhotoSelection } from "./photo-selection"
import { photos as rawPhotos } from "../data/photos"

// Transform data photos to match the Photo type expected by cart
const mapToCartPhoto = (photo: any): Photo => {
  return {
    id: photo.id,
    title: photo.title,
    description: photo.description,
    url: photo.url,
    price: photo.price,
    location: photo.location,
    // Add missing properties required by the Photo type in cart-provider
    categories: photo.categories || [],
    orientation: photo.orientation || "landscape",
    date: photo.date,
    // Optional properties
    resolution: photo.resolution,
    format: photo.format,
    license: photo.license,
  }
}

// Map the photos from data to the correct type
const photos = rawPhotos.map(mapToCartPhoto)

export function PhotoGallery() {
  // const searchParams = useSearchParams()
  // const location = searchParams?.get("location") || ""
  // const category = searchParams?.get("category") || ""
  // const priceRange = searchParams?.get("priceRange") || ""
  // const orientation = searchParams?.get("orientation") || ""

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const { addToCart } = useCart()

  // For demo purposes, hardcode a location if none is provided
  const location = "Los Angeles" // This would normally come from searchParams

  // Filter photos based on search params
  const filteredPhotos = photos.filter((photo) => {
    try {
      // Primary filter - location must match
      if (location && photo.location !== location) return false

      // Secondary filters
      // if (category && !photo.categories.includes(category)) return false

      // if (priceRange) {
      //   const [min, max] = priceRange.split("-").map(Number)
      //   if (!isNaN(min) && !isNaN(max) && (photo.price < min || photo.price > max)) return false
      // }

      // if (orientation && photo.orientation !== orientation) return false

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

  return (
    <div className="space-y-6" data-testid="photo-gallery">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {location && `Photos from ${location}`}
          <span className="ml-2 text-muted-foreground text-lg font-normal">({filteredPhotos.length} photos)</span>
        </h2>
      </div>

      <PhotoSelection photos={filteredPhotos} onPhotoClick={setSelectedPhoto} />

      {selectedPhoto && <PhotoDetail photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </div>
  )
}
