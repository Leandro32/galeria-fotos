import React, { Suspense, lazy as reactLazy } from "react";
import { ErrorBoundary } from "./error-boundary";

/**
 * A wrapper for React.lazy() that includes both Suspense and ErrorBoundary
 * This utility function makes it easier to create lazy-loaded components
 * with proper error handling and loading states.
 */
export function lazyWithErrorBoundary<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  fallback: React.ReactNode = <div className="flex justify-center">Loading...</div>
): React.ComponentType<React.ComponentProps<T>> {
  const LazyComponent = reactLazy(factory);

  const ComponentWithErrorBoundary = (props: React.ComponentProps<T>) => (
    <ErrorBoundary>
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );

  // Set display name for better debugging
  const componentName = 
    factory.toString().match(/import\(['"](.+)['"]\)/) ?? 
    factory.toString().match(/import\([`](.+)[`]\)/) ?? 
    ['', 'UnknownComponent'];
  
  ComponentWithErrorBoundary.displayName = `LazyWithErrorBoundary(${componentName[1].split('/').pop() ?? 'Component'})`;
  
  return ComponentWithErrorBoundary;
}

/**
 * Creates a set of lazy-loaded components with error boundaries
 * @param componentMap An object with component paths as keys and import factories as values
 * @returns An object with the same keys but with lazy-loaded components with error boundaries
 */
export function createLazyComponentsWithErrorBoundary<
  T extends Record<string, () => Promise<{ default: React.ComponentType<any> }>>
>(componentMap: T, fallback?: React.ReactNode) {
  const result: Record<string, React.ComponentType<any>> = {};
  
  for (const key in componentMap) {
    result[key] = lazyWithErrorBoundary(componentMap[key], fallback);
  }
  
  return result as {
    [K in keyof T]: React.ComponentType<
      React.ComponentProps<React.ComponentType<any>>
    >;
  };
}
