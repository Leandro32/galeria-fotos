import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AlbumsTable } from '../components/photo-gallery/albums-table'

describe('AlbumsTable', () => {
  it('renders the table with correct headers', () => {
    render(<AlbumsTable />)
    
    expect(screen.getByText('Álbum')).toBeInTheDocument()
    expect(screen.getByText('Subidas')).toBeInTheDocument()
    expect(screen.getByText('Vendidas')).toBeInTheDocument()
    expect(screen.getByText('Reales')).toBeInTheDocument()
    expect(screen.getByText('V/S')).toBeInTheDocument()
  })

  it('renders album data correctly', () => {
    render(<AlbumsTable />)
    
    // Check for album names
    expect(screen.getByText('9 LEANDRO')).toBeInTheDocument()
    expect(screen.getByText('Piscina con Olas')).toBeInTheDocument()
    expect(screen.getByText('Flow Wave')).toBeInTheDocument()
    expect(screen.getByText('Aqualandia')).toBeInTheDocument()
    
    // Check for numeric values (using the actual format with periods instead of commas)
    expect(screen.getByText('20.042')).toBeInTheDocument()
    expect(screen.getByText('42.237')).toBeInTheDocument()
    expect(screen.getByText('1.025')).toBeInTheDocument()
    
    // Check for some decimal values
    expect(screen.getByText('275.89')).toBeInTheDocument()
    expect(screen.getByText('685.87')).toBeInTheDocument()
    expect(screen.getByText('42.77')).toBeInTheDocument()
  })
}) 