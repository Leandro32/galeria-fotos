import { vi } from 'vitest'

/**
 * Set up mocks needed for testing Recharts components
 */
export function setupChartTestEnvironment() {
  // Mock ResizeObserver which is needed for Recharts
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))

  // Create a simple mock for document.createElementNS
  document.createElementNS = vi.fn().mockImplementation((_, qualifiedName) => {
    // Just return a regular element - don't try to set namespaceURI which is readonly
    return document.createElement(qualifiedName)
  })

  // Mock getComputedTextLength which is used by Recharts for text measurement
  // Add properties to prototype with TypeScript casting to avoid type errors
  ;(SVGElement.prototype as any).getComputedTextLength = vi.fn().mockReturnValue(50)
  
  // Mock getBBox which is used by Recharts for layout calculations
  ;(SVGElement.prototype as any).getBBox = vi.fn().mockReturnValue({
    x: 0,
    y: 0,
    width: 100,
    height: 20,
  })
  
  // Mock additional SVG methods needed by Recharts
  ;(SVGElement.prototype as any).getScreenCTM = vi.fn().mockReturnValue({
    inverse: vi.fn().mockReturnValue({
      multiply: vi.fn().mockReturnValue({
        e: 0,
        f: 0,
      }),
    }),
  })
}

/**
 * Test helpers for assertions on Recharts components
 */
export const chartAssertions = {
  /**
   * More forgiving check for chart elements - looks for any chart-related elements
   */
  hasAnyChartElements: (container: HTMLElement): boolean => {
    return !!(
      container.querySelector('svg') || 
      container.querySelector('[class*="recharts"]') ||
      container.querySelector('[class*="chart"]')
    )
  },
  
  /**
   * Checks if a chart has rendered with the expected number of data points
   */
  hasDataPoints: (container: HTMLElement, selector: string, count: number): boolean => {
    const elements = container.querySelectorAll(selector)
    return elements.length === count
  },
  
  /**
   * Checks if specific chart elements are present
   */
  hasChartElements: (container: HTMLElement): boolean => {
    const svg = container.querySelector('svg')
    const responsiveContainer = container.querySelector('.recharts-responsive-container')
    
    return !!svg && !!responsiveContainer
  },
  
  /**
   * Checks if axes are present in the chart
   */
  hasAxes: (container: HTMLElement): boolean => {
    const xAxis = container.querySelector('.recharts-xAxis')
    const yAxis = container.querySelector('.recharts-yAxis')
    
    return !!xAxis && !!yAxis
  }
} 