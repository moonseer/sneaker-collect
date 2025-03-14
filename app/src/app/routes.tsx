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
// Import the simplified sneaker detail page
import SneakerDetailPage from "./collection/[id]/page";
// Import the test page
import TestPage from "./collection/[id]/test-page";
// Import the edit page
import EditSneakerPage from "./collection/[id]/edit/page";
// Import the add sneaker page
import AddSneakerPage from "./collection/add/page";

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  requireAuth?: boolean;
  // Add a pattern property for dynamic routes
  pattern?: RegExp;
  // Add a getParams function to extract params from the path
  getParams?: (pathname: string) => any;
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
  // Add a pattern for test-simple
  { 
    path: "/test-simple", 
    component: () => <div>Test Simple Page</div>,
    pattern: /^\/test-simple$/
  },
  // Add the add sneaker page route
  {
    path: "/collection/add",
    component: AddSneakerPage,
    requireAuth: true,
    pattern: /^\/collection\/add$/
  },
  // Add a pattern for sneaker detail page
  {
    path: "/collection/[id]",
    component: SneakerDetailPage,
    requireAuth: true,
    pattern: /^\/collection\/([^\/]+)$/,
    getParams: (pathname) => {
      const match = pathname.match(/^\/collection\/([^\/]+)$/);
      return match ? { id: match[1] } : {};
    }
  },
  // Add a pattern for sneaker test page
  {
    path: "/collection/[id]/test-page",
    component: TestPage,
    requireAuth: true,
    pattern: /^\/collection\/([^\/]+)\/test-page$/,
    getParams: (pathname) => {
      const match = pathname.match(/^\/collection\/([^\/]+)\/test-page$/);
      return match ? { id: match[1] } : {};
    }
  },
  // Add a pattern for sneaker edit page
  {
    path: "/collection/[id]/edit",
    component: EditSneakerPage,
    requireAuth: true,
    pattern: /^\/collection\/([^\/]+)\/edit$/,
    getParams: (pathname) => {
      const match = pathname.match(/^\/collection\/([^\/]+)\/edit$/);
      return match ? { id: match[1] } : {};
    }
  }
];

export function AppRouter() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  console.log("Current pathname:", pathname);

  // Find the current route - first check exact matches, then patterns
  const route = routes.find(
    (r) => r.path === pathname || (r.pattern && r.pattern.test(pathname))
  );

  console.log("Matched route:", route);

  // If no route is found, return null (will be handled by Next.js)
  if (!route) {
    console.log("No route found for:", pathname);
    return null;
  }

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

  // Extract params if this is a dynamic route
  const params = route.getParams ? route.getParams(pathname) : {};
  console.log("Route params:", params);

  // Render the component for the current route
  const RouteComponent = route.component;
  return <RouteComponent params={params} />;
} 