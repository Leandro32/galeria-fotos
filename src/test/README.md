# Component Tests

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