// File: packages/frontend/src/modules/tasks/services/TaskService.js
import api from '../../../services/api/apiClient';
import { showError } from '../../../services/notifications/notificationService';

// Base API path for tasks
const API_URL = '/api/tasks';

/**
 * Fetch tasks with optional filtering
 *
 * @param {Object} filter - Task filter criteria
 * @param {Object} pageable - Pagination parameters
 * @returns {Promise} - Promise that resolves to the API response
 */
export const fetchTasks = async (filter = {}, pageable = { page: 0, size: 20 }) => {
  try {
    // Convert filter object to query parameters
    const params = {
      ...pageable
    };

    if (filter.status && filter.status.length > 0) {
      params.status = filter.status;
    }

    if (filter.priority && filter.priority.length > 0) {
      params.priority = filter.priority;
    }

    if (filter.startDate) {
      params.startDate = filter.startDate;
    }

    if (filter.endDate) {
      params.endDate = filter.endDate;
    }

    if (filter.assigneeId !== undefined) {
      params.assigneeId = filter.assigneeId === null ? 'unassigned' : filter.assigneeId;
    }

    if (filter.includeCompleted !== undefined) {
      params.includeCompleted = filter.includeCompleted;
    }

    if (filter.search) {
      params.query = filter.search;
    }

    return await api.get(API_URL, { params });
  } catch (error) {
    showError('Failed to fetch tasks. Please try again later.');
    throw error;
  }
};

/**
 * Get task statistics
 *
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getTaskStats = async () => {
  try {
    return await api.get(`${API_URL}/stats`);
  } catch (error) {
    showError('Failed to fetch task statistics. Please try again later.');
    throw error;
  }
};

/**
 * Get a task by ID
 *
 * @param {number|string} id - Task ID
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getTaskById = async (id) => {
  try {
    return await api.get(`${API_URL}/${id}`);
  } catch (error) {
    showError('Failed to fetch task details. Please try again later.');
    throw error;
  }
};

/**
 * Create a new task
 *
 * @param {Object} taskData - Task data
 * @returns {Promise} - Promise that resolves to the API response
 */
export const createTask = async (taskData) => {
  try {
    return await api.post(API_URL, taskData);
  } catch (error) {
    showError('Failed to create task. Please try again later.');
    throw error;
  }
};

/**
 * Update a task
 *
 * @param {number|string} id - Task ID
 * @param {Object} taskData - Updated task data
 * @returns {Promise} - Promise that resolves to the API response
 */
export const updateTask = async (id, taskData) => {
  try {
    return await api.put(`${API_URL}/${id}`, taskData);
  } catch (error) {
    showError('Failed to update task. Please try again later.');
    throw error;
  }
};

/**
 * Delete a task
 *
 * @param {number|string} id - Task ID
 * @returns {Promise} - Promise that resolves to the API response
 */
export const deleteTask = async (id) => {
  try {
    return await api.delete(`${API_URL}/${id}`);
  } catch (error) {
    showError('Failed to delete task. Please try again later.');
    throw error;
  }
};

