////// src/routes/index.js
////import taskRoutes from './taskRoutes';
////import leadRoutes from './leadRoutes';
////import contactRoutes from './contactRoutes';
////import DashboardPage from '../modules/dashboard/pages/DashboardPage';
////import SettingsPage from '../modules/settings/pages/SettingsPage';
////import ReportsPage from '../modules/reports/pages/ReportsPage';
////
////// Define root route
////const homeRoute = { path: "/", element: <DashboardPage /> };
////
////// Define other standalone routes
////const otherRoutes = [
////  { path: "/settings", element: <SettingsPage /> },
////  { path: "/reports", element: <ReportsPage /> }
////];
////
////// Combine all routes
////const routes = [
////  homeRoute,
////  ...taskRoutes,
////  ...leadRoutes,
////  ...contactRoutes,
////  ...otherRoutes
////];
////
////export default routes;
//
//// src/routes/index.js
//import React from 'react';
//import taskRoutes from './taskRoutes';
//// Import existing pages for non-task routes
//import ContactsPage from '../pages/ContactsPage';
//import ContactDetailPage from '../pages/ContactDetailPage';
//import ContactFormPage from '../pages/ContactFormPage';
//import LeadsPage from '../pages/LeadsPage';
//import DashboardPage from '../pages/DashboardPage';
//import SettingsPage from '../pages/SettingsPage';
//import ReportsPage from '../pages/ReportsPage';
//import OpportunitiesPage from '../pages/OpportunitiesPage';
//import OpportunityDetailPage from '../pages/OpportunityDetailPage';
//
//// Define contact routes (still using old structure)
//const contactRoutes = [
//  { path: "/contacts/new", element: <ContactFormPage /> },
//  { path: "/contacts/:id/edit", element: <ContactFormPage /> },
//  { path: "/contacts/:id", element: <ContactDetailPage /> },
//  { path: "/contacts", element: <ContactsPage /> }
//];
//
//// Define lead routes (still using old structure)
//const leadRoutes = [
//  { path: "/leads", element: <LeadsPage /> }
//];
//
//// Define opportunity routes (still using old structure)
//const opportunityRoutes = [
//  { path: "/opportunities", element: <OpportunitiesPage /> },
//  { path: "/opportunities/:id", element: <OpportunityDetailPage /> }
//];
//
//// Define root route
//const homeRoute = { path: "/", element: <DashboardPage /> };
//
//// Define other standalone routes
//const otherRoutes = [
//  { path: "/settings", element: <SettingsPage /> },
//  { path: "/reports", element: <ReportsPage /> }
//];
//
//// Combine all routes, using new taskRoutes
//const routes = [
//  homeRoute,
//  ...taskRoutes,
//  ...leadRoutes,
//  ...contactRoutes,
//  ...opportunityRoutes,
//  ...otherRoutes
//];
//
//export default routes;