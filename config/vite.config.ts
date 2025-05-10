import path from "path";

import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ filename: "stats.html", open: true })
  ],
  server: {
    port: 8000
  },
  resolve: {
      alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    cssMinify: true,
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-select', 
            '@radix-ui/react-toast'
          ],
          'utils': ['zustand', 'clsx', 'tailwind-merge'],
        },
        compact: true
      }
    }
  }
});