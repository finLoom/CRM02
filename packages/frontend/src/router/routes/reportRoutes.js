import React from 'react';

// Lazy-load report module components
const ReportsPage = React.lazy(() => import('../../modules/reports/pages/ReportsPage'));
const ReportBuilderPage = React.lazy(() => import('../../modules/reports/pages/ReportBuilderPage'));
const ReportViewPage = React.lazy(() => import('../../modules/reports/pages/ReportViewPage'));
const SalesReportPage = React.lazy(() => import('../../modules/reports/pages/SalesReportPage'));
const ActivityReportPage = React.lazy(() => import('../../modules/reports/pages/ActivityReportPage'));
const LeadReportPage = React.lazy(() => import('../../modules/reports/pages/LeadReportPage'));

/**
 * Reports module route configuration
 */
const reportRoutes = [
  {
    path: '/reports',
    element: <ReportsPage />,
    exact: true
  },
  {
    path: '/reports/builder',
    element: <ReportBuilderPage />,
    exact: true
  },
  {
    path: '/reports/sales',
    element: <SalesReportPage />,
    exact: true
  },
  {
    path: '/reports/leads',
    element: <LeadReportPage />,
    exact: true
  },
  {
    path: '/reports/activities',
    element: <ActivityReportPage />,
    exact: true
  },
  {
    path: '/reports/:id',
    element: <ReportViewPage />,
    exact: true
  }
];

export default reportRoutes;