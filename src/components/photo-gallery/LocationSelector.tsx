import { Location } from "../../types"

interface LocationSelectorProps {
  locations: Location[]
  onSelect: (locationName: string) => void
}

const LocationSelector = ({ locations, onSelect }: LocationSelectorProps) => {
  return (
    <div className="mb-8" data-testid="location-selector">
      <h2 className="text-2xl font-semibold mb-4">Select a Location</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {locations.map((location) => (
          <div
            key={location.id}
            className="relative cursor-pointer rounded-lg overflow-hidden group"
            onClick={() => onSelect(location.name)}
          >
            <div className="aspect-[4/3] relative">
              <img 
                src={location.image || "/placeholder.svg"} 
                alt={location.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{location.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LocationSelector 