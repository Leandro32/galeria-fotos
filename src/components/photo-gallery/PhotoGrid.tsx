import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Photo } from "../../types"

interface PhotoGridProps {
  photos: Photo[]
  columns: number
  onPhotoClick: (photo: Photo) => void
  onAddToCart: (photo: Photo) => void
}

const PhotoGrid = ({ photos, columns, onPhotoClick, onAddToCart }: PhotoGridProps) => {
  const createMasonryGrid = (photos: Photo[], columns: number) => {
    const columnWrappers: Record<string, Photo[]> = {}

    // Initialize columns
    for (let i = 0; i < columns; i++) {
      columnWrappers[`column${i}`] = []
    }

    // Distribute photos across columns
    photos.forEach((photo, index) => {
      const columnIndex = index % columns
      columnWrappers[`column${columnIndex}`].push(photo)
    })

    return Object.values(columnWrappers)
  }

  const masonryGrid = createMasonryGrid(photos, columns)

  return (
    <div className="flex gap-4">
      {masonryGrid.map((column, columnIndex) => (
        <div key={columnIndex} className="flex-1 space-y-4">
          {column.map((photo) => (
            <div key={photo.id} className="relative group rounded-md overflow-hidden">
              <div
                className={`relative ${
                  photo.size === "large"
                    ? "aspect-[3/4]"
                    : photo.size === "medium"
                      ? "aspect-[4/3]"
                      : "aspect-square"
                } cursor-pointer`}
                onClick={() => onPhotoClick(photo)}
              >
                <img
                  src={photo.url || "/placeholder.svg"}
                  alt={`Photo ${photo.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Button
                    size="icon"
                    className="rounded-full h-10 w-10 shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddToCart(photo)
                    }}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default PhotoGrid 