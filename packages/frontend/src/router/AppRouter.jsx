import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from '@fluentui/react';
import Layout from '../shared/components/layout/Layout';
import routes from './routes';
import { useAuth } from '../hooks/useAuth';
import { RouteGuard } from './RouteGuard';

/**
 * Application router component
 * Renders all application routes with code splitting and authentication guards
 */
const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  // Loading fallback for code splitting
  const renderLoader = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      padding: '2rem'
    }}>
      <Spinner label="Loading content..." />
    </div>
  );

  return (
    <Layout>
      <Suspense fallback={renderLoader()}>
        <Routes>
          {routes.map((route) => {
            // Handle routes that require authentication
            if (route.requiresAuth) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <RouteGuard
                      isAuthenticated={isAuthenticated}
                      redirectPath="/login"
                    >
                      {route.element}
                    </RouteGuard>
                  }
                />
              );
            }

            // Handle public routes
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}

          {/* Default redirect to dashboard or login based on auth status */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
          />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default AppRouter;