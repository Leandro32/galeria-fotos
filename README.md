# Photo Gallery App

A React application for browsing and purchasing photographies.

## Features

- Browse photos by location, category, price range and orientation
- View photo details and add to shopping cart 
- Responsive design with mobile-friendly sidebar navigation
- Toast notifications for cart updates
- Keyboard shortcuts for navigation

## Tech Stack

- React 19
- TypeScript
- Vite
- Radix UI Components
- Tailwind CSS
- Lucide Icons

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the development server:
   ```bash
   yarn dev
   ```

3. Build for production:
   ```bash
   yarn build
   ```

## Project Structure

```
src/
  ├── assets/       # Static files (images, fonts)
  ├── components/   # Reusable UI components
  ├── data/         # Sample data and constants
  ├── hooks/        # Custom React hooks
  ├── lib/          # Utility functions and helpers
  ├── pages/        # Main page components
  ├── routes/       # Application routing
  ├── test/         # Test utilities and mocks
  ├── types/        # TypeScript type definitions
  ├── main.tsx      # Application entry point
  └── index.css     # Global styles
```

## Keyboard Shortcuts

| Key Combination | Action |
|-----------------|--------|
| `/` | Focus search bar |
| `Esc` | Close modal/dialog |
| `←` `→` | Navigate between photos in gallery view |
| `Space` | Toggle fullscreen view |
| `+` / `-` | Zoom in/out when viewing photo details |
| `c` | Add current photo to cart |

## Testing

Run the test suite:

```bash
yarn test
```

Run tests in watch mode during development:

```bash
yarn test:watch
```