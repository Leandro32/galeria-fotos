import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Lazy load router to improve initial load time
const AppRouter = lazy(() => import('./AppRouter'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <AppRouter />
    </Suspense>
  </React.StrictMode>
);
