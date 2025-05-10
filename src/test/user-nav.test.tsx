import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { UserNav } from '../components/photo-gallery/user-nav'

describe('UserNav', () => {
  it('renders avatar button', () => {
    render(<UserNav />)
    
    // Check for the avatar button
    const avatarButton = screen.getByRole('button')
    expect(avatarButton).toBeInTheDocument()
    
    // Check for avatar fallback (since the image might not load in tests)
    expect(screen.getByText('LE')).toBeInTheDocument()
  })
  
  it('has correct ARIA attributes', () => {
    render(<UserNav />)
    
    // Check for the button's ARIA attributes which indicate it opens a menu
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-haspopup', 'menu')
    expect(button).toHaveAttribute('aria-expanded', 'false') // Initially closed
  })
  
  it('has correct styling classes', () => {
    const { container } = render(<UserNav />)
    
    // Check for avatar container with proper rounded styling
    const avatarContainer = container.querySelector('.rounded-full')
    expect(avatarContainer).toBeInTheDocument()
    
    // Check for avatar letter container with proper styling
    const avatarLetters = screen.getByText('LE')
    expect(avatarLetters.parentElement).toHaveClass('flex')
    expect(avatarLetters.parentElement).toHaveClass('rounded-full')
  })
}) 