import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React, { createContext, useContext, useState } from 'react'

// Create a simplified version of a theme provider for testing
const ThemeContext = createContext<{
  theme: string;
  setTheme: (theme: string) => void;
} | null>(null)

function SimpleThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// A test component that uses our theme hook
function TestComponent() {
  const { theme, setTheme } = useTheme()
  
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('system')}>Set System</button>
    </div>
  )
}

describe('Theme Provider Concept Test', () => {
  it('provides theme context to children', () => {
    render(
      <SimpleThemeProvider>
        <TestComponent />
      </SimpleThemeProvider>
    )
    
    // Initial theme should be light
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
  })

  it('allows changing theme', () => {
    render(
      <SimpleThemeProvider>
        <TestComponent />
      </SimpleThemeProvider>
    )
    
    // Click button to change theme to dark
    fireEvent.click(screen.getByText('Set Dark'))
    
    // Theme should now be dark
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
  })
  
  it('allows changing theme back to light', () => {
    render(
      <SimpleThemeProvider>
        <TestComponent />
      </SimpleThemeProvider>
    )
    
    // Click button to change theme to dark first
    fireEvent.click(screen.getByText('Set Dark'))
    
    // Then change back to light
    fireEvent.click(screen.getByText('Set Light'))
    
    // Theme should now be light again
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
  })
  
  it('allows changing theme to system', () => {
    render(
      <SimpleThemeProvider>
        <TestComponent />
      </SimpleThemeProvider>
    )
    
    // Click button to change theme to system
    fireEvent.click(screen.getByText('Set System'))
    
    // Theme should now be system
    expect(screen.getByTestId('current-theme')).toHaveTextContent('system')
  })
}) 