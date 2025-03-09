"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import {
  DashboardPage,
  CollectionPage,
  WishlistPage,
  DesignSystemPage,
  DesignTypographyPage,
  DesignImagesPage,
} from "@/lib/lazy-load";

// Regular import for the home page since it's the first page users see
import HomePage from "./page";

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  requireAuth?: boolean;
}

// Define routes with their components
const routes: RouteConfig[] = [
  { path: "/", component: HomePage },
  { path: "/dashboard", component: DashboardPage, requireAuth: true },
  { path: "/collection", component: CollectionPage, requireAuth: true },
  { path: "/wishlist", component: WishlistPage, requireAuth: true },
  { path: "/design", component: DesignSystemPage },
  { path: "/design/typography", component: DesignTypographyPage },
  { path: "/design/images", component: DesignImagesPage },
];

export function AppRouter() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  // Find the current route
  const route = routes.find((r) => r.path === pathname);

  // If no route is found, return null (will be handled by Next.js)
  if (!route) return null;

  // If the route requires authentication and the user is not logged in
  if (route.requireAuth && !loading && !user) {
    // In a real app, you would redirect to the login page
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
        <p>Please sign in to access this page.</p>
      </div>
    );
  }

  // If authentication is still loading, show a loading state
  if (route.requireAuth && loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Render the component for the current route
  const RouteComponent = route.component;
  return <RouteComponent />;
} 