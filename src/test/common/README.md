# Photo Gallery Testing Suite

## Directory Structure

The test directory is organized as follows:

- **components/**: Tests for individual React components
- **integration/**: Integration tests that test multiple components together
- **store/**: Tests for store logic (Zustand stores, hooks, persistence)
- **utils/**: Utility functions for testing
- **common/**: Common setup and configuration files
- **mocks/**: Mock data and service implementations

## Running Tests

To run all tests:

```bash
yarn test
```

To run specific test files:

```bash
yarn test src/test/components/photo-selection.test.tsx
```

To run all component tests:

```bash
yarn test src/test/components
```

## Test Conventions

### Component Tests

Component tests should:
- Test the component's primary functionality
- Test edge cases and error states
- Test user interactions
- Test accessibility

Example:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PhotoSelection } from '../../components/photo-selection';

describe('PhotoSelection', () => {
  it('should render a list of photos', () => {
    render(<PhotoSelection photos={mockPhotos} />);
    expect(screen.getAllByRole('img')).toHaveLength(mockPhotos.length);
  });
});
```

### Integration Tests

Integration tests should test the interaction between components, often including:
- Navigation flows
- Data flow between components
- End-to-end user journeys

### Store Tests

Store tests should:
- Test state initialization
- Test state transitions
- Test selectors and derived state
- Test persistence (if applicable)

## Mocking

For external dependencies, use mock implementations provided in the `mocks` directory.

## Utils

The `utils` directory contains helper functions for:
- Rendering components with context providers
- Creating test data
- Common assertion patterns

## Component Tests

This directory contains all the tests for the photo gallery application components.

## Test Structure

- Each component has its own test file named `component-name.test.tsx`
- Utility functions for testing are in `chart-test-utils.tsx` and `utils.tsx`
- The test setup is defined in `setup.ts`
- Integration tests test multiple components working together

## Running Tests

You can run the tests using one of the following commands:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run all working component tests
yarn test:all-working

# Run individual component tests
yarn test:albums    # AlbumsTable test
yarn test:daily     # DailyPerformance test
yarn test:nav       # MainNav test
yarn test:photos    # PhotosTable test
yarn test:sales     # SalesChart test
yarn test:stat      # StatCard test
yarn test:theme     # ThemeProvider test
yarn test:user      # UserNav test
yarn test:dashboard # Dashboard integration test
```

## Component Test Coverage

| Component | Test File | Description |
|-----------|-----------|-------------|
| AlbumsTable | albums-table.test.tsx | Tests table rendering and data display |
| DailyPerformance | daily-performance.test.tsx | Tests daily performance grid display |
| MainNav | main-nav.test.tsx | Tests navigation links and routing |
| MiniChart | mini-chart.test.tsx | Tests chart visualization with Recharts |
| PhotosTable | photos-table.test.tsx | Tests photo data table and image display |
| SalesChart | sales-chart.test.tsx | Tests line chart for sales data |
| StatCard | stat-card.test.tsx | Tests stats card with icons and data |
| ThemeProvider | theme-provider.test.tsx | Tests theme context and toggle functionality |
| UserNav | user-nav.test.tsx | Tests user dropdown menu functionality |
| Dashboard | dashboard-integration.test.tsx | Tests integration of multiple components |

## Test Utilities

- `utils.tsx`: Contains router wrappers for testing components with routing
- `chart-test-utils.tsx`: Contains helpers for testing Recharts components
- `setup.ts`: Sets up global mocks and testing environment

## Writing Tests for UI Components

When writing tests for UI components, focus on:

1. **Basic rendering**: Check if the component renders without errors
2. **Data display**: Verify that data is displayed correctly
3. **User interactions**: Test button clicks and form submissions
4. **Styling**: Verify critical styling classes are applied

## Testing Chart Components

Chart components (SalesChart, MiniChart) require special handling:

1. Use `setupChartTestEnvironment()` to set up required mocks
2. Don't test exact chart elements, as they may not render in a test environment
3. Focus on testing the presence of containers or wrapper elements
4. Use `chartAssertions.hasAnyChartElements()` for more forgiving checks

## Testing Components with Radix UI

Radix UI components (like dropdown menus) can be challenging to test:

1. Focus on testing the elements that are always visible
2. Test ARIA attributes and accessibility features
3. Test button or trigger elements
4. For complex interactions, consider focusing on basic functionality

## Common Test Issues and Solutions

1. **Multiple elements found**: Use `getAllByText()` instead of `getByText()`
2. **Element not found**: Check if the text is broken up across multiple elements
3. **Chart rendering issues**: Use the chart test utilities and focus on container rendering
4. **Context errors**: Create a simplified mock context for testing context providers 