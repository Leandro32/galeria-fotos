import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithRouter } from "../utils/utils"

// Import components
import { AlbumsTable } from "../../components/photo-gallery/albums-table"
import { DailyPerformance } from "../../components/photo-gallery/daily-performance"
import { MainNav } from "../../components/photo-gallery/main-nav"
import { StatCard } from "../../components/photo-gallery/stat-card"
import { UserNav } from "../../components/photo-gallery/user-nav"

// Create a simplified Dashboard component for testing
const SimpleDashboard = () => {
  return (
    <div className="dashboard">
      <header className="header">
        <MainNav />
        <UserNav />
      </header>
      
      <main className="main-content">
        <div className="stats-row">
          <StatCard title="Fotos Subidas" value="71,874" description="Último mes" iconName="camera" />
          <StatCard title="Fotos Vendidas" value="1,810" description="Último mes" iconName="check-circle" />
          <StatCard title="Ratio de Conversión" value="2.51%" description="Último mes" iconName="percent" />
        </div>
        
        <div className="data-row">
          <div className="albums-container">
            <h2>Álbumes</h2>
            <AlbumsTable />
          </div>
          <div className="daily-performance-container">
            <h2>Rendimiento Diario</h2>
            <DailyPerformance />
          </div>
        </div>
      </main>
    </div>
  )
}

describe('Dashboard Integration', () => {
  it('renders navigation components without errors', () => {
    renderWithRouter(<SimpleDashboard />)
    
    // Test navigation components
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Fotos')).toBeInTheDocument()
    expect(screen.getByText('LE')).toBeInTheDocument() // UserNav avatar text
  })
  
  it('renders stat cards correctly', () => {
    renderWithRouter(<SimpleDashboard />)
    
    // Test stat cards
    expect(screen.getByText('Fotos Subidas')).toBeInTheDocument()
    expect(screen.getByText('71,874')).toBeInTheDocument()
    expect(screen.getByText('Fotos Vendidas')).toBeInTheDocument()
    expect(screen.getByText('1,810')).toBeInTheDocument()
    expect(screen.getByText('Ratio de Conversión')).toBeInTheDocument()
    expect(screen.getByText('2.51%')).toBeInTheDocument()
  })
  
  it('renders tables correctly', () => {
    renderWithRouter(<SimpleDashboard />)
    
    // Test section headings
    expect(screen.getByText('Álbumes')).toBeInTheDocument()
    expect(screen.getByText('Rendimiento Diario')).toBeInTheDocument()
    
    // Test table components
    expect(screen.getByText('Vendidas')).toBeInTheDocument() // AlbumsTable header
    expect(screen.getByText('V/S')).toBeInTheDocument() // AlbumsTable header
    expect(screen.getByText('9 LEANDRO')).toBeInTheDocument() // From AlbumsTable
    expect(screen.getByText('Flow Wave')).toBeInTheDocument() // From AlbumsTable
  })
}) 