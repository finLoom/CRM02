# Router Structure Analysis

## Structure Issues

- Both routeConfig and routes directories exist, which can cause confusion

## Route Files Found

### main

- `routes.js`

### directory

- `routeConfig`
- `routes`

### routeConfig

- `dashboardRoutes.js`
- `index.js`
- `taskRoutes.js`

### routes

- `authRoutes.js`
- `contactRoutes.js`
- `errorRoutes.js`
- `index.js`
- `leadRoutes.js`
- `opportunityRoutes.js`
- `reportRoutes.js`
- `settingsRoutes.js`
- `taskRoutes.js`

## Import Issues

### In file: `routeConfig\index.js`

- Import: `./opportunityRoutes`
- Issue: Import path does not exist
- Resolved path: `routeConfig\opportunityRoutes`

### In file: `routeConfig\index.js`

- Import: `./reportRoutes`
- Issue: Import path does not exist
- Resolved path: `routeConfig\reportRoutes`

### In file: `routeConfig\index.js`

- Import: `./settingsRoutes`
- Issue: Import path does not exist
- Resolved path: `routeConfig\settingsRoutes`

### In file: `routeConfig\index.js`

- Import: `./authRoutes`
- Issue: Import path does not exist
- Resolved path: `routeConfig\authRoutes`

### In file: `routeConfig\index.js`

- Import: `./errorRoutes`
- Issue: Import path does not exist
- Resolved path: `routeConfig\errorRoutes`

### In file: `routeConfig\taskRoutes.js`

- Import: `../../utils/lazyUtils`
- Issue: Import path points outside of src directory
- Resolved path: `..\utils\lazyUtils`
- Possible fix: Change to `Move this component into src/ directory or adjust import to use a path within src/`

### In file: `routes\index.js`

- Import: `../modules/dashboard/pages/DashboardPage`
- Issue: Import path does not exist
- Resolved path: `modules\dashboard\pages\DashboardPage`

### In file: `routes\index.js`

- Import: `../modules/settings/pages/SettingsPage`
- Issue: Import path does not exist
- Resolved path: `modules\settings\pages\SettingsPage`

### In file: `routes\index.js`

- Import: `../modules/reports/pages/ReportsPage`
- Issue: Import path does not exist
- Resolved path: `modules\reports\pages\ReportsPage`

### In file: `routes\index.js`

- Import: `../pages/ContactsPage`
- Issue: Import path does not exist
- Resolved path: `pages\ContactsPage`

### In file: `routes\index.js`

- Import: `../pages/ContactDetailPage`
- Issue: Import path does not exist
- Resolved path: `pages\ContactDetailPage`

### In file: `routes\index.js`

- Import: `../pages/ContactFormPage`
- Issue: Import path does not exist
- Resolved path: `pages\ContactFormPage`

### In file: `routes\index.js`

- Import: `../pages/LeadsPage`
- Issue: Import path does not exist
- Resolved path: `pages\LeadsPage`

### In file: `routes\index.js`

- Import: `../pages/DashboardPage`
- Issue: Import path does not exist
- Resolved path: `pages\DashboardPage`

### In file: `routes\index.js`

- Import: `../pages/SettingsPage`
- Issue: Import path does not exist
- Resolved path: `pages\SettingsPage`

### In file: `routes\index.js`

- Import: `../pages/ReportsPage`
- Issue: Import path does not exist
- Resolved path: `pages\ReportsPage`

### In file: `routes\index.js`

- Import: `../pages/OpportunitiesPage`
- Issue: Import path does not exist
- Resolved path: `pages\OpportunitiesPage`

### In file: `routes\index.js`

- Import: `../pages/OpportunityDetailPage`
- Issue: Import path does not exist
- Resolved path: `pages\OpportunityDetailPage`

## Recommended Fixes

1. Move all files from router/routes/ to router/routeConfig/ for consistency
2. Fix import paths in route files to point to correct locations

## Summary

- Found 15 route-related files
- Found 1 structure issues
- Found 18 import issues
- Suggested 2 fixes
