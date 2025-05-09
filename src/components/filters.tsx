"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Filter, ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { locations, categories, priceRanges, orientations } from "@/data/filters"

export function Filters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { items } = useCart()

  const [location, setLocation] = useState<string>(searchParams?.get("location") || "")
  const [category, setCategory] = useState<string>(searchParams?.get("category") || "")
  const [priceRange, setPriceRange] = useState<string>(searchParams?.get("priceRange") || "")
  const [orientation, setOrientation] = useState<string>(searchParams?.get("orientation") || "")

  // Update URL when filters change
  useEffect(() => {
    try {
      if (!searchParams || !router || !pathname) return

      const params = new URLSearchParams(searchParams.toString())

      if (location) params.set("location", location)
      else params.delete("location")

      if (category) params.set("category", category)
      else params.delete("category")

      if (priceRange) params.set("priceRange", priceRange)
      else params.delete("priceRange")

      if (orientation) params.set("orientation", orientation)
      else params.delete("orientation")

      router.push(`${pathname}?${params.toString()}`)
    } catch (error) {
      console.error("Error updating URL:", error)
    }
  }, [location, category, priceRange, orientation, router, pathname, searchParams])

  const resetFilters = () => {
    try {
      setCategory("")
      setPriceRange("")
      setOrientation("")

      // Keep location as it's the primary filter
      if (router && pathname) {
        const params = new URLSearchParams()
        if (location) params.set("location", location)
        router.push(`${pathname}?${params.toString()}`)
      }
    } catch (error) {
      console.error("Error resetting filters:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-4">
        <div className="bg-card rounded-lg border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </h2>
            {(category || priceRange || orientation) && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {/* Location Filter (Primary) */}
            <div>
              <Label className="text-base font-medium flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Secondary Filters */}
            <Accordion type="single" collapsible defaultValue="category">
              <AccordionItem value="category">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup value={category} onValueChange={setCategory}>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="all-categories" />
                        <Label htmlFor="all-categories">All Categories</Label>
                      </div>
                      {categories.map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                          <RadioGroupItem value={cat} id={cat} />
                          <Label htmlFor={cat}>{cat}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price">
                <AccordionTrigger>Price Range</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup value={priceRange} onValueChange={setPriceRange}>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="all-prices" />
                        <Label htmlFor="all-prices">All Prices</Label>
                      </div>
                      {priceRanges.map((range) => (
                        <div key={range.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={range.value} id={range.value} />
                          <Label htmlFor={range.value}>{range.label}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="orientation">
                <AccordionTrigger>Orientation</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup value={orientation} onValueChange={setOrientation}>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="all-orientations" />
                        <Label htmlFor="all-orientations">All Orientations</Label>
                      </div>
                      {orientations.map((orient) => (
                        <div key={orient} className="flex items-center space-x-2">
                          <RadioGroupItem value={orient} id={orient} />
                          <Label htmlFor={orient}>{orient}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {items && items.length > 0 && (
              <div className="mt-6">
                <Button className="w-full" variant="default">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Cart ({items.length})
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
