// src/routes/taskRoutes.js
import { TasksPage, TaskDetailPage, TaskFormPage } from '../modules/tasks/pages';

const taskRoutes = [
  { path: "/tasks/new", element: <TaskFormPage /> },
  { path: "/tasks/:id/edit", element: <TaskFormPage /> },
  { path: "/tasks/:id", element: <TaskDetailPage /> },
  { path: "/tasks/my-tasks", element: <TasksPage /> },
  { path: "/tasks/due-today", element: <TasksPage /> },
  { path: "/tasks/overdue", element: <TasksPage /> },
  { path: "/tasks/unassigned", element: <TasksPage /> },
  { path: "/tasks", element: <TasksPage /> }
];

export default taskRoutes;