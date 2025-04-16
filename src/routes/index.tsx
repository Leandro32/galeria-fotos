// src/router/index.tsx
import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy } from "react";

// Lazy-loaded pages
const HomePage = lazy(() => import("@/pages/HomePage"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const UploadPhotosPage = lazy(() => import("@/pages/photographer/UploadPhotosPage"));

// Layouts
const PublicLayout = () => <Outlet />;
const AdminLayout = () => <Outlet />;
const PhotographerLayout = () => <Outlet />;

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      // Future admin routes like /admin/stats, /admin/settings...
    ],
  },
  {
    path: "/photographer",
    element: <PhotographerLayout />,
    children: [
      {
        path: "upload",
        element: <UploadPhotosPage />,
      },
      // Future routes like /photographer/panel, /photographer/stats...
    ],
  },
]);
