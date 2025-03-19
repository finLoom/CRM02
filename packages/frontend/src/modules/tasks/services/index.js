// File: packages/frontend/src/modules/tasks/services/index.js
import TaskService, * as taskServiceExports from './TaskService';
import TaskApiClient from './TaskApiClient';
import TaskDataAdapter from './TaskDataAdapter';
import TaskErrorHandler from './TaskErrorHandler';

// Export the default TaskService instance and all named exports
export default TaskService;
export * from './TaskService';

// Export individual component classes
export {
  TaskApiClient,
  TaskDataAdapter,
  TaskErrorHandler
};