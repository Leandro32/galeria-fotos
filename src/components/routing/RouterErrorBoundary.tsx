import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { ErrorBoundary } from "../error-boundary";

/**
 * Error fallback component for React Router errors
 * Displays different error messages based on the type of error
 */
export const RouterErrorFallback = () => {
  const error = useRouteError();
  console.error(error)

  if ( isRouteErrorResponse( error ) ) {
    const status = error.status;
    const title = status === 404 ? "Page Not Found" : "An error occurred";
    const message = status === 404
      ? "The page you're looking for does not exist."
      : error.data?.message || "Something went wrong. Please try again.";
    
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p>{message}</p>
        <div className="flex gap-4">
          <a href="/">
            Back to Home
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
      <h2 className="text-3xl font-bold">Unexpected Error</h2>
      <p>
        {error instanceof Error ? error.message : "An unknown error occurred"}
      </p>
      <div className="flex gap-4">
        <a href="/">
          Back to Home
        </a>
      </div>
    </div>
  );
};

/**
 * Higher-order component that wraps a component with an ErrorBoundary
 */
export const withRouterErrorBoundary = ( Component: React.ComponentType ) => {
  return ( props: any ) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
};

export default RouterErrorFallback; 