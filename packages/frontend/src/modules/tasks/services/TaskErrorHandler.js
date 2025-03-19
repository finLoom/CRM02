// File: packages/frontend/src/modules/tasks/services/TaskService.js
import taskApiClient from './TaskApiClient';
import taskDataAdapter from './TaskDataAdapter';
import taskErrorHandler from './TaskErrorHandler';

/**
 * Main service for task operations
 * Acts as a facade for API calls, data transformation, and error handling
 */
class TaskService {
  /**
   * Fetch tasks with filtering
   *
   * @param {Object} filter - Filter parameters
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} Promise with transformed tasks
   */
  async fetchTasks(filter = {}, pageable = { page: 0, size: 20 }) {
    try {
      const apiFilter = taskDataAdapter.prepareFilterForApi(filter);
      const response = await taskApiClient.fetchTasks(apiFilter, pageable);

      return {
        data: taskDataAdapter.transformTasks(response.data),
        meta: response.meta
      };
    } catch (error) {
      taskErrorHandler.handleFetchTasksError(error);
      // Throw error to allow caller to handle it
      throw error;
    }
  }

  /**
   * Get task by ID
   *
   * @param {string|number} id - Task ID
   * @returns {Promise} Promise with transformed task
   */
  async getTaskById(id) {
    try {
      const response = await taskApiClient.getTaskById(id);
      return {
        data: taskDataAdapter.transformTask(response.data)
      };
    } catch (error) {
      taskErrorHandler.handleGetTaskError(error, id);
      throw error;
    }
  }

  /**
   * Create a new task
   *
   * @param {Object} taskData - Task data
   * @returns {Promise} Promise with created task
   */
  async createTask(taskData) {
    try {
      const apiData = taskDataAdapter.prepareTaskDataForApi(taskData);
      const response = await taskApiClient.createTask(apiData);
      return {
        data: taskDataAdapter.transformTask(response.data)
      };
    } catch (error) {
      taskErrorHandler.handleCreateTaskError(error);
      throw error;
    }
  }

  /**
   * Update an existing task
   *
   * @param {string|number} id - Task ID
   * @param {Object} taskData - Updated task data
   * @returns {Promise} Promise with updated task
   */
  async updateTask(id, taskData) {
    try {
      const apiData = taskDataAdapter.prepareTaskDataForApi(taskData);
      const response = await taskApiClient.updateTask(id, apiData);
      return {
        data: taskDataAdapter.transformTask(response.data)
      };
    } catch (error) {
      taskErrorHandler.handleUpdateTaskError(error, id);
      throw error;
    }
  }

  /**
   * Delete a task
   *
   * @param {string|number} id - Task ID
   * @returns {Promise} Promise with deletion result
   */
  async deleteTask(id) {
    try {
      const response = await taskApiClient.deleteTask(id);
      return {
        data: response.data
      };
    } catch (error) {
      taskErrorHandler.handleDeleteTaskError(error, id);
      throw error;
    }
  }

  /**
   * Get tasks assigned to current user
   *
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} Promise with tasks
   */
  async getMyTasks(pageable = { page: 0, size: 20 }) {
    try {
      const response = await taskApiClient.getMyTasks(pageable);
      return {
        data: taskDataAdapter.transformTasks(response.data),
        meta: response.meta
      };
    } catch (error) {
      taskErrorHandler.handleGenericError(error, 'fetch your tasks');
      throw error;
    }
  }

  /**
   * Get tasks assigned to specific user
   *
   * @param {string|number} userId - User ID
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} Promise with tasks
   */
  async getTasksByAssignedUser(userId, pageable = { page: 0, size: 20 }) {
    try {
      const response = await taskApiClient.getTasksByAssignedUser(userId, pageable);
      return {
        data: taskDataAdapter.transformTasks(response.data),
        meta: response.meta
      };
    } catch (error) {
      taskErrorHandler.handleGenericError(error, 'fetch user tasks');
      throw error;
    }
  }

  /**
   * Get tasks by team
   *
   * @param {string|number} teamId - Team ID
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} Promise with tasks
   */
  async getTasksByTeam(teamId, pageable = { page: 0, size: 20 }) {
    try {
      const response = await taskApiClient.getTasksByTeam(teamId, pageable);
      return {
        data: taskDataAdapter.transformTasks(response.data),
        meta: response.meta
      };
    } catch (error) {
      taskErrorHandler.handleGenericError(error, 'fetch team tasks');
      throw error;
    }
  }

  /**
   * Get tasks by status
   *
   * @param {string} status - Task status
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} Promise with tasks
   */
  async getTasksByStatus(status, pageable = { page: 0, size: 20 }) {
    try {
      const response = await taskApiClient.getTasksByStatus(status, pageable);
      return {
        data: taskDataAdapter.transformTasks(response.data),
        meta: response.meta
      };
    } catch (error) {
      taskErrorHandler.handleGenericError(error, 'fetch tasks by status');
      throw error;
    }
  }

