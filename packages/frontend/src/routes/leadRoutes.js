// src/routes/leadRoutes.js
import { LeadsPage, LeadDetailPage, LeadFormPage } from '../modules/leads/pages';

const leadRoutes = [
  { path: "/leads/new", element: <LeadFormPage /> },
  { path: "/leads/:id/edit", element: <LeadFormPage /> },
  { path: "/leads/:id", element: <LeadDetailPage /> },
  { path: "/leads", element: <LeadsPage /> }
];

export default leadRoutes;