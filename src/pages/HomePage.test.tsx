import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HomePage from './HomePage'

// Mock the child components
vi.mock('../components/photo-gallery/CartIndicator', () => ({
  default: ({ count }: { count: number }) => <div data-testid="cart-indicator">Cart ({count})</div>
}))

vi.mock('../components/photo-gallery/LocationSelector', () => ({
  default: ({ locations, onSelect }: any) => (
    <div data-testid="location-selector">
      <h2>Select a Location</h2>
      {locations.map((loc: any) => (
        <button key={loc.id} onClick={() => onSelect(loc.name)}>
          {loc.name}
        </button>
      ))}
    </div>
  )
}))

vi.mock('../components/photo-gallery/PhotoFilters', () => ({
  default: ({ selectedLocation }: any) => (
    <div data-testid="photo-filters">Filters for {selectedLocation}</div>
  )
}))

vi.mock('../components/photo-gallery/PhotoGrid', () => ({
  default: ({ photos }: any) => (
    <div data-testid="photo-grid">Photo Grid with {photos.length} photos</div>
  )
}))

vi.mock('../components/photo-gallery/PhotoModal', () => ({
  default: () => <div data-testid="photo-modal">Photo Modal</div>
}))

describe('HomePage Component', () => {
  it('renders the main title', () => {
    const { getByText } = render(<HomePage />)
    expect(getByText('Photo Gallery')).toBeInTheDocument()
  })

  it('initially renders the LocationSelector', () => {
    const { getByTestId, queryByTestId } = render(<HomePage />)
    expect(getByTestId('location-selector')).toBeInTheDocument()
    // PhotoFilters and PhotoGrid should not be visible initially
    expect(queryByTestId('photo-filters')).not.toBeInTheDocument()
    expect(queryByTestId('photo-grid')).not.toBeInTheDocument()
  })
}) 