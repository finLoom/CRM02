// File: packages/frontend/src/modules/tasks/services/TaskService.js
import axios from 'axios'; // Direct import for consistent API access

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
    console.log('Fetching tasks with filter:', filter);
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

    // Use direct axios call for consistent behavior
    const response = await axios.get('http://localhost:8080/api/tasks', { params });
    console.log('Tasks response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
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
    console.log('Getting task by ID:', id);
    const response = await axios.get(`http://localhost:8080/api/tasks/${id}`);
    console.log('Task by ID response:', response.data);
    return { data: response.data };
  } catch (error) {
    console.error('Failed to fetch task details:', error);
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
    console.log('Creating task with data:', taskData);
    const response = await axios.post('http://localhost:8080/api/tasks', taskData);
    console.log('Task create response:', response.data);
    return { data: response.data };
  } catch (error) {
    console.error('Failed to create task:', error);
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
    console.log('Updating task:', id, taskData);
    const response = await axios.put(`http://localhost:8080/api/tasks/${id}`, taskData);
    console.log('Task update response:', response.data);
    return { data: response.data };
  } catch (error) {
    console.error('Failed to update task:', error);
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
    console.log('Deleting task:', id);
    const response = await axios.delete(`http://localhost:8080/api/tasks/${id}`);
    console.log('Task delete response:', response.data);
    return { data: response.data };
  } catch (error) {
    console.error('Failed to delete task:', error);
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
    console.log('Getting subtasks for parent:', parentTaskId);
    const response = await axios.get(`http://localhost:8080/api/tasks/${parentTaskId}/subtasks`);
    console.log('Subtasks response:', response.data);
    return { data: response.data };
  } catch (error) {
    console.error('Failed to fetch subtasks:', error);
    throw error;
  }
};

/**
 * Update task status
 *
 * @param {string|number} taskId - Task ID
 * @param {string} status - New status
 * @returns {Promise} - Promise that resolves to the API response
 */
export const updateTaskStatus = async (taskId, status) => {
  try {
    console.log('Updating task status:', taskId, status);
    const response = await axios.put(`http://localhost:8080/api/tasks/${taskId}/status/${status}`);
    console.log('Status update response:', response.data);
    return { data: response.data };
  } catch (error) {
    console.error('Failed to update task status:', error);
    throw error;
  }
};

/**
 * Placeholder function for stats - returning empty data
 *
 * @returns {Promise} Empty stats object
 */
export const getTaskStats = async () => {
  return {
    total: 0,
    completed: 0,
    overdue: 0,
    dueToday: 0,
    unassigned: 0
  };
};

// Export both individual functions and a default object
const TaskService = {
  fetchTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getSubtasks,
  updateTaskStatus,
  getTaskStats
};

export default TaskService;