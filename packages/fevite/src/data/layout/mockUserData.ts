// /src/data/layout/mockUserData.ts

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  department: string;
  avatar?: string;
  permissions: string[];
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: {
      email: boolean;
      push: boolean;
      desktop: boolean;
    };
    sidebarExpanded: boolean;
  };
}

export const mockUserData: User = {
  id: 'user-001',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  title: 'Product Manager',
  department: 'Product Development',
  avatar: 'https://i.pravatar.cc/150?u=user-001',
  permissions: [
    'view:dashboard',
    'view:tickets',
    'edit:tickets',
    'view:customers',
    'view:reports',
    'admin:settings',
  ],
  preferences: {
    theme: 'system',
    notifications: {
      email: true,
      push: true,
      desktop: false,
    },
    sidebarExpanded: true,
  },
};

export const mockTeamMembers: User[] = [
  {
    id: 'user-002',
    name: 'Sam Taylor',
    email: 'sam.taylor@example.com',
    title: 'Support Specialist',
    department: 'Customer Support',
    avatar: 'https://i.pravatar.cc/150?u=user-002',
    permissions: [
      'view:dashboard',
      'view:tickets',
      'edit:tickets',
      'view:customers',
    ],
    preferences: {
      theme: 'light',
      notifications: {
        email: true,
        push: false,
        desktop: true,
      },
      sidebarExpanded: true,
    },
  },
  {
    id: 'user-003',
    name: 'Jamie Chen',
    email: 'jamie.chen@example.com',
    title: 'Support Team Lead',
    department: 'Customer Support',
    avatar: 'https://i.pravatar.cc/150?u=user-003',
    permissions: [
      'view:dashboard',
      'view:tickets',
      'edit:tickets',
      'assign:tickets',
      'view:customers',
      'edit:customers',
      'view:reports',
    ],
    preferences: {
      theme: 'dark',
      notifications: {
        email: true,
        push: true,
        desktop: true,
      },
      sidebarExpanded: false,
    },
  },
  {
    id: 'user-004',
    name: 'Morgan Rivera',
    email: 'morgan.rivera@example.com',
    title: 'System Administrator',
    department: 'IT',
    avatar: 'https://i.pravatar.cc/150?u=user-004',
    permissions: [
      'view:dashboard',
      'view:tickets',
      'edit:tickets',
      'assign:tickets',
      'view:customers',
      'edit:customers',
      'view:reports',
      'admin:settings',
      'admin:users',
      'admin:permissions',
    ],
    preferences: {
      theme: 'system',
      notifications: {
        email: false,
        push: true,
        desktop: true,
      },
      sidebarExpanded: true,
    },
  },
];