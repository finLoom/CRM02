import React from 'react';

// Lazy-load error pages
const NotFoundPage = React.lazy(() => import('../../shared/pages/NotFoundPage'));
const ServerErrorPage = React.lazy(() => import('../../shared/pages/ServerErrorPage'));
const AccessDeniedPage = React.lazy(() => import('../../shared/pages/AccessDeniedPage'));
const MaintenancePage = React.lazy(() => import('../../shared/pages/MaintenancePage'));

/**
 * Error handling routes configuration
 */
const errorRoutes = [
  {
    path: '/404',
    element: <NotFoundPage />,
    exact: true
  },
  {
    path: '/500',
    element: <ServerErrorPage />,
    exact: true
  },
  {
    path: '/403',
    element: <AccessDeniedPage />,
    exact: true
  },
  {
    path: '/maintenance',
    element: <MaintenancePage />,
    exact: true
  },
  {
    path: '*',
    element: <NotFoundPage />,
    exact: true
  }
];

export default errorRoutes;