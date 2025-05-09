import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import LocationSelector from './LocationSelector'
import { Location } from '../../types'

describe('LocationSelector Component', () => {
  const mockLocations: Location[] = [
    {
      id: 'new-york',
      name: 'New York',
      image: '/placeholder.svg',
    },
    {
      id: 'los-angeles',
      name: 'Los Angeles',
      image: '/placeholder.svg',
    }
  ]
  
  const mockOnSelect = vi.fn()
  
  it('renders all location cards', () => {
    const { getByText } = render(<LocationSelector locations={mockLocations} onSelect={mockOnSelect} />)
    
    // Check if the title is rendered
    expect(getByText('Select a Location')).toBeInTheDocument()
    
    // Check if all locations are rendered
    mockLocations.forEach(location => {
      expect(getByText(location.name)).toBeInTheDocument()
    })
  })
  
  it('calls onSelect when a location is clicked', async () => {
    const user = userEvent.setup()
    const { getByText } = render(<LocationSelector locations={mockLocations} onSelect={mockOnSelect} />)
    
    // Click on a location
    await user.click(getByText('New York'))
    
    // Check if onSelect was called with the correct location name
    expect(mockOnSelect).toHaveBeenCalledWith('New York')
  })
}) 