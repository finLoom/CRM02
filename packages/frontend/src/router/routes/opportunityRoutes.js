// File: packages/frontend/src/router/routes/opportunityRoutes.js
import React from 'react';

// Lazy-load opportunity module components
const OpportunitiesPage = React.lazy(() => import('../../modules/opportunities/pages/OpportunitiesPage'));
const OpportunityDetailPage = React.lazy(() => import('../../modules/opportunities/pages/OpportunityDetailPage'));
const OpportunityFormPage = React.lazy(() => import('../../modules/opportunities/pages/OpportunityFormPage'));
// const OpportunityPipelinePage = React.lazy(() => import('../../modules/opportunities/pages/OpportunityPipelinePage'));
// const OpportunityForecastPage = React.lazy(() => import('../../modules/opportunities/pages/OpportunityForecastPage'));

/**
 * Opportunity module route configuration
 */
const opportunityRoutes = [
  {
    path: '/opportunities',
    element: <OpportunitiesPage />,
    exact: true
  },
  {
    path: '/opportunities/new',
    element: <OpportunityFormPage />,
    exact: true
  },
//  {
//    path: '/opportunities/pipeline',
//    element: <OpportunityPipelinePage />,
//    exact: true
//  },
//  {
//    path: '/opportunities/forecast',
//    element: <OpportunityForecastPage />,
//    exact: true
//  },
  {
    path: '/opportunities/:id',
    element: <OpportunityDetailPage />,
    exact: true
  },
  {
    path: '/opportunities/:id/edit',
    element: <OpportunityFormPage />,
    exact: true
  }
];

export default opportunityRoutes;