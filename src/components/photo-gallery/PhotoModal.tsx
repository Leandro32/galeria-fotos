import { ShoppingCart, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Photo } from "../../types"
import { useCartStore, Photo as CartPhoto } from "../../stores/useCartStore"
import { memo, useMemo } from "react"

interface PhotoModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  photo: Photo | null
  photos: Photo[]
  onNavigate: (direction: "next" | "prev") => void
  onSelectPhoto: (photo: Photo) => void
  thumbnailsRef: React.RefObject<HTMLDivElement>
}

const PhotoModal = memo(({
  isOpen,
  onOpenChange,
  photo,
  photos,
  onNavigate,
  onSelectPhoto,
  thumbnailsRef,
}: PhotoModalProps) => {
  const { addToCart } = useCartStore()
  
  if (!photo) return null

  const handleAddToCart = (photo: Photo) => {
    const cartPhoto: CartPhoto = {
      id: photo.id,
      title: photo.title,
      description: photo.description,
      url: photo.url,
      price: photo.price,
      location: photo.location,
      categories: [], // Default empty array
      orientation: "landscape", // Default to landscape
      date: photo.date,
    }
    addToCart(cartPhoto)
  }

  // Only render visible thumbnails for better performance
  const visiblePhotos = useMemo(() => {
    if (!photo) return [];
    
    const currentIndex = photos.findIndex(p => p.id === photo.id);
    const windowSize = 10; // Show 10 thumbnails at a time
    
    const startIdx = Math.max(0, currentIndex - Math.floor(windowSize / 2));
    const endIdx = Math.min(photos.length, startIdx + windowSize);
    
    return photos.slice(startIdx, endIdx);
  }, [photo, photos]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-0 h-[90vh] flex flex-col bg-background dark:bg-background-dark">
        <DialogTitle className="sr-only">{photo.title}</DialogTitle>
        <DialogDescription className="sr-only">{photo.description}</DialogDescription>
        
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Navigation buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={() => onNavigate("prev")}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={() => onNavigate("next")}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Main content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Photo */}
          <div className="relative flex-1 min-h-[50%] md:min-h-0">
            <img
              src={photo.url || "/placeholder.svg"}
              alt={photo.title}
              className="w-full h-full object-contain"
              fetchPriority="high"
            />
          </div>

          {/* Details */}
          <div className="p-6 md:w-80 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2">{photo.title}</h2>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">{photo.location}</Badge>
              <Badge className="bg-primary">${photo.price.toFixed(2)}</Badge>
            </div>
            <p className="text-muted-foreground mb-4">{photo.description}</p>
            <p className="text-sm mb-6">Date: {photo.date}</p>

            <Button className="w-full" onClick={() => handleAddToCart(photo)}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Thumbnails navigation */}
        <div className="p-4 border-t">
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max" ref={thumbnailsRef}>
              {visiblePhotos.map((p) => (
                <div
                  key={p.id}
                  className={`relative cursor-pointer transition-all ${
                    photo.id === p.id
                      ? "ring-4 ring-primary"
                      : "ring-1 ring-border hover:ring-2 hover:ring-primary/50"
                  }`}
                  onClick={() => onSelectPhoto(p)}
                >
                  <div className="h-16 w-24 relative">
                    <img
                      src={p.url || "/placeholder.svg"}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={96}
                      height={64}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
})

export default PhotoModal