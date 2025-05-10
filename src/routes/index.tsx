// src/router/index.tsx
import { createHashRouter, Outlet } from "react-router-dom";
import { lazyWithErrorBoundary } from "../components/lazy-with-error-boundary";
import { RouterErrorFallback } from "../components/routing/RouterErrorBoundary";

// Lazy-loaded pages with error boundaries
const HomePage = lazyWithErrorBoundary(() => import("../pages/HomePage"));
const PhotoUploadPage = lazyWithErrorBoundary(() => import("../pages/PhotoUploadPage"));
const CartPage = lazyWithErrorBoundary(() => import("../pages/CartPage"));
// const AdminDashboard = lazyWithErrorBoundary(() => import("../pages/admin/AdminDashboard"));
// const UploadPhotosPage = lazyWithErrorBoundary(() => import("../pages/photographer/UploadPhotosPage"));

// Layouts
const PublicLayout = () => <Outlet />;
// Admin and photographer layouts are commented out until needed
// const AdminLayout = () => <Outlet />;
// const PhotographerLayout = () => <Outlet />;

export const router = createHashRouter([
  {
    element: <PublicLayout />,
    errorElement: <RouterErrorFallback />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/upload",
        element: <PhotoUploadPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
  // {
  //   path: "/admin",
  //   element: <AdminLayout />,
  //   errorElement: <RouterErrorFallback />,
  //   children: [
  //     {
  //       index: true,
  //       element: <AdminDashboard />,
  //     },
  //     // Future admin routes like /admin/stats, /admin/settings...
  //   ],
  // },
  // {
  //   path: "/photographer",
  //   element: <PhotographerLayout />,
  //   errorElement: <RouterErrorFallback />,
  //   children: [
  //     {
  //       path: "upload",
  //       element: <UploadPhotosPage />,
  //     },
  //     // Future routes like /photographer/panel, /photographer/stats...
  //   ],
  // },
]);
