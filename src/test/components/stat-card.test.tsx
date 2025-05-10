import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatCard } from "../../components/photo-gallery/stat-card"

describe('StatCard', () => {
  const defaultProps = {
    title: 'Test Title',
    value: '123',
    description: 'Test Description',
  }

  it('renders card with title, value and description', () => {
    render(<StatCard {...defaultProps} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<StatCard {...defaultProps} className="custom-class" />)
    
    // Look for the main card div that contains the rounded-lg class
    const card = container.querySelector('.rounded-lg.custom-class')
    expect(card).not.toBeNull()
  })

  it('renders correct icon when iconName is provided', () => {
    // Test with 'camera' icon
    const { container: container1 } = render(<StatCard {...defaultProps} iconName="camera" />)
    expect(container1.querySelector('svg')).toBeInTheDocument()
    
    // Test with 'check-circle' icon
    const { container: container2 } = render(<StatCard {...defaultProps} iconName="check-circle" />)
    expect(container2.querySelector('svg')).toBeInTheDocument()
    
    // Test with 'percent' icon
    const { container: container3 } = render(<StatCard {...defaultProps} iconName="percent" />)
    expect(container3.querySelector('svg')).toBeInTheDocument()
  })

  it('does not render icon when iconName is not provided', () => {
    const { container } = render(<StatCard {...defaultProps} />)
    
    // Check if there's an SVG in the CardHeader (p-6) area
    const header = container.querySelector('.flex.flex-row.items-center')
    // Look for SVGs within this header
    const svgCount = header?.querySelectorAll('svg').length || 0
    expect(svgCount).toBe(0)
  })

  it('handles long text with truncation', () => {
    const longText = 'This is a very long text that should be truncated in the UI because it exceeds the available space'
    
    render(
      <StatCard
        title="Title"
        value={longText}
        description={longText}
      />
    )
    
    // Check that value and description containers have truncate class
    // Use getAllByText with a function to find elements that contain the text
    const allElements = screen.getAllByText((content) => content.includes('This is a very long text'))
    
    // Extract the elements with expected classes
    const valueElement = Array.from(allElements).find(el => 
      el.classList.contains('text-xl') || 
      el.classList.contains('text-2xl') || 
      el.classList.contains('font-bold')
    )
    
    const descriptionElement = Array.from(allElements).find(el => 
      el.classList.contains('text-xs') || 
      el.classList.contains('text-muted-foreground')
    )
    
    expect(valueElement?.classList.contains('truncate')).toBe(true)
    expect(descriptionElement?.classList.contains('truncate')).toBe(true)
  })
}) 