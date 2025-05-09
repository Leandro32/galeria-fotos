import React, { Suspense } from 'react';
import { ErrorBoundary } from '../error-boundary';

/**
 * Enhances a router by wrapping it with an ErrorBoundary and Suspense
 * This ensures all route components have proper error handling and loading states
 */
export const withErrorHandling = (
  Router: React.ReactNode,
  { 
    fallback = <div className="flex justify-center">Loading...</div>,
    errorBoundaryProps = {}
  } = {}
) => {
  return (
    <ErrorBoundary {...errorBoundaryProps}>
      <Suspense fallback={fallback}>
        {Router}
      </Suspense>
    </ErrorBoundary>
  );
};

export default withErrorHandling; 