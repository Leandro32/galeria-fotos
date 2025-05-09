import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Photo } from "../../types"

interface PhotoFiltersProps {
  selectedLocation: string
  photographers: string[]
  photographerFilter: string
  setPhotographerFilter: (value: string) => void
  dateFilter: string
  setDateFilter: (value: string) => void
  hourFilter: string
  setHourFilter: (value: string) => void
  onBack: () => void
  onResetFilters: () => void
  photos: Photo[]
}

const PhotoFilters = ({
  selectedLocation,
  photographers,
  photographerFilter,
  setPhotographerFilter,
  dateFilter,
  setDateFilter,
  hourFilter,
  setHourFilter,
  onBack,
  onResetFilters,
  photos,
}: PhotoFiltersProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <Button variant="outline" onClick={onBack}>
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
                "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
                "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
                "20:00", "21:00", "22:00", "23:00", "00:00",
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
          onClick={onResetFilters}
          disabled={!photographerFilter && !dateFilter && !hourFilter}
          size="sm"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
}

export default PhotoFilters 