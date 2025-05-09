import { ShoppingCart, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Photo } from "../../types"

interface PhotoModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  photo: Photo | null
  photos: Photo[]
  onNavigate: (direction: "next" | "prev") => void
  onAddToCart: (photo: Photo) => void
  onSelectPhoto: (photo: Photo) => void
  thumbnailsRef: React.RefObject<HTMLDivElement>
}

const PhotoModal = ({
  isOpen,
  onOpenChange,
  photo,
  photos,
  onNavigate,
  onAddToCart,
  onSelectPhoto,
  thumbnailsRef,
}: PhotoModalProps) => {
  if (!photo) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-0 h-[90vh] flex flex-col">
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
        <div className="bg-slate-950 flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Photo */}
          <div className="relative flex-1 min-h-[50%] md:min-h-0">
            <img
              src={photo.url || "/placeholder.svg"}
              alt={photo.title}
              className="w-full h-full object-contain"
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

            <Button className="w-full" onClick={() => onAddToCart(photo)}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Thumbnails navigation */}
        <div className="p-4 border-t">
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max" ref={thumbnailsRef}>
              {photos.map((p) => (
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
}

export default PhotoModal 