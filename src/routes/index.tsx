// src/router/index.tsx
import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazyWithErrorBoundary } from "../components/lazy-with-error-boundary";
import { RouterErrorFallback } from "../components/routing/RouterErrorBoundary";

// Lazy-loaded pages with error boundaries
const HomePage = lazyWithErrorBoundary(() => import("../pages/HomePage"));
const PhotoUploadPage = lazyWithErrorBoundary(() => import("../pages/PhotoUploadPage"));
const CartPage = lazyWithErrorBoundary(() => import("../pages/CartPage"));
const DashboardPage = lazyWithErrorBoundary(() => import("../pages/DashboardPage"));

// Layouts
const PublicLayout = () => <Outlet />;
const AdminLayout = () => <Outlet />;
const PhotographerLayout = () => <Outlet />;

export const router = createBrowserRouter([
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
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <RouterErrorFallback />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/photographer",
    element: <PhotographerLayout />,
    errorElement: <RouterErrorFallback />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "upload",
        element: <PhotoUploadPage />,
      },
    ],
  },
]);
