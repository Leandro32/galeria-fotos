export const locations: string[] = [
  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "Miami",
  "Seattle",
  "Boston",
  "New Orleans",
  "Las Vegas",
  "Portland",
  "Austin",
  "Denver",
]

export const categories: string[] = [
  "Landscape",
  "Architecture",
  "Beach",
  "Cityscape",
  "Sunset",
  "Sunrise",
  "Night",
  "Nature",
  "Street",
  "Water",
  "Mountain",
]

export interface PriceRange {
  value: string
  label: string
}

export const priceRanges: PriceRange[] = [
  { value: "0-20", label: "Under $20" },
  { value: "20-30", label: "$20 - $30" },
  { value: "30-40", label: "$30 - $40" },
  { value: "40-1000", label: "Over $40" },
]

export const orientations: string[] = ["landscape", "portrait"]
