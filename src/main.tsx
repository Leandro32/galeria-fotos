import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { withErrorHandling } from './components/routing/withErrorHandling';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {withErrorHandling(<RouterProvider router={router} />)}
  </React.StrictMode>
);
