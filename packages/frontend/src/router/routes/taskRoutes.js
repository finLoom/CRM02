import React from 'react';

// Lazy-load task module components
const TasksPage = React.lazy(() => import('../../modules/tasks/pages/TasksPage'));
const TaskDetailPage = React.lazy(() => import('../../modules/tasks/pages/TaskDetailPage'));
const TaskFormPage = React.lazy(() => import('../../modules/tasks/pages/TaskFormPage'));
const TaskTreeViewPage = React.lazy(() => import('../../modules/tasks/pages/TaskTreeViewPage'));
//const TaskKanbanPage = React.lazy(() => import('../../modules/tasks/pages/TaskKanbanPage'));
//const TaskCalendarPage = React.lazy(() => import('../../modules/tasks/pages/TaskCalendarPage'));

/**
 * Task module route configuration
 */
const taskRoutes = [
  {
    path: '/tasks',
    element: <TasksPage />,
    exact: true
  },
  {
    path: '/tasks/new',
    element: <TaskFormPage mode="create" />,
    exact: true
  },
  {
    path: '/tasks/tree',
    element: <TaskTreeViewPage />,
    exact: true
  },
//  {
//    path: '/tasks/kanban',
//    element: <TaskKanbanPage />,
//    exact: true
//  },
//  {
//    path: '/tasks/calendar',
//    element: <TaskCalendarPage />,
//    exact: true
//  },
  {
    path: '/tasks/:id',
    element: <TaskDetailPage />,
    exact: true
  },
  {
    path: '/tasks/:id/edit',
    element: <TaskFormPage mode="edit" />,
    exact: true
  }
];

export default taskRoutes;