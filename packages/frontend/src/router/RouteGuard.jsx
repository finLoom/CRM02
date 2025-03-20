import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from '@fluentui/react-components';

/**
 * RouteGuard component for handling protected routes
 * Redirects unauthenticated users and saves return path
 * Shows loading state while checking authentication
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isAuthenticated - Authentication status
 * @param {boolean} props.loading - Authentication loading state
 * @param {string} props.redirectPath - Path to redirect to if not authenticated
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 */
export const RouteGuard = ({
  isAuthenticated,
  loading = false,
  redirectPath = '/login',
  children
}) => {
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner label="Verifying authentication..." />
      </div>
    );
  }

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