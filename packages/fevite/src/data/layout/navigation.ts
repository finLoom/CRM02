// /src/data/layout/navigation.ts
import * as React from 'react';
import {
  Home20Regular,
  TicketDiagonal20Regular,
  People20Regular,
  CalendarLtr20Regular,
  Document20Regular,
  ChatMultiple20Regular,
  ChartMultiple20Regular,
  Search20Regular,
  Briefcase20Regular,
  Settings20Regular,
  Mail20Regular,
  AppsAddIn20Regular,
  CloudFlow20Regular,
  AppsListDetail20Regular,
  Chat20Regular,
  DataPie20Regular,
  Toolbox20Regular,
} from '@fluentui/react-icons';

export interface NavigationItem {
  id: string;
  name: string;
  path?: string;
  iconName: string;
  children?: NavigationItem[];
  badgeCount?: number;
  type?: 'link' | 'category';
  defaultExpanded?: boolean;
}

// Map of icon names to icon components
export const iconMap: Record<string, React.ElementType> = {
  'Home20Regular': Home20Regular,
  'TicketDiagonal20Regular': TicketDiagonal20Regular,
  'People20Regular': People20Regular,
  'CalendarLtr20Regular': CalendarLtr20Regular,
  'Document20Regular': Document20Regular,
  'ChatMultiple20Regular': ChatMultiple20Regular,
  'ChartMultiple20Regular': ChartMultiple20Regular,
  'Search20Regular': Search20Regular,
  'Briefcase20Regular': Briefcase20Regular,
  'Settings20Regular': Settings20Regular,
  'Mail20Regular': Mail20Regular,
  'AppsAddIn20Regular': AppsAddIn20Regular,
  'CloudFlow20Regular': CloudFlow20Regular,
  'AppsListDetail20Regular': AppsListDetail20Regular,
  'Chat20Regular': Chat20Regular,
  'DataPie20Regular': DataPie20Regular,
  'Toolbox20Regular': Toolbox20Regular,
};

export const navigationData: NavigationItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
    iconName: 'Home20Regular',
  },
  {
    id: 'core',
    name: 'Core Modules',
    path: '/core',
    iconName: 'AppsListDetail20Regular',
    type: 'category',
    defaultExpanded: true,
    children: [
      {
        id: 'tickets',
        name: 'Tickets',
        path: '/tickets',
        iconName: 'TicketDiagonal20Regular',
        // Removed badge count to fix issue
        children: [
          {
            id: 'open-tickets',
            name: 'Open Tickets',
            path: '/tickets/open',
            iconName: 'TicketDiagonal20Regular',
          },
          {
            id: 'my-tickets',
            name: 'My Tickets',
            path: '/tickets/my',
            iconName: 'TicketDiagonal20Regular',
          },
          {
            id: 'ticket-settings',
            name: 'Ticket Settings',
            path: '/tickets/settings',
            iconName: 'Settings20Regular',
          },
        ],
      },
      {
        id: 'customers',
        name: 'Customers',
        path: '/customers',
        iconName: 'People20Regular',
      },
      {
        id: 'calendar',
        name: 'Calendar',
        path: '/calendar',
        iconName: 'CalendarLtr20Regular',
      },
      {
        id: 'documents',
        name: 'Documents',
        path: '/documents',
        iconName: 'Document20Regular',
      },
    ],
  },
  {
    id: 'communication',
    name: 'Communication',
    path: '/communication',
    iconName: 'Chat20Regular',
    type: 'category',
    children: [
      {
        id: 'conversations',
        name: 'Conversations',
        path: '/conversations',
        iconName: 'ChatMultiple20Regular',
      },
      {
        id: 'emails',
        name: 'Emails',
        path: '/emails',
        iconName: 'Mail20Regular',
      },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics',
    path: '/analytics',
    iconName: 'DataPie20Regular',
    type: 'category',
    children: [
      {
        id: 'reports',
        name: 'Reports',
        path: '/reports',
        iconName: 'ChartMultiple20Regular',
      },
      {
        id: 'search',
        name: 'Advanced Search',
        path: '/search',
        iconName: 'Search20Regular',
      },
    ],
  },
  {
    id: 'administration',
    name: 'Administration',
    path: '/administration',
    iconName: 'Toolbox20Regular',
    type: 'category',
    children: [
      {
        id: 'step-engine',
        name: 'Step Engine',
        path: '/step-engine',
        iconName: 'CloudFlow20Regular',
      },
      {
        id: 'integrations',
        name: 'Integrations',
        path: '/integrations',
        iconName: 'AppsAddIn20Regular',
      },
      {
        id: 'business-rules',
        name: 'Business Rules',
        path: '/business-rules',
        iconName: 'Briefcase20Regular',
      },
      {
        id: 'settings',
        name: 'Settings',
        path: '/settings',
        iconName: 'Settings20Regular',
      },
    ],
  },
];

// Helper function to get icon component
export function getIconComponent(iconName: string): React.ReactNode {
  const IconComponent = iconMap[iconName];
  return IconComponent ? React.createElement(IconComponent) : null;
}