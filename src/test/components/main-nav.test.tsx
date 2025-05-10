import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MainNav } from "../../components/photo-gallery/main-nav"
import { renderWithRouter } from "../utils/utils"

describe('MainNav', () => {
  it('renders all navigation links correctly', () => {
    // Use renderWithRouter instead of plain render to provide the routing context
    renderWithRouter(<MainNav />)
    
    // Check if all navigation items are present
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Fotos')).toBeInTheDocument()
    expect(screen.getByText('Subir Fotos')).toBeInTheDocument()
    expect(screen.getByText('Reportes')).toBeInTheDocument()
    expect(screen.getByText('Configuración')).toBeInTheDocument()
  })

  it('sets the correct href attributes for navigation links', () => {
    renderWithRouter(<MainNav />)
    
    // Check if links have correct href attributes
    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByText('Fotos').closest('a')).toHaveAttribute('href', '/fotos')
    expect(screen.getByText('Subir Fotos').closest('a')).toHaveAttribute('href', '/upload')
    expect(screen.getByText('Reportes').closest('a')).toHaveAttribute('href', '/reportes')
    expect(screen.getByText('Configuración').closest('a')).toHaveAttribute('href', '/configuracion')
  })

  it('renders icons along with labels', () => {
    renderWithRouter(<MainNav />)
    
    // Check if icons are present (indirect test by checking for SVG elements)
    const links = document.querySelectorAll('a')
    links.forEach(link => {
      const svg = link.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })
}) 