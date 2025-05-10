"use client"

import { useState, useEffect, useRef } from "react"
import { locations, photos } from "../data/photos"
import { Photo } from "../types"
import CartIndicator from "../components/photo-gallery/CartIndicator"
import LocationSelector from "../components/photo-gallery/LocationSelector"
import PhotoFilters from "../components/photo-gallery/PhotoFilters"
import PhotoGrid from "../components/photo-gallery/PhotoGrid"
import PhotoModal from "../components/photo-gallery/PhotoModal"
import { Link } from "react-router-dom"

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [masonryColumns, setMasonryColumns] = useState<number>(3)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [photographerFilter, setPhotographerFilter] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<string>("")
  const [hourFilter, setHourFilter] = useState<string>("")
  const thumbnailsRef = useRef<HTMLDivElement>(null)

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

  // Open photo modal
  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo)
    setModalOpen(true)
  }

  // Navigate to next/previous photo
  const navigatePhoto = (direction: "next" | "prev") => {
    if (!selectedPhoto) return
    
    const currentIndex = filteredPhotos.findIndex((photo) => photo.id === selectedPhoto.id)
    let newIndex: number

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredPhotos.length
    } else {
      newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    }

    setSelectedPhoto(filteredPhotos[newIndex])
    scrollToThumbnail(newIndex)
  }

  // Scroll thumbnail into view
  const scrollToThumbnail = (index: number) => {
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
    const handleKeyDown = (e: KeyboardEvent) => {
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

  const resetFilters = () => {
    setPhotographerFilter("")
    setDateFilter("")
    setHourFilter("")
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Photo Gallery</h1>
          <div className="flex gap-2">
            <Link 
              to="/upload" 
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <span>Subir Fotos</span>
            </Link>
          </div>
        </div>
        
        {/* Cart indicator component */}
        <CartIndicator />

        {/* Location selection cards */}
        {!selectedLocation && (
          <LocationSelector 
            locations={locations} 
            onSelect={setSelectedLocation}
          />
        )}

        {/* Back button and filters when location is selected */}
        {selectedLocation && (
          <PhotoFilters
            selectedLocation={selectedLocation}
            photographers={photographers}
            photographerFilter={photographerFilter}
            setPhotographerFilter={setPhotographerFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            hourFilter={hourFilter}
            setHourFilter={setHourFilter}
            onBack={() => setSelectedLocation("")}
            onResetFilters={resetFilters}
            photos={photos}
          />
        )}

        {/* Masonry photo grid */}
        {selectedLocation && (
          <PhotoGrid
            photos={filteredPhotos}
            columns={masonryColumns}
            onPhotoClick={openPhotoModal}
          />
        )}

        {/* Photo Modal */}
        <PhotoModal
          isOpen={modalOpen}
          onOpenChange={setModalOpen}
          photo={selectedPhoto}
          photos={filteredPhotos}
          onNavigate={navigatePhoto}
          onSelectPhoto={setSelectedPhoto}
          thumbnailsRef={thumbnailsRef as React.RefObject<HTMLDivElement>}
        />
      </main>
    </div>
  )
}

export default HomePage
