/**
 * Barrel file for exporting all route configurations
 * This centralizes route imports to make routes.js cleaner
 */

// Import all route configuration files
import dashboardRoutes from '../routes/dashboardRoutes';
import leadRoutes from '../routes/leadRoutes';
import contactRoutes from '../routes/contactRoutes';
import taskRoutes from '../routes/taskRoutes';
import opportunityRoutes from '../routes/opportunityRoutes';
import reportRoutes from '../routes/reportRoutes';
import settingsRoutes from '../routes/settingsRoutes';
//import authRoutes from '../routes/authRoutes';
//import errorRoutes from '../routes/errorRoutes';

// Export all routes
export {
  dashboardRoutes,
  leadRoutes,
  contactRoutes,
  taskRoutes,
  opportunityRoutes,
  reportRoutes,
  settingsRoutes
//  ,
//  authRoutes,
//  errorRoutes
};

// Export route array for direct consumption
export const allRoutes = [
  ...dashboardRoutes,
  ...leadRoutes,
  ...contactRoutes,
  ...taskRoutes,
  ...opportunityRoutes,
  ...reportRoutes,
  ...settingsRoutes
//  ,
//  ...authRoutes,
//  ...errorRoutes
];

export default allRoutes;