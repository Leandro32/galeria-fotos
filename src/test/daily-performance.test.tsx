import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DailyPerformance } from '../components/photo-gallery/daily-performance'

describe('DailyPerformance', () => {
  it('renders daily performance data correctly', () => {
    render(<DailyPerformance />)
    
    // Check for date labels
    expect(screen.getByText('25 Mar')).toBeInTheDocument()
    expect(screen.getByText('26 Mar')).toBeInTheDocument()
    expect(screen.getByText('27 Mar')).toBeInTheDocument()
    expect(screen.getByText('28 Mar')).toBeInTheDocument()
    expect(screen.getByText('29 Mar')).toBeInTheDocument()
    expect(screen.getByText('30 Mar')).toBeInTheDocument()
    expect(screen.getByText('31 Mar')).toBeInTheDocument()
    
    // Check for value
    expect(screen.getByText('9.5')).toBeInTheDocument()
    
    // Count values should only be rendered if they're greater than 0
    // In the component, there should be exactly 2 rendered count values (1027 and 1419)
    const countElements = document.querySelectorAll('.text-xs.text-muted-foreground')
    const visibleCounts = Array.from(countElements)
      .filter(el => el.textContent && el.textContent.trim() !== '')
    
    expect(visibleCounts.length).toBe(2)
    expect(screen.getByText('1027')).toBeInTheDocument()
    expect(screen.getByText('1419')).toBeInTheDocument()
  })
}) 