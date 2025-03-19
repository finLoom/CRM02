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


//import React from 'react';
//
//// Lazy-load task module components
//const TasksPage = React.lazy(() => import('../../modules/tasks/pages/TasksPage'));
//const TaskDetailPage = React.lazy(() => import('../../modules/tasks/pages/TaskDetailPage'));
//const TaskFormPage = React.lazy(() => import('../../modules/tasks/pages/TaskFormPage'));
//const TaskTreeViewPage = React.lazy(() => import('../../modules/tasks/pages/TaskTreeViewPage'));
////const TaskKanbanPage = React.lazy(() => import('../../modules/tasks/pages/TaskKanbanPage'));
////const TaskCalendarPage = React.lazy(() => import('../../modules/tasks/pages/TaskCalendarPage'));
//
///**
// * Task module route configuration
// */
//const taskRoutes = [
//  {
//    path: '/tasks',
//    element: <TasksPage />,
//    exact: true
//  },
//  {
//    path: '/tasks/new',
//    element: <TaskFormPage mode="create" />,
//    exact: true
//  },
//  {
//    path: '/tasks/tree',
//    element: <TaskTreeViewPage />,
//    exact: true
//  },
////  {
////    path: '/tasks/kanban',
////    element: <TaskKanbanPage />,
////    exact: true
////  },
////  {
////    path: '/tasks/calendar',
////    element: <TaskCalendarPage />,
////    exact: true
////  },
//  {
//    path: '/tasks/:id',
//    element: <TaskDetailPage />,
//    exact: true
//  },
//  {
//    path: '/tasks/:id/edit',
//    element: <TaskFormPage mode="edit" />,
//    exact: true
//  }
//];
//
//export default taskRoutes;