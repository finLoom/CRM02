import React from 'react';

// Lazy-load settings module components
const SettingsPage = React.lazy(() => import('../../modules/settings/pages/SettingsPage'));
const ProfileSettingsPage = React.lazy(() => import('../../modules/settings/pages/ProfileSettingsPage'));
const SecuritySettingsPage = React.lazy(() => import('../../modules/settings/pages/SecuritySettingsPage'));
const NotificationSettingsPage = React.lazy(() => import('../../modules/settings/pages/NotificationSettingsPage'));
const ThemeSettingsPage = React.lazy(() => import('../../modules/settings/pages/ThemeSettingsPage'));
const TeamSettingsPage = React.lazy(() => import('../../modules/settings/pages/TeamSettingsPage'));
const IntegrationSettingsPage = React.lazy(() => import('../../modules/settings/pages/IntegrationSettingsPage'));

/**
 * Settings module route configuration
 */
const settingsRoutes = [
  {
    path: '/settings',
    element: <SettingsPage />,
    exact: true
  },
  {
    path: '/settings/profile',
    element: <ProfileSettingsPage />,
    exact: true
  },
  {
    path: '/settings/security',
    element: <SecuritySettingsPage />,
    exact: true
  },
  {
    path: '/settings/notifications',
    element: <NotificationSettingsPage />,
    exact: true
  },
  {
    path: '/settings/theme',
    element: <ThemeSettingsPage />,
    exact: true
  },
  {
    path: '/settings/team',
    element: <TeamSettingsPage />,
    exact: true
  },
  {
    path: '/settings/integrations',
    element: <IntegrationSettingsPage />,
    exact: true
  }
];

export default settingsRoutes;