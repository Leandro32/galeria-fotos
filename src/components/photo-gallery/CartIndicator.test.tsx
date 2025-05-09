import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CartIndicator from './CartIndicator'

describe('CartIndicator Component', () => {
  it('renders with correct count', () => {
    const { getByText } = render(<CartIndicator count={5} />)
    expect(getByText('Cart (5)')).toBeInTheDocument()
  })
  
  it('does not render when count is zero', () => {
    const { container } = render(<CartIndicator count={0} />)
    expect(container.firstChild).toBeNull()
  })
}) 