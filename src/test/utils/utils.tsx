import React, { ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// Router wrapper for tests
interface TestRouterProps {
  children: ReactNode
  initialEntries?: string[]
}

export const TestRouter = ({ 
  children, 
  initialEntries = ['/'] 
}: TestRouterProps) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      {children}
    </MemoryRouter>
  )
}

// Custom render with router context
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string
}

export function renderWithRouter(
  ui: React.ReactElement,
  { route = '/', ...renderOptions }: CustomRenderOptions = {}
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <TestRouter initialEntries={[route]}>
        {children}
      </TestRouter>
    ),
    ...renderOptions,
  })
} 