/**
 * Get tasks assigned to the current user
 *
 * @param {Object} pageable - Pagination parameters
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getMyTasks = async (pageable = { page: 0, size: 20 }) => {
  try {
    return await api.get(`${API_URL}/my-tasks`, { params: pageable });
  } catch (error) {
    showError('Failed to fetch your tasks. Please try again later.');
    throw error;
  }
};

/**
 * Get tasks assigned to a specific user
 *
 * @param {number|string} userId - User ID
 * @param {Object} pageable - Pagination parameters
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getTasksByAssignedUser = async (userId, pageable = { page: 0, size: 20 }) => {
  try {
    return await api.get(`${API_URL}/assigned-to/${userId}`, { params: pageable });
  } catch (error) {
    showError('Failed to fetch user tasks. Please try again later.');
    throw error;
  }
};

/**
 * Get tasks assigned to a specific team
 *
 * @param {number|string} teamId - Team ID
 * @param {Object} pageable - Pagination parameters
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getTasksByTeam = async (teamId, pageable = { page: 0, size: 20 }) => {
  try {
    return await api.get(`${API_URL}/team/${teamId}`, { params: pageable });
  } catch (error) {
    showError('Failed to fetch team tasks. Please try again later.');
    throw error;
  }
};

/**
 * Get tasks by status
 *
 * @param {string} status - Task status
 * @param {Object} pageable - Pagination parameters
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getTasksByStatus = async (status, pageable = { page: 0, size: 20 }) => {
  try {
    return await api.get(`${API_URL}/status/${status}`, { params: pageable });
  } catch (error) {
    showError('Failed to fetch tasks by status. Please try again later.');
    throw error;
  }
};

/**
 * Get tasks by module
 *
 * @param {string} module - Module name
 * @param {Object} pageable - Pagination parameters
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getTasksByModule = async (module, pageable = { page: 0, size: 20 }) => {
  try {
    return await api.get(`${API_URL}/module/${module}`, { params: pageable });
  } catch (error) {
    showError('Failed to fetch tasks by module. Please try again later.');
    throw error;
  }
};

/**
 * Get overdue tasks
 *
 * @param {Object} pageable - Pagination parameters
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getOverdueTasks = async (pageable = { page: 0, size: 20 }) => {
  try {
    return await api.get(`${API_URL}/overdue`, { params: pageable });
  } catch (error) {
    showError('Failed to fetch overdue tasks. Please try again later.');
    throw error;
  }
};

/**
 * Get tasks due today
 *
 * @param {Object} pageable - Pagination parameters
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getTasksDueToday = async (pageable = { page: 0, size: 20 }) => {
  try {
    return await api.get(`${API_URL}/due-today`, { params: pageable });
  } catch (error) {
    showError('Failed to fetch today\'s tasks. Please try again later.');
    throw error;
  }
};

/**
 * Get upcoming tasks within a date range
 *
 * @param {Date} start - Start date
 * @param {Date} end - End date
 * @param {Object} pageable - Pagination parameters
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getUpcomingTasks = async (start, end, pageable = { page: 0, size: 20 }) => {
  try {
    return await api.get(`${API_URL}/upcoming`, {
      params: {
        start: start.toISOString(),
        end: end.toISOString(),
        ...pageable
      }
    });
  } catch (error) {
    showError('Failed to fetch upcoming tasks. Please try again later.');
    throw error;
  }
};

/**
 * Get tasks related to a specific object
 *
 * @param {string} objectType - Object type
 * @param {number|string} objectId - Object ID
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getTasksByRelatedObject = async (objectType, objectId) => {
  try {
    return await api.get(`${API_URL}/related/${objectType}/${objectId}`);
  } catch (error) {
    showError('Failed to fetch related tasks. Please try again later.');
    throw error;
  }
};

/**
 * Get subtasks of a parent task
 *
 * @param {number|string} parentTaskId - Parent task ID
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getSubtasks = async (parentTaskId) => {
  try {
    return await api.get(`${API_URL}/${parentTaskId}/subtasks`);
  } catch (error) {
    showError('Failed to fetch subtasks. Please try again later.');
    throw error;
  }
};

/**
 * Assign a task to a user
 *
 * @param {number|string} taskId - Task ID
 * @param {number|string} userId - User ID
 * @returns {Promise} - Promise that resolves to the API response
 */
export const assignTaskToUser = async (taskId, userId) => {
  try {
    return await api.put(`${API_URL}/${taskId}/assign-to-user/${userId}`);
  } catch (error) {
    showError('Failed to assign task to user. Please try again later.');
    throw error;
  }
};

/**
 * Assign a task to a team
 *
 * @param {number|string} taskId - Task ID
 * @param {number|string} teamId - Team ID
 * @returns {Promise} - Promise that resolves to the API response
 */
