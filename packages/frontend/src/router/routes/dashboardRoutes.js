import React from 'react';

// Lazy-load dashboard components
const DashboardPage = React.lazy(() => import('../../modules/dashboard/pages/DashboardPage'));
//const SalesPerformancePage = React.lazy(() => import('../../../modules/dashboard/pages/SalesPerformancePage'));
//const TeamPerformancePage = React.lazy(() => import('../../../modules/dashboard/pages/TeamPerformancePage'));
//const MarketingDashboardPage = React.lazy(() => import('../../../modules/dashboard/pages/MarketingDashboardPage'));

/**
 * Dashboard module route configuration
 */
const dashboardRoutes = [
  {
    path: '/',
    element: <DashboardPage />,
    requiresAuth: true
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    exact: true
  }
//  ,
//  {
//    path: '/dashboard/sales',
//    element: <SalesPerformancePage />,
//    exact: true
//  },
//  {
//    path: '/dashboard/team',
//    element: <TeamPerformancePage />,
//    exact: true
//  },
//  {
//    path: '/dashboard/marketing',
//    element: <MarketingDashboardPage />,
//    exact: true
//  }
];

export default dashboardRoutes;