  /**
   * Get overdue tasks
   *
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} Promise with tasks
   */
  async getOverdueTasks(pageable = { page: 0, size: 20 }) {
    try {
      const response = await taskApiClient.getOverdueTasks(pageable);
      return {
        data: taskDataAdapter.transformTasks(response.data),
        meta: response.meta
      };
    } catch (error) {
      taskErrorHandler.handleGenericError(error, 'fetch overdue tasks');
      throw error;
    }
  }

  /**
   * Get tasks due today
   *
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} Promise with tasks
   */
  async getTasksDueToday(pageable = { page: 0, size: 20 }) {
    try {
      const response = await taskApiClient.getTasksDueToday(pageable);
      return {
        data: taskDataAdapter.transformTasks(response.data),
        meta: response.meta
      };
    } catch (error) {
      taskErrorHandler.handleGenericError(error, 'fetch today\'s tasks');
      throw error;
    }
  }

  /**
   * Get unassigned tasks
   *
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} Promise with tasks
   */
  async getUnassignedTasks(pageable = { page: 0, size: 20 }) {
    try {
      const response = await taskApiClient.getUnassignedTasks(pageable);
      return {
        data: taskDataAdapter.transformTasks(response.data),
        meta: response.meta
      };
    } catch (error) {
      taskErrorHandler.handleGenericError(error, 'fetch unassigned tasks');
      throw error;
    }
  }

  /**
   * Get subtasks
   *
   * @param {string|number} parentTaskId - Parent task ID
   * @returns {Promise} Promise with subtasks
   */
  async getSubtasks(parentTaskId) {
    try {
      const response = await taskApiClient.getSubtasks(parentTaskId);
      return {
        data: taskDataAdapter.transformTasks(response.data)
      };
    } catch (error) {
      taskErrorHandler.handleGetSubtasksError(error, parentTaskId);
      throw error;
    }
  }

  /**
   * Assign task to user
   *
   * @param {string|number} taskId - Task ID
   * @param {string|number} userId - User ID
   * @returns {Promise} Promise with updated task
   */
  async assignTaskToUser(taskId, userId) {
    try {
      const response = await taskApiClient.assignTaskToUser(taskId, userId);
      return {
        data: taskDataAdapter.transformTask(response.data)
      };
    } catch (error) {
      taskErrorHandler.handleAssignTaskError(error, taskId, userId);
      throw error;
    }
  }

  /**
   * Update task status
   *
   * @param {string|number} taskId - Task ID
   * @param {string} status - New status
   * @returns {Promise} Promise with updated task
   */
  async updateTaskStatus(taskId, status) {
    try {
      const response = await taskApiClient.updateTaskStatus(taskId, status);
      return {
        data: taskDataAdapter.transformTask(response.data)
      };
    } catch (error) {
      taskErrorHandler.handleUpdateTaskStatusError(error, taskId, status);
      throw error;
    }
  }

  /**
   * Get task hierarchy
   *
   * @returns {Promise} Promise with hierarchical task structure
   */
  async getAllTasksWithHierarchy() {
    try {
      const response = await taskApiClient.getAllTasksWithHierarchy();
      return {
        data: taskDataAdapter.transformTasks(response.data)
      };
    } catch (error) {
      taskErrorHandler.handleGetTaskHierarchyError(error);
      throw error;
    }
  }
}

// Export the actual instance
export default new TaskService();

// Export function wrappers for backward compatibility
export const fetchTasks = (filter, pageable) =>
  new TaskService().fetchTasks(filter, pageable);

export const getTaskById = (id) =>
  new TaskService().getTaskById(id);

export const createTask = (taskData) =>
  new TaskService().createTask(taskData);

export const updateTask = (id, taskData) =>
  new TaskService().updateTask(id, taskData);

export const deleteTask = (id) =>
  new TaskService().deleteTask(id);

export const getMyTasks = (pageable) =>
  new TaskService().getMyTasks(pageable);

export const getTasksByAssignedUser = (userId, pageable) =>
  new TaskService().getTasksByAssignedUser(userId, pageable);

export const getTasksByTeam = (teamId, pageable) =>
  new TaskService().getTasksByTeam(teamId, pageable);

export const getTasksByStatus = (status, pageable) =>
  new TaskService().getTasksByStatus(status, pageable);

export const getOverdueTasks = (pageable) =>
  new TaskService().getOverdueTasks(pageable);

export const getTasksDueToday = (pageable) =>
  new TaskService().getTasksDueToday(pageable);

export const getUnassignedTasks = (pageable) =>
  new TaskService().getUnassignedTasks(pageable);

export const getSubtasks = (parentTaskId) =>
  new TaskService().getSubtasks(parentTaskId);

export const assignTaskToUser = (taskId, userId) =>
  new TaskService().assignTaskToUser(taskId, userId);

export const updateTaskStatus = (taskId, status) =>
  new TaskService().updateTaskStatus(taskId, status);

export const getAllTasksWithHierarchy = () =>
  new TaskService().getAllTasksWithHierarchy();

// Placeholder function for stats - returning empty data to avoid errors
export const getTaskStats = async () => {
  return {
    data: {
      total: 0,
      completed: 0,
      overdue: 0,
      dueToday: 0,
      unassigned: 0
    }
  };
};