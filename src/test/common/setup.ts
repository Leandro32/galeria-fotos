import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Clean up after each test
afterEach(() => {
  cleanup()
})

// Mock window object for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock for localStorage
class LocalStorageMock {
  store: Record<string, string> = {}
  
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key: string) {
    return this.store[key] || null
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value)
  }

  removeItem(key: string) {
    delete this.store[key]
  }
}

// Set local storage mock
Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
})

// Set session storage mock
Object.defineProperty(window, 'sessionStorage', {
  value: new LocalStorageMock(),
})

// Add any other browser APIs that might be missing
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Suppress console errors from zustand persist middleware
const originalConsoleError = console.error
console.error = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('zustand persist middleware')) {
    return
  }
  originalConsoleError(...args)
} 