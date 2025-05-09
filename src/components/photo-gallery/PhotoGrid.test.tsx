import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import PhotoGrid from './PhotoGrid'
import { Photo } from '../../types'

describe('PhotoGrid Component', () => {
  const mockPhotos: Photo[] = [
    {
      id: 1,
      title: 'Test Photo 1',
      description: 'This is a test photo description',
      url: '/placeholder.svg',
      location: 'Test Location',
      price: 19.99,
      size: 'medium',
      date: 'January 1, 2023',
      photographer: 'Test Photographer',
      hour: 'Morning',
    },
    {
      id: 2,
      title: 'Test Photo 2',
      description: 'Another test photo description',
      url: '/placeholder.svg',
      location: 'Test Location 2',
      price: 29.99,
      size: 'large',
      date: 'February 15, 2023',
      photographer: 'Test Photographer 2',
      hour: 'Evening',
    },
  ]
  
  const mockOnPhotoClick = vi.fn()
  const mockOnAddToCart = vi.fn()
  
  it('renders the correct number of photos', () => {
    const { container } = render(
      <PhotoGrid 
        photos={mockPhotos} 
        columns={2} 
        onPhotoClick={mockOnPhotoClick} 
        onAddToCart={mockOnAddToCart} 
      />
    )
    
    // In a 2-column layout, each column should have 1 photo
    const columns = container.querySelectorAll('.flex-1')
    expect(columns.length).toBe(2)
    
    // Total number of photo containers should match our mock data
    const photoContainers = container.querySelectorAll('.relative.group')
    expect(photoContainers.length).toBe(mockPhotos.length)
  })
  
  it('applies the correct aspect ratio based on photo size', () => {
    const { container } = render(
      <PhotoGrid 
        photos={mockPhotos} 
        columns={2} 
        onPhotoClick={mockOnPhotoClick} 
        onAddToCart={mockOnAddToCart} 
      />
    )
    
    const photoContainers = container.querySelectorAll('.relative.group')
    
    // First photo has 'medium' size which should have aspect-[4/3] class
    const firstPhotoDiv = photoContainers[0].querySelector('div')
    expect(firstPhotoDiv?.className).toContain('aspect-[4/3]')
    
    // Second photo has 'large' size which should have aspect-[3/4] class
    const secondPhotoDiv = photoContainers[1].querySelector('div')
    expect(secondPhotoDiv?.className).toContain('aspect-[3/4]')
  })
  
  it('calls onPhotoClick when a photo is clicked', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <PhotoGrid 
        photos={mockPhotos} 
        columns={2} 
        onPhotoClick={mockOnPhotoClick} 
        onAddToCart={mockOnAddToCart} 
      />
    )
    
    const firstPhoto = container.querySelector('.cursor-pointer')
    if (firstPhoto) {
      await user.click(firstPhoto)
      expect(mockOnPhotoClick).toHaveBeenCalledWith(mockPhotos[0])
    }
  })
}) 