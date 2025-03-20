// packages/frontend/src/modules/opportunities/index.js

// Export pages
export { default as OpportunitiesPage } from './pages/OpportunitiesPage';
export { default as OpportunityDetailPage } from './pages/OpportunityDetailPage';
export { default as OpportunityFormPage } from './pages/OpportunityFormPage';

// Export components
export { default as OpportunityForm } from './components/OpportunityForm';
export { default as OpportunityDetail } from './components/OpportunityDetail';
export { default as OpportunityDialog } from './components/OpportunityDialog';

// Export hooks
export { default as useOpportunity } from './hooks/useOpportunity';
export { default as useOpportunityList } from './hooks/useOpportunityList';

// Export service
export { default as opportunityService } from './services/OpportunityService';

// Export constants
export * from './constants/opportunityConstants';