import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // Add these settings to ensure JSDOM works correctly
    environmentOptions: {
      jsdom: {
        url: 'http://localhost'
      }
    },
    deps: {
      // Add inline option for styles or other raw imports
      inline: [/\.(css|less|scss|sass|styl|stylus|pcss|postcss)$/]
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    }
  },
}) 