export const assignTaskToTeam = async (taskId, teamId) => {
  try {
    return await api.put(`${API_URL}/${taskId}/assign-to-team/${teamId}`);
  } catch (error) {
    showError('Failed to assign task to team. Please try again later.');
    throw error;
  }
};

/**
 * Update the status of a task
 *
 * @param {number|string} taskId - Task ID
 * @param {string} status - New status
 * @returns {Promise} - Promise that resolves to the API response
 */
export const updateTaskStatus = async (taskId, status) => {
  try {
    return await api.put(`${API_URL}/${taskId}/status/${status}`);
  } catch (error) {
    showError('Failed to update task status. Please try again later.');
    throw error;
  }
};

/**
 * Update the completion percentage of a task
 *
 * @param {number|string} taskId - Task ID
 * @param {number} percentage - Completion percentage
 * @returns {Promise} - Promise that resolves to the API response
 */
export const updateTaskCompletion = async (taskId, percentage) => {
  try {
    return await api.put(`${API_URL}/${taskId}/completion/${percentage}`);
  } catch (error) {
    showError('Failed to update task completion. Please try again later.');
    throw error;
  }
};

/**
 * Add a related object to a task
 *
 * @param {number|string} taskId - Task ID
 * @param {string} objectType - Object type
 * @param {number|string} objectId - Object ID
 * @param {string} relationshipType - Relationship type
 * @returns {Promise} - Promise that resolves to the API response
 */
export const addRelatedObjectToTask = async (taskId, objectType, objectId, relationshipType) => {
  try {
    return await api.post(`${API_URL}/${taskId}/related-objects`, null, {
      params: {
        objectType,
        objectId,
        relationshipType
      }
    });
  } catch (error) {
    showError('Failed to add related object to task. Please try again later.');
    throw error;
  }
};

/**
 * Remove a related object from a task
 *
 * @param {number|string} taskId - Task ID
 * @param {number|string} relatedObjectId - Related object ID
 * @returns {Promise} - Promise that resolves to the API response
 */
export const removeRelatedObjectFromTask = async (taskId, relatedObjectId) => {
  try {
    return await api.delete(`${API_URL}/${taskId}/related-objects/${relatedObjectId}`);
  } catch (error) {
    showError('Failed to remove related object from task. Please try again later.');
    throw error;
  }
};

/**
 * Get unassigned tasks
 *
 * @param {Object} pageable - Pagination parameters
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getUnassignedTasks = async (pageable = { page: 0, size: 20 }) => {
  try {
    return await api.get(`${API_URL}/unassigned`, { params: pageable });
  } catch (error) {
    showError('Failed to fetch unassigned tasks. Please try again later.');
    throw error;
  }
};

/**
 * Search tasks
 *
 * @param {string} query - Search query
 * @param {Object} pageable - Pagination parameters
 * @returns {Promise} - Promise that resolves to the API response
 */
export const searchTasks = async (query, pageable = { page: 0, size: 20 }) => {
  try {
    return await api.get(`${API_URL}/search`, {
      params: {
        query,
        ...pageable
      }
    });
  } catch (error) {
    showError('Failed to search tasks. Please try again later.');
    throw error;
  }
};

// Export the entire service for backward compatibility
export default {
  fetchTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getMyTasks,
  getTasksByAssignedUser,
  getTasksByTeam,
  getTasksByStatus,
  getTasksByModule,
  getOverdueTasks,
  getTasksDueToday,
  getUpcomingTasks,
  getTasksByRelatedObject,
  getSubtasks,
  assignTaskToUser,
  assignTaskToTeam,
  updateTaskStatus,
  updateTaskCompletion,
  addRelatedObjectToTask,
  removeRelatedObjectFromTask,
  getUnassignedTasks,
  searchTasks,
  getTaskStats
};

