import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PhotoSelection } from "../../components/photo-selection"
import { Photo } from '../../types'

// Mock photos for testing that match the Photo type
const mockPhotos: Photo[] = [
  {
    id: 1,
    title: 'Photo 1',
    description: 'Description 1',
    url: '/photo1.jpg',
    price: 19.99,
    location: 'Location 1',
    categories: ['nature', 'landscape'],
    orientation: 'landscape',
    date: '2023-01-01',
    size: 'medium', 
    photographer: 'Test Photographer',
    hour: 'Morning'
  },
  {
    id: 2,
    title: 'Photo 2',
    description: 'Description 2',
    url: '/photo2.jpg',
    price: 24.99,
    location: 'Location 2',
    categories: ['portrait', 'people'],
    orientation: 'portrait',
    date: '2023-02-01',
    size: 'large',
    photographer: 'Test Photographer',
    hour: 'Afternoon'
  },
]

// Mock functions
const mockOnPhotoClick = vi.fn()
const mockAddToCart = vi.fn()

// Mock the useCartStore
vi.mock('../../stores/useCartStore', () => ({
  useCartStore: () => ({
    addToCart: mockAddToCart,
    items: [],
    removeFromCart: vi.fn(),
    clearCart: vi.fn(),
    calculateTotal: vi.fn(() => 0),
  }),
}))

describe('PhotoSelection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  it('should render all photos', () => {
    render(
      <PhotoSelection photos={mockPhotos} onPhotoClick={mockOnPhotoClick} />
    )
    
    // Check if all photos are rendered
    expect(screen.getByText('Photo 1')).toBeInTheDocument()
    expect(screen.getByText('Photo 2')).toBeInTheDocument()
  })

  it('should call onPhotoClick when a photo is clicked', () => {
    render(
      <PhotoSelection photos={mockPhotos} onPhotoClick={mockOnPhotoClick} />
    )
    
    // Click on the first photo
    const images = screen.getAllByRole('img');
    fireEvent.click(images[0]);
    
    // Check if onPhotoClick was called with the correct photo
    expect(mockOnPhotoClick).toHaveBeenCalledWith(mockPhotos[0])
  })

  it('should select a photo when the selection button is clicked', () => {
    render(
      <PhotoSelection photos={mockPhotos} onPhotoClick={mockOnPhotoClick} />
    )
    
    // Initially, no photos are selected
    expect(screen.queryByText(/photos selected/i)).not.toBeInTheDocument()
    
    // Find all buttons and filter for the selection buttons (without text content)
    const buttons = screen.getAllByRole('button');
    const selectButtons = buttons.filter(button => 
      !button.textContent || button.textContent.trim() === ''
    );
    
    // Click the first selection button
    fireEvent.click(selectButtons[0]);
    
    // Check if the selection indicator appears
    expect(screen.getByText('1 photo selected')).toBeInTheDocument()
  })

  it('should deselect a photo when clicked again', () => {
    render(
      <PhotoSelection photos={mockPhotos} onPhotoClick={mockOnPhotoClick} />
    )
    
    // Find selection buttons
    const buttons = screen.getAllByRole('button');
    const selectButtons = buttons.filter(button => 
      !button.textContent || button.textContent.trim() === ''
    );
    
    // Select a photo
    fireEvent.click(selectButtons[0])
    
    // Check if it's selected
    expect(screen.getByText('1 photo selected')).toBeInTheDocument()
    
    // Deselect the photo
    fireEvent.click(selectButtons[0])
    
    // Check if the selection indicator disappears
    expect(screen.queryByText(/photos selected/i)).not.toBeInTheDocument()
  })

  it('should select multiple photos', () => {
    render(
      <PhotoSelection photos={mockPhotos} onPhotoClick={mockOnPhotoClick} />
    )
    
    // Find selection buttons
    const buttons = screen.getAllByRole('button');
    const selectButtons = buttons.filter(button => 
      !button.textContent || button.textContent.trim() === ''
    );
    
    // Select both photos
    fireEvent.click(selectButtons[0])
    fireEvent.click(selectButtons[1])
    
    // Check if the selection indicator shows the correct count
    expect(screen.getByText('2 photos selected')).toBeInTheDocument()
  })

  it('should clear selection when clear button is clicked', () => {
    render(
      <PhotoSelection photos={mockPhotos} onPhotoClick={mockOnPhotoClick} />
    )
    
    // Find selection buttons
    const buttons = screen.getAllByRole('button');
    const selectButtons = buttons.filter(button => 
      !button.textContent || button.textContent.trim() === ''
    );
    
    // Select both photos
    fireEvent.click(selectButtons[0])
    fireEvent.click(selectButtons[1])
    
    // Click the clear button
    fireEvent.click(screen.getByText('Clear'))
    
    // Check if the selection indicator disappears
    expect(screen.queryByText(/photos selected/i)).not.toBeInTheDocument()
  })

  it('should add selected photos to cart when add to cart button is clicked', () => {
    render(
      <PhotoSelection photos={mockPhotos} onPhotoClick={mockOnPhotoClick} />
    )
    
    // Find selection buttons
    const buttons = screen.getAllByRole('button');
    const selectButtons = buttons.filter(button => 
      !button.textContent || button.textContent.trim() === ''
    );
    
    // Select both photos
    fireEvent.click(selectButtons[0])
    fireEvent.click(selectButtons[1])
    
    // Click the add to cart button
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);
    
    // Check if addToCart was called for both photos
    expect(mockAddToCart).toHaveBeenCalledTimes(2)
  })
}) 