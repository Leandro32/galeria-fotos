"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "../components/ui/button"
import { Dialog, DialogContent } from "../components/ui/dialog"
import { Badge } from "../components/ui/badge"
import { ShoppingCart, Plus, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

// Simple data structures
const locations = [
  {
    id: "new-york",
    name: "New York",
    image: "/placeholder.svg",
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    image: "/placeholder.svg",
  },
  {
    id: "chicago",
    name: "Chicago",
    image: "/placeholder.svg",
  },
  {
    id: "san-francisco",
    name: "San Francisco",
    image: "/placeholder.svg",
  },
  {
    id: "miami",
    name: "Miami",
    image: "/placeholder.svg",
  },
]

const photos = [
  {
    id: 1,
    title: "Sunset at Venice Beach",
    description:
      "A breathtaking sunset view over the Pacific Ocean at Venice Beach, capturing the golden hour with silhouettes of palm trees and surfers.",
    url: "/placeholder.svg",
    location: "Los Angeles",
    price: 29.99,
    size: "large", // for masonry layout
    date: "June 15, 2023",
    photographer: "Alex Johnson",
    hour: "Evening",
  },
  {
    id: 2,
    title: "Brooklyn Bridge at Night",
    description:
      "The iconic Brooklyn Bridge illuminated at night with the Manhattan skyline in the background, reflecting on the East River.",
    url: "/placeholder.svg",
    location: "New York",
    price: 34.99,
    size: "small",
    date: "September 3, 2023",
    photographer: "Leandro",
    hour: "Night",
  },
  {
    id: 3,
    title: "Golden Gate in Fog",
    description:
      "The majestic Golden Gate Bridge emerging from the iconic San Francisco fog, creating a mystical atmosphere.",
    url: "/placeholder.svg",
    location: "San Francisco",
    price: 24.99,
    size: "medium",
    date: "November 12, 2023",
    photographer: "David Lee",
    hour: "Morning",
  },
  {
    id: 4,
    title: "Chicago Skyline Panorama",
    description:
      "A wide panoramic view of the Chicago skyline from Lake Michigan, showcasing the city's impressive architecture.",
    url: "/placeholder.svg",
    location: "Chicago",
    price: 39.99,
    size: "medium",
    date: "July 4, 2023",
    photographer: "Emily White",
    hour: "Day",
  },
  {
    id: 5,
    title: "Miami Beach Sunrise",
    description:
      "A vibrant sunrise over Miami Beach with colorful lifeguard towers and palm trees silhouetted against the morning sky.",
    url: "/placeholder.svg",
    location: "Miami",
    price: 19.99,
    size: "large",
    date: "February 20, 2024",
    photographer: "Carlos Rodriguez",
    hour: "Morning",
  },
  {
    id: 6,
    title: "Griffith Observatory View",
    description:
      "A stunning view of Los Angeles from the Griffith Observatory at dusk, with city lights beginning to twinkle.",
    url: "/placeholder.svg",
    location: "Los Angeles",
    price: 27.99,
    size: "small",
    date: "August 15, 2023",
    photographer: "Alex Johnson",
    hour: "Evening",
  },
  {
    id: 7,
    title: "Central Park in Autumn",
    description: "The vibrant fall colors of Central Park with the New York skyline rising in the background.",
    url: "/placeholder.svg",
    location: "New York",
    price: 22.99,
    size: "medium",
    date: "October 20, 2023",
    photographer: "Leandro",
    hour: "Day",
  },
  {
    id: 8,
    title: "Alcatraz Island",
    description: "The historic Alcatraz Island prison in San Francisco Bay, shrouded in light fog.",
    url: "/placeholder.svg",
    location: "San Francisco",
    price: 29.99,
    size: "small",
    date: "March 2, 2024",
    photographer: "David Lee",
    hour: "Morning",
  },
  {
    id: 9,
    title: "Navy Pier Ferris Wheel",
    description: "The colorful Ferris wheel at Navy Pier in Chicago illuminated against the night sky.",
    url: "/placeholder.svg",
    location: "Chicago",
    price: 32.99,
    size: "large",
    date: "December 31, 2023",
    photographer: "Emily White",
    hour: "Night",
  },
  {
    id: 10,
    title: "Art Deco Miami",
    description: "The colorful Art Deco buildings of Miami's South Beach district at sunset.",
    url: "/placeholder.svg",
    location: "Miami",
    price: 24.99,
    size: "small",
    date: "January 10, 2024",
    photographer: "Carlos Rodriguez",
    hour: "Evening",
  },
  {
    id: 11,
    title: "Hollywood Sign",
    description: "The iconic Hollywood sign overlooking Los Angeles on a clear day.",
    url: "/placeholder.svg",
    location: "Los Angeles",
    price: 26.99,
    size: "medium",
    date: "April 15, 2024",
    photographer: "Alex Johnson",
    hour: "Day",
  },
  {
    id: 12,
    title: "Times Square Lights",
    description: "The dazzling lights and billboards of Times Square in the heart of New York City.",
    url: "/placeholder.svg",
    location: "New York",
    price: 34.99,
    size: "medium",
    date: "May 5, 2023",
    photographer: "Leandro",
    hour: "Night",
  },
  {
    id: 13,
    title: "Painted Ladies",
    description: "The famous 'Painted Ladies' Victorian houses with the San Francisco skyline in the background.",
    url: "/placeholder.svg",
    location: "San Francisco",
    price: 29.99,
    size: "large",
    date: "June 22, 2023",
    photographer: "David Lee",
    hour: "Day",
  },
  {
    id: 14,
    title: "Chicago River",
    description:
      "The Chicago River dyed green for St. Patrick's Day, with the city's architecture lining the riverbanks.",
    url: "/placeholder.svg",
    location: "Chicago",
    price: 19.99,
    size: "small",
    date: "March 17, 2024",
    photographer: "Emily White",
    hour: "Day",
  },
  {
    id: 15,
    title: "Wynwood Walls",
    description: "The colorful street art murals of Miami's Wynwood Walls arts district.",
    url: "/placeholder.svg",
    location: "Miami",
    price: 24.99,
    size: "medium",
    date: "August 8, 2023",
    photographer: "Carlos Rodriguez",
    hour: "Day",
  },
]

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState("")
  const [cart, setCart] = useState([])
  const [masonryColumns, setMasonryColumns] = useState(3)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [photographerFilter, setPhotographerFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [hourFilter, setHourFilter] = useState("")
  const thumbnailsRef = useRef(null)

  // Responsive columns based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMasonryColumns(1)
      } else if (window.innerWidth < 1024) {
        setMasonryColumns(2)
      } else {
        setMasonryColumns(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Filter photos based on selected location and other filters
  const filteredPhotos = selectedLocation
    ? photos.filter((photo) => {
        // Primary filter - location
        if (photo.location !== selectedLocation) return false

        // Photographer filter
        if (photographerFilter && (!photo.photographer || photo.photographer !== photographerFilter)) return false

        // Date range filter
        if (dateFilter) {
          const [startDate, endDate] = dateFilter.split(",")
          if (startDate || endDate) {
            const photoDate = new Date(photo.date)
            if (startDate && new Date(startDate) > photoDate) return false
            if (endDate && new Date(endDate) < photoDate) return false
          }
        }

        // Hour filter - match the beginning of the time string
        if (hourFilter && hourFilter !== "all") {
          // This is a simplified example - in a real app you'd parse the actual time from the photo metadata
          const photoHour =
            photo.hour === "Morning"
              ? "08:00"
              : photo.hour === "Day"
                ? "12:00"
                : photo.hour === "Evening"
                  ? "18:00"
                  : "22:00"
          if (!photoHour.startsWith(hourFilter.slice(0, 2))) return false
        }

        return true
      })
    : []

  // Extract unique filter values
  const photographers = [
    ...new Set(
      photos
        .filter((p) => p.location === selectedLocation)
        .map((p) => p.photographer)
        .filter(Boolean),
    ),
  ]
  const dates = [
    ...new Set(
      photos
        .filter((p) => p.location === selectedLocation)
        .map((p) => p.date?.split(" ")[0])
        .filter(Boolean),
    ),
  ]
  const hours = [
    ...new Set(
      photos
        .filter((p) => p.location === selectedLocation)
        .map((p) => p.hour)
        .filter(Boolean),
    ),
  ]

  // Add to cart function
  const addToCart = (photo) => {
    setCart((prev) => {
      if (prev.some((item) => item.id === photo.id)) {
        return prev
      }
      return [...prev, photo]
    })
  }

  // Create masonry layout
  const createMasonryGrid = (photos, columns) => {
    const columnWrappers = {}

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

  const masonryGrid = createMasonryGrid(filteredPhotos, masonryColumns)

  // Open photo modal
  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo)
    setModalOpen(true)
  }

  // Navigate to next/previous photo
  const navigatePhoto = (direction) => {
    const currentIndex = filteredPhotos.findIndex((photo) => photo.id === selectedPhoto.id)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredPhotos.length
    } else {
      newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    }

    setSelectedPhoto(filteredPhotos[newIndex])
    scrollToThumbnail(newIndex)
  }

  // Scroll thumbnail into view
  const scrollToThumbnail = (index) => {
    if (thumbnailsRef.current) {
      const thumbnailElement = thumbnailsRef.current.children[index]
      if (thumbnailElement) {
        thumbnailElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return

      if (e.key === "ArrowRight") {
        navigatePhoto("next")
      } else if (e.key === "ArrowLeft") {
        navigatePhoto("prev")
      } else if (e.key === "Escape") {
        setModalOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [modalOpen, selectedPhoto])

  // Scroll selected thumbnail into view when modal opens
  useEffect(() => {
    if (modalOpen && selectedPhoto) {
      const index = filteredPhotos.findIndex((photo) => photo.id === selectedPhoto.id)
      setTimeout(() => scrollToThumbnail(index), 100)
    }
  }, [modalOpen, selectedPhoto])

  return (
    <div className="min-h-screen">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Photo Gallery</h1>
        
        {/* Cart indicator */}
        {cart.length > 0 && (
          <div className="fixed top-4 right-4 z-50">
            <Button variant="default">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({cart.length})
            </Button>
          </div>
        )}

        {/* Location selection cards */}
        {!selectedLocation && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Select a Location</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="relative cursor-pointer rounded-lg overflow-hidden group"
                  onClick={() => setSelectedLocation(location.name)}
                >
                  <div className="aspect-[4/3] relative">
                    <img src={location.image || "/placeholder.svg"} alt={location.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <h3 className="text-white text-xl font-bold">{location.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back button and filters when location is selected */}
        {selectedLocation && (
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <Button variant="outline" onClick={() => setSelectedLocation("")}>
                ← Back to Locations
              </Button>
              <h2 className="text-2xl font-semibold ml-4">{selectedLocation}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Photographer filter with thumbnails */}
              <div>
                <label className="text-sm font-medium mb-1 block">Photographer</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {photographers.map((photographer) => {
                    // Find a photo by this photographer to use as thumbnail
                    const photographerPhoto = photos.find(
                      (p) => p.photographer === photographer && p.location === selectedLocation,
                    )
                    return (
                      <div
                        key={photographer}
                        onClick={() => setPhotographerFilter(photographerFilter === photographer ? "" : photographer)}
                        className={`flex items-center p-2 rounded-md cursor-pointer border ${
                          photographerFilter === photographer
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="relative rounded-full overflow-hidden mr-2">
                          <img
                            src={photographerPhoto?.url || "/placeholder.svg"}
                            alt={photographer}
                            className="object-cover h-10 w-10"
                          />
                        </div>
                        <span className="text-sm truncate">{photographer}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Date range filter */}
              <div>
                <label className="text-sm font-medium mb-1 block">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">From</label>
                    <input
                      type="date"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={dateFilter.split(",")[0] || ""}
                      onChange={(e) => {
                        const endDate = dateFilter.split(",")[1] || ""
                        setDateFilter(`${e.target.value}${endDate ? "," + endDate : ""}`)
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">To</label>
                    <input
                      type="date"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={dateFilter.split(",")[1] || ""}
                      onChange={(e) => {
                        const startDate = dateFilter.split(",")[0] || ""
                        setDateFilter(`${startDate}${startDate ? "," : ""}${e.target.value}`)
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Hour filter */}
              <div>
                <label className="text-sm font-medium mb-1 block">Hour</label>
                <Select value={hourFilter} onValueChange={setHourFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All hours</SelectItem>
                    {[
                      "06:00",
                      "07:00",
                      "08:00",
                      "09:00",
                      "10:00",
                      "11:00",
                      "12:00",
                      "13:00",
                      "14:00",
                      "15:00",
                      "16:00",
                      "17:00",
                      "18:00",
                      "19:00",
                      "20:00",
                      "21:00",
                      "22:00",
                      "23:00",
                      "00:00",
                    ].map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Reset filters button */}
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setPhotographerFilter("")
                  setDateFilter("")
                  setHourFilter("")
                }}
                disabled={!photographerFilter && !dateFilter && !hourFilter}
                size="sm"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}

        {/* Masonry photo grid */}
        {selectedLocation && (
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
                      onClick={() => openPhotoModal(photo)}
                    >
                      <img
                        src={photo.url || "/placeholder.svg"}
                        alt={`Photo ${photo.id}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <Button
                          size="icon"
                          className="rounded-full h-10 w-10 shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(photo)
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
        )}

        {/* Photo Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-6xl p-0 h-[90vh] flex flex-col">
            {selectedPhoto && (
              <>
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={() => setModalOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>

                {/* Navigation buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={() => navigatePhoto("prev")}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={() => navigatePhoto("next")}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                {/* Main content */}
                <div className="bg-slate-950 flex-1 overflow-hidden flex flex-col md:flex-row">
                  {/* Photo */}
                  <div className="relative flex-1 min-h-[50%] md:min-h-0">
                    <img
                      src={selectedPhoto.url || "/placeholder.svg"}
                      alt={selectedPhoto.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-6 md:w-80 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline">{selectedPhoto.location}</Badge>
                      <Badge className="bg-primary">${selectedPhoto.price.toFixed(2)}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{selectedPhoto.description}</p>
                    <p className="text-sm mb-6">Date: {selectedPhoto.date}</p>

                    <Button className="w-full" onClick={() => addToCart(selectedPhoto)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                {/* Thumbnails navigation */}
                <div className="p-4 border-t">
                  <div className="overflow-x-auto pb-2">
                    <div className="flex gap-2 min-w-max" ref={thumbnailsRef}>
                      {filteredPhotos.map((photo) => (
                        <div
                          key={photo.id}
                          className={`relative cursor-pointer transition-all ${
                            selectedPhoto.id === photo.id
                              ? "ring-4 ring-primary"
                              : "ring-1 ring-border hover:ring-2 hover:ring-primary/50"
                          }`}
                          onClick={() => setSelectedPhoto(photo)}
                        >
                          <div className="h-16 w-24 relative">
                            <img
                              src={photo.url || "/placeholder.svg"}
                              alt={photo.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

export default HomePage
