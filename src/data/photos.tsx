export interface Photo {
  id: number
  title: string
  description: string
  url: string
  price: number
  location: string
  categories: string[]
  orientation: string
  date: string
  resolution: string
  format: string
  license: string
}

export const photos: Photo[] = [
  {
    id: 1,
    title: "Sunset at Venice Beach",
    description:
      "A breathtaking sunset view over the Pacific Ocean at Venice Beach, capturing the golden hour with silhouettes of palm trees and surfers.",
    url: "/placeholder.svg?height=600&width=800",
    price: 29.99,
    location: "Los Angeles",
    categories: ["Landscape", "Beach", "Sunset"],
    orientation: "landscape",
    date: "June 15, 2023",
    resolution: "5000 x 3333 px",
    format: "JPEG",
    license: "Standard",
  },
  {
    id: 2,
    title: "Brooklyn Bridge at Night",
    description:
      "The iconic Brooklyn Bridge illuminated at night with the Manhattan skyline in the background, reflecting on the East River.",
    url: "/placeholder.svg?height=600&width=800",
    price: 34.99,
    location: "New York",
    categories: ["Architecture", "City", "Night"],
    orientation: "landscape",
    date: "September 3, 2023",
    resolution: "6000 x 4000 px",
    format: "JPEG",
    license: "Standard",
  },
  {
    id: 3,
    title: "Golden Gate in Fog",
    description:
      "The majestic Golden Gate Bridge emerging from the iconic San Francisco fog, creating a mystical atmosphere.",
    url: "/placeholder.svg?height=800&width=600",
    price: 24.99,
    location: "San Francisco",
    categories: ["Architecture", "Fog", "Bridge"],
    orientation: "portrait",
    date: "November 12, 2023",
    resolution: "4000 x 6000 px",
    format: "JPEG",
    license: "Standard",
  },
  {
    id: 4,
    title: "Chicago Skyline Panorama",
    description:
      "A wide panoramic view of the Chicago skyline from Lake Michigan, showcasing the city's impressive architecture.",
    url: "/placeholder.svg?height=500&width=1000",
    price: 39.99,
    location: "Chicago",
    categories: ["Cityscape", "Architecture", "Panorama"],
    orientation: "landscape",
    date: "July 4, 2023",
    resolution: "8000 x 3000 px",
    format: "JPEG",
    license: "Extended",
  },
  {
    id: 5,
    title: "Miami Beach Sunrise",
    description:
      "A vibrant sunrise over Miami Beach with colorful lifeguard towers and palm trees silhouetted against the morning sky.",
    url: "/placeholder.svg?height=600&width=800",
    price: 19.99,
    location: "Miami",
    categories: ["Beach", "Sunrise", "Tropical"],
    orientation: "landscape",
    date: "February 20, 2024",
    resolution: "5500 x 3667 px",
    format: "JPEG",
    license: "Standard",
  },
  {
    id: 6,
    title: "Seattle Space Needle",
    description: "The iconic Space Needle against a backdrop of Mount Rainier on a clear day in Seattle.",
    url: "/placeholder.svg?height=800&width=600",
    price: 27.99,
    location: "Seattle",
    categories: ["Architecture", "Landmark", "Mountain"],
    orientation: "portrait",
    date: "August 15, 2023",
    resolution: "4000 x 6000 px",
    format: "JPEG",
    license: "Standard",
  },
  {
    id: 7,
    title: "French Quarter Jazz",
    description:
      "A lively street scene in New Orleans' French Quarter with jazz musicians performing on a historic street corner.",
    url: "/placeholder.svg?height=600&width=800",
    price: 22.99,
    location: "New Orleans",
    categories: ["Street", "Music", "Culture"],
    orientation: "landscape",
    date: "March 2, 2024",
    resolution: "5200 x 3467 px",
    format: "JPEG",
    license: "Standard",
  },
  {
    id: 8,
    title: "Boston Harbor Sunset",
    description: "A stunning sunset view of Boston Harbor with sailboats and the city skyline in silhouette.",
    url: "/placeholder.svg?height=600&width=800",
    price: 29.99,
    location: "Boston",
    categories: ["Harbor", "Sunset", "Cityscape"],
    orientation: "landscape",
    date: "October 5, 2023",
    resolution: "5600 x 3733 px",
    format: "JPEG",
    license: "Standard",
  },
  {
    id: 9,
    title: "Las Vegas Strip at Night",
    description:
      "The dazzling Las Vegas Strip illuminated at night with its iconic hotels, casinos, and the Bellagio fountains.",
    url: "/placeholder.svg?height=600&width=800",
    price: 32.99,
    location: "Las Vegas",
    categories: ["Night", "City", "Entertainment"],
    orientation: "landscape",
    date: "December 31, 2023",
    resolution: "6000 x 4000 px",
    format: "JPEG",
    license: "Extended",
  },
  {
    id: 10,
    title: "Portland Japanese Garden",
    description:
      "A serene view of Portland's Japanese Garden during autumn, with maple trees in vibrant red and orange colors.",
    url: "/placeholder.svg?height=800&width=600",
    price: 24.99,
    location: "Portland",
    categories: ["Garden", "Autumn", "Nature"],
    orientation: "portrait",
    date: "October 20, 2023",
    resolution: "4000 x 6000 px",
    format: "JPEG",
    license: "Standard",
  },
  {
    id: 11,
    title: "Austin Skyline Reflection",
    description:
      "The Austin skyline perfectly reflected in Lady Bird Lake during the blue hour, with the iconic Congress Avenue Bridge.",
    url: "/placeholder.svg?height=600&width=800",
    price: 26.99,
    location: "Austin",
    categories: ["Cityscape", "Reflection", "Water"],
    orientation: "landscape",
    date: "April 15, 2024",
    resolution: "5800 x 3867 px",
    format: "JPEG",
    license: "Standard",
  },
  {
    id: 12,
    title: "Denver Mountain View",
    description: "A panoramic view of Denver with the Rocky Mountains in the background on a clear winter day.",
    url: "/placeholder.svg?height=600&width=800",
    price: 34.99,
    location: "Denver",
    categories: ["Mountain", "Cityscape", "Winter"],
    orientation: "landscape",
    date: "January 10, 2024",
    resolution: "6200 x 4133 px",
    format: "JPEG",
    license: "Extended",
  },
]
