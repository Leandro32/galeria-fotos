import { describe, expect, it } from 'vitest'
import CartIndicator from '../components/photo-gallery/CartIndicator'
import LocationSelector from '../components/photo-gallery/LocationSelector'
import PhotoFilters from '../components/photo-gallery/PhotoFilters'
import PhotoGrid from '../components/photo-gallery/PhotoGrid'
import PhotoModal from '../components/photo-gallery/PhotoModal'

describe('Photo Gallery Components', () => {
  it('all components can be imported correctly', () => {
    // Just verify that the components can be imported
    expect(CartIndicator).toBeDefined()
    expect(LocationSelector).toBeDefined()
    expect(PhotoFilters).toBeDefined()
    expect(PhotoGrid).toBeDefined()
    expect(PhotoModal).toBeDefined()
  })
}) 