import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PhotosTable } from '../components/photo-gallery/photos-table'

describe('PhotosTable', () => {
  it('renders the table with correct headers', () => {
    render(<PhotosTable />)
    
    // Check for all table headers
    expect(screen.getByText('Foto')).toBeInTheDocument()
    expect(screen.getByText('Tomada')).toBeInTheDocument()
    expect(screen.getByText('Subida')).toBeInTheDocument()
    expect(screen.getByText('Vendida')).toBeInTheDocument()
    expect(screen.getByText('Método de Pago')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
  })

  it('renders photo data correctly', () => {
    render(<PhotosTable />)
    
    // Check for date values - using getAllByText for values that appear multiple times
    expect(screen.getByText('29 Mar 10:53')).toBeInTheDocument()
    expect(screen.getAllByText('29 Mar 12:52')[0]).toBeInTheDocument() // Use getAllByText for duplicated data
    expect(screen.getAllByText('29 Mar 19:30')[0]).toBeInTheDocument() // Use getAllByText for duplicated data
    
    // Check for payment methods - using getAllByText for "Efectivo" which appears multiple times
    expect(screen.getAllByText('Efectivo')[0]).toBeInTheDocument()
    expect(screen.getByText('Transferencia')).toBeInTheDocument()
    
    // Check for a total value
    expect(screen.getAllByText('0.5')[0]).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('renders images for each photo', () => {
    render(<PhotosTable />)
    
    // Check that we have the correct number of image elements
    const images = screen.getAllByRole('img')
    expect(images.length).toBe(4) // There should be 4 photos in the mock data
    
    // Check image attributes
    images.forEach((img, index) => {
      expect(img).toHaveAttribute('alt', `Foto ${index + 1}`)
      expect(img).toHaveAttribute('width', '80')
      expect(img).toHaveAttribute('height', '80')
      expect(img).toHaveClass('rounded-md')
      expect(img).toHaveClass('object-cover')
    })
  })
}) 