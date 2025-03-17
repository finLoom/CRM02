import { lazyWithPreload } from '../../utils/lazyUtils';

// Use React.lazy with custom utility for code splitting with preload capability
const TasksPage = lazyWithPreload(() => import('../../modules/tasks/pages/TasksPage'));
const TaskDetailPage = lazyWithPreload(() => import('../../modules/tasks/pages/TaskDetailPage'));
const TaskFormPage = lazyWithPreload(() => import('../../modules/tasks/pages/TaskFormPage'));
const TaskTreeViewPage = lazyWithPreload(() => import('../../modules/tasks/pages/TaskTreeViewPage'));

/**
 * Task module route definitions
 * Each route object defines a path, element, and metadata
 */
const taskRoutes = [
  {
    path: "/tasks/new",
    element: <TaskFormPage />,
    requiresAuth: true,
    permissions: ['tasks:create'],
    name: 'Create Task'
  },
  {
    path: "/tasks/:id/edit",
    element: <TaskFormPage />,
    requiresAuth: true,
    permissions: ['tasks:edit'],
    name: 'Edit Task'
  },
  {
    path: "/tasks/:id",
    element: <TaskDetailPage />,
    requiresAuth: true,
    permissions: ['tasks:view'],
    name: 'Task Details'
  },
  {
    path: "/tasks/tree-view",
    element: <TaskTreeViewPage />,
    requiresAuth: true,
    permissions: ['tasks:view'],
    name: 'Task Tree View'
  },
  {
    path: "/tasks/my-tasks",
    element: <TasksPage />,
    requiresAuth: true,
    permissions: ['tasks:view'],
    name: 'My Tasks'
  },
  {
    path: "/tasks/due-today",
    element: <TasksPage />,
    requiresAuth: true,
    permissions: ['tasks:view'],
    name: 'Today\'s Tasks'
  },
  {
    path: "/tasks/overdue",
    element: <TasksPage />,
    requiresAuth: true,
    permissions: ['tasks:view'],
    name: 'Overdue Tasks'
  },
  {
    path: "/tasks/unassigned",
    element: <TasksPage />,
    requiresAuth: true,
    permissions: ['tasks:view'],
    name: 'Unassigned Tasks'
  },
  {
    path: "/tasks",
    element: <TasksPage />,
    requiresAuth: true,
    permissions: ['tasks:view'],
    name: 'All Tasks'
  }
];

export default taskRoutes;