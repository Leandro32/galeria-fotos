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

## Project Structure

See [PROJECT_ORGANIZATION.md](docs/PROJECT_ORGANIZATION.md) for details on the recommended code organization.

```
├── src/                    # Application source code
│   ├── assets/             # Static files (images, fonts)
│   ├── components/         # Reusable UI components
│   │   ├── photo-gallery/  # Photo gallery components
│   │   ├── routing/        # Routing components
│   │   └── ui/             # UI primitives
│   ├── data/               # Sample data and constants
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and helpers
│   ├── pages/              # Main page components
│   ├── routes/             # Application routing
│   ├── stores/             # State management
│   ├── test/               # Test utilities and mocks
│   ├── types/              # TypeScript type definitions
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
│
├── public/                 # Static public assets
│   └── icons/              # App icons
│
├── docs/                   # Documentation
│   ├── backend-implementation-go.md   # Go backend implementation details
│   ├── cart-implementation.md         # Shopping cart implementation
│   ├── project-timeline.md            # Project roadmap
│   └── PROJECT_ORGANIZATION.md        # Project structure guide
│
├── config/                 # Configuration files
│   ├── .depcheckrc.json    # Dependency checker config
│   ├── eslint.config.js    # ESLint configuration
│   ├── tailwind.config.js  # Tailwind CSS config
│   └── vitest.config.js    # Testing configuration
│
├── scripts/                # Utility scripts
│   ├── server.js           # Node.js static server
│   ├── server.go           # Go static server
│   └── serve.bat           # Windows server script
│
├── Configuration files still in root:
│   ├── tsconfig.json       # TypeScript base config
│   ├── tsconfig.app.json   # App-specific TS config
│   ├── tsconfig.node.json  # Node-specific TS config
│   └── vite.config.ts      # Vite bundler config
│
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

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

4. Serve production build:
   ```bash
   # Using Node.js server
   yarn serve
   
   # Using Go server (if Go is installed)
   yarn serve:go
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

## Project Organization Recommendation

For better organization, consider grouping files by their purpose:

1. **Configuration** - Keep build and tooling configuration separate
2. **Application code** - Organize by feature area in the src folder
3. **Documentation** - Centralize all documentation

This structure makes the codebase more maintainable and easier to navigate.