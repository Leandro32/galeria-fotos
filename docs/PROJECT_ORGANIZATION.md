# Recommended Project Organization

This document outlines a recommended organization for the codebase to improve maintainability and developer experience.

## Proposed Structure

```
galeria-fotos/
├── config/                 # Configuration files
│   ├── .depcheckrc.json    # Dependency checker config
│   ├── eslint.config.js    # ESLint configuration
│   ├── tsconfig.json       # TypeScript base config
│   ├── tsconfig.app.json   # App-specific TS config
│   ├── tsconfig.node.json  # Node-specific TS config
│   ├── vite.config.ts      # Vite bundler config
│   ├── tailwind.config.js  # Tailwind CSS config
│   └── vitest.config.js    # Testing configuration
│
├── scripts/                # Build and utility scripts
│   ├── server.js           # Node.js static server
│   ├── server.go           # Go static server
│   └── serve.bat           # Windows server script
│
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
│   ├── project-timeline.md # Project roadmap
│   └── PROJECT_ORGANIZATION.md # This file
│
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Implementation Steps

To gradually transition to this structure, follow these steps:

1. **Create the config folder** and move build configuration files there:
   - Create proxy files in the root that extend from config
   - Update import paths as needed

2. **Create the scripts folder** for utility scripts:
   - Move server.js, server.go, serve.bat there
   - Update package.json scripts to reference the new paths

3. **Ensure the src folder organization** follows the structure above:
   - Group components by feature area
   - Keep UI primitives separate from business logic

4. **Set up proper documentation** in the docs folder:
   - Project roadmap
   - Architecture decisions
   - Code standards

## Benefits

This organization provides several advantages:

1. **Separation of concerns** - Configuration files don't clutter the root directory
2. **Improved discoverability** - New developers can quickly understand the project
3. **Better maintainability** - Related files are grouped together
4. **Cleaner root directory** - Only the most essential files remain at the root

## Current Status

The project has partially implemented the recommended structure:

- A **config** folder has been created, which contains:
  - `.depcheckrc.json`
  - `eslint.config.js`
  - `tailwind.config.js`
  - `vitest.config.js`

- The **scripts** folder is fully implemented with:
  - `server.js`
  - `server.go`
  - `serve.bat`

- Configuration files still in the root directory that should be moved to the config folder:
  - `tsconfig.json`
  - `tsconfig.app.json`
  - `tsconfig.node.json`
  - `vite.config.ts`

This document serves as a guide for future refactoring efforts to complete the migration to the recommended structure. 