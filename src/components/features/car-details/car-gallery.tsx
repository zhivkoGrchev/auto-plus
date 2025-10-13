'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

interface CarImage {
  id: string
  imageUrl: string
  order: number
}

interface CarGalleryProps {
  images: CarImage[]
  mainImageUrl?: string | null
  carName: string
}

export default function CarGallery({ images, mainImageUrl, carName }: CarGalleryProps) {
  const allImages = [...(mainImageUrl ? [{ id: 'main', imageUrl: mainImageUrl, order: -1 }] : []), ...images.sort((a, b) => a.order - b.order)]

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') setIsFullscreen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, allImages.length])

  const handleNext = () => {
    setIsImageLoading(true)
    setSelectedIndex((prev) => (prev + 1) % allImages.length)
  }

  const handlePrevious = () => {
    setIsImageLoading(true)
    setSelectedIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  if (allImages.length === 0) {
    return (
      <div className="w-full h-80 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
        <span className="text-gray-400 dark:text-gray-500">No images available</span>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image Container */}
        <div className="relative w-full h-80 md:h-96 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden group">
          {/* Loading Skeleton */}
          {isImageLoading && <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />}

          {/* Main Image */}
          <img
            src={allImages[selectedIndex].imageUrl}
            alt={`${carName} - Car ${selectedIndex + 1}`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsImageLoading(false)}
          />

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            {selectedIndex + 1} / {allImages.length}
          </div>

          {/* Navigation Arrows - Only show if multiple images */}
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            aria-label="View fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {allImages.map((image, index) => (
              <button
                type="button"
                key={image.id}
                onClick={() => {
                  setIsImageLoading(true)
                  setSelectedIndex(index)
                }}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === selectedIndex
                    ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <img src={image.imageUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all backdrop-blur-sm z-10"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm z-10">
            {selectedIndex + 1} / {allImages.length}
          </div>

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all backdrop-blur-sm z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all backdrop-blur-sm z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Fullscreen Image */}
          <img
            src={allImages[selectedIndex].imageUrl}
            alt={`${carName} - Car ${selectedIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Thumbnail Strip */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-2">
              {allImages.map((image, index) => (
                <button
                  type="button"
                  key={image.id}
                  onClick={() => setSelectedIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === selectedIndex ? 'border-white ring-2 ring-white/50' : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  <img src={image.imageUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
