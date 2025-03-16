// File: frontend/src/services/TaskService.js
import axios from 'axios';

const API_URL = '/api/tasks';

/**
 * Service for task-related API calls.
 */
class TaskService {
  /**
   * Get all tasks with pagination.
   * 
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getAllTasks(pageable = { page: 0, size: 20 }) {
    return axios.get(API_URL, { params: pageable });
  }

  /**
   * Get a task by ID.
   * 
   * @param {number} id - Task ID
   * @returns {Promise} - Promise with response data
   */
  getTaskById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  /**
   * Create a new task.
   * 
   * @param {Object} taskData - Task data
   * @returns {Promise} - Promise with response data
   */
  createTask(taskData) {
    return axios.post(API_URL, taskData);
  }

  /**
   * Update a task.
   * 
   * @param {number} id - Task ID
   * @param {Object} taskData - Updated task data
   * @returns {Promise} - Promise with response data
   */
  updateTask(id, taskData) {
    return axios.put(`${API_URL}/${id}`, taskData);
  }

  /**
   * Delete a task.
   * 
   * @param {number} id - Task ID
   * @returns {Promise} - Promise with response data
   */
  deleteTask(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  /**
   * Get tasks assigned to the current user.
   * 
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getMyTasks(pageable = { page: 0, size: 20 }) {
    return axios.get(`${API_URL}/my-tasks`, { params: pageable });
  }

  /**
   * Get tasks assigned to a specific user.
   * 
   * @param {number} userId - User ID
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getTasksByAssignedUser(userId, pageable = { page: 0, size: 20 }) {
    return axios.get(`${API_URL}/assigned-to/${userId}`, { params: pageable });
  }

  /**
   * Get tasks assigned to a specific team.
   * 
   * @param {number} teamId - Team ID
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getTasksByTeam(teamId, pageable = { page: 0, size: 20 }) {
    return axios.get(`${API_URL}/team/${teamId}`, { params: pageable });
  }

  /**
   * Get tasks by status.
   * 
   * @param {string} status - Task status
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getTasksByStatus(status, pageable = { page: 0, size: 20 }) {
    return axios.get(`${API_URL}/status/${status}`, { params: pageable });
  }

  /**
   * Get tasks by module.
   * 
   * @param {string} module - Module name
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getTasksByModule(module, pageable = { page: 0, size: 20 }) {
    return axios.get(`${API_URL}/module/${module}`, { params: pageable });
  }

  /**
   * Get overdue tasks.
   * 
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getOverdueTasks(pageable = { page: 0, size: 20 }) {
    return axios.get(`${API_URL}/overdue`, { params: pageable });
  }

  /**
   * Get tasks due today.
   * 
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getTasksDueToday(pageable = { page: 0, size: 20 }) {
    return axios.get(`${API_URL}/due-today`, { params: pageable });
  }

  /**
   * Get upcoming tasks within a date range.
   * 
   * @param {Date} start - Start date
   * @param {Date} end - End date
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getUpcomingTasks(start, end, pageable = { page: 0, size: 20 }) {
    return axios.get(`${API_URL}/upcoming`, {
      params: {
        start: start.toISOString(),
        end: end.toISOString(),
        ...pageable
      }
    });
  }

  /**
   * Get tasks related to a specific object.
   * 
   * @param {string} objectType - Object type
   * @param {number} objectId - Object ID
   * @returns {Promise} - Promise with response data
   */
  getTasksByRelatedObject(objectType, objectId) {
    return axios.get(`${API_URL}/related/${objectType}/${objectId}`);
  }

  /**
   * Get subtasks of a parent task.
   * 
   * @param {number} parentTaskId - Parent task ID
   * @returns {Promise} - Promise with response data
   */
  getSubtasks(parentTaskId) {
    return axios.get(`${API_URL}/${parentTaskId}/subtasks`);
  }

  /**
   * Assign a task to a user.
   * 
   * @param {number} taskId - Task ID
   * @param {number} userId - User ID
   * @returns {Promise} - Promise with response data
   */
  assignTaskToUser(taskId, userId) {
    return axios.put(`${API_URL}/${taskId}/assign-to-user/${userId}`);
  }

  /**
   * Assign a task to a team.
   * 
   * @param {number} taskId - Task ID
   * @param {number} teamId - Team ID
   * @returns {Promise} - Promise with response data
   */
  assignTaskToTeam(taskId, teamId) {
    return axios.put(`${API_URL}/${taskId}/assign-to-team/${teamId}`);
  }

  /**
   * Update the status of a task.
   * 
   * @param {number} taskId - Task ID
   * @param {string} status - New status
   * @returns {Promise} - Promise with response data
   */
  updateTaskStatus(taskId, status) {
    return axios.put(`${API_URL}/${taskId}/status/${status}`);
  }

  /**
   * Update the completion percentage of a task.
   * 
   * @param {number} taskId - Task ID
   * @param {number} percentage - Completion percentage
   * @returns {Promise} - Promise with response data
   */
  updateTaskCompletion(taskId, percentage) {
    return axios.put(`${API_URL}/${taskId}/completion/${percentage}`);
  }

  /**
   * Add a related object to a task.
   * 
   * @param {number} taskId - Task ID
   * @param {string} objectType - Object type
   * @param {number} objectId - Object ID
   * @param {string} relationshipType - Relationship type
   * @returns {Promise} - Promise with response data
   */
  addRelatedObjectToTask(taskId, objectType, objectId, relationshipType) {
    return axios.post(`${API_URL}/${taskId}/related-objects`, null, {
      params: {
        objectType,
        objectId,
        relationshipType
      }
    });
  }

  /**
   * Remove a related object from a task.
   * 
   * @param {number} taskId - Task ID
   * @param {number} relatedObjectId - Related object ID
   * @returns {Promise} - Promise with response data
   */
  removeRelatedObjectFromTask(taskId, relatedObjectId) {
    return axios.delete(`${API_URL}/${taskId}/related-objects/${relatedObjectId}`);
  }

  /**
   * Get unassigned tasks.
   * 
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getUnassignedTasks(pageable = { page: 0, size: 20 }) {
    return axios.get(`${API_URL}/unassigned`, { params: pageable });
  }

  /**
   * Search tasks.
   * 
   * @param {string} query - Search query
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  searchTasks(query, pageable = { page: 0, size: 20 }) {
    return axios.get(`${API_URL}/search`, {
      params: {
        query,
        ...pageable
      }
    });
  }
}

export default new TaskService();