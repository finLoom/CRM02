import React from 'react';

// Lazy-load lead module components
const LeadsPage = React.lazy(() => import('../../modules/leads/pages/LeadsPage'));
const LeadDetailPage = React.lazy(() => import('../../modules/leads/pages/LeadDetailPage'));
const LeadFormPage = React.lazy(() => import('../../modules/leads/pages/LeadFormPage'));
//const LeadImportPage = React.lazy(() => import('../../modules/leads/pages/LeadImportPage'));
//const LeadConversionPage = React.lazy(() => import('../../modules/leads/pages/LeadConversionPage'));

/**
 * Lead module route configuration
 */
const leadRoutes = [
  {
    path: '/leads',
    element: <LeadsPage />,
    exact: true
  },
  {
    path: '/leads/new',
    element: <LeadFormPage mode="create" />,
    exact: true
  },
  {
    path: '/leads/:id',
    element: <LeadDetailPage />,
    exact: true
  },
  {
    path: '/leads/:id/edit',
    element: <LeadFormPage mode="edit" />,
    exact: true
  }
//  ,
//  {
//    path: '/leads/import',
//    element: <LeadImportPage />,
//    exact: true
//  },
//  {
//    path: '/leads/:id/convert',
//    element: <LeadConversionPage />,
//    exact: true
//  }
];

export default leadRoutes;