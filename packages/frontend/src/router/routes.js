import { allRoutes } from './routeConfig';

/**
 * Main routes configuration file that aggregates all route definitions
 * from the modular route configuration files.
 *
 * This centralized approach makes it easy to:
 * 1. Register all routes in one place
 * 2. Apply global route middleware if needed
 * 3. Categorize routes for authorization purposes
 */

// Extract routes by authentication requirement
export const publicRoutes = allRoutes.filter(route =>
  route.path.startsWith('/login') ||
  route.path.startsWith('/register') ||
  route.path.startsWith('/forgot-password') ||
  route.path.startsWith('/reset-password') ||
  route.path.startsWith('/verify-email')
);

export const protectedRoutes = allRoutes.filter(route =>
  !publicRoutes.includes(route) &&
  !route.path.startsWith('/404') &&
  !route.path.startsWith('/500') &&
  !route.path.startsWith('/403') &&
  !route.path.startsWith('/maintenance') &&
  route.path !== '*'
);

export const errorRoutes = allRoutes.filter(route =>
  route.path.startsWith('/404') ||
  route.path.startsWith('/500') ||
  route.path.startsWith('/403') ||
  route.path.startsWith('/maintenance') ||
  route.path === '*'
);

// Export all routes for direct consumption in the router
export default allRoutes;