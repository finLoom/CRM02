import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * RouteGuard component for handling protected routes
 * Redirects unauthenticated users and saves return path
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isAuthenticated - Authentication status
 * @param {string} props.redirectPath - Path to redirect to if not authenticated
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 */
export const RouteGuard = ({
  isAuthenticated,
  redirectPath = '/login',
  children
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the current location
    return (
      <Navigate
        to={redirectPath}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // User is authenticated, render the protected content
  return children;
};

export default RouteGuard;