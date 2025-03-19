// File: packages/frontend/src/modules/tasks/services/TaskApiClient.js
import api from '../../../services/api/apiClient';

// Base API path for tasks
const API_URL = '/api/tasks';

/**
 * API client for task operations
 */
class TaskApiClient {
  /**
   * Fetch tasks with optional filtering
   *
   * @param {Object} filter - Filter criteria
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} API response
   */
  async fetchTasks(filter = {}, pageable = { page: 0, size: 20 }) {
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
  }

  /**
   * Get task by ID
   *
   * @param {string|number} id - Task ID
   * @returns {Promise} API response
   */
  async getTaskById(id) {
    return await api.get(`${API_URL}/${id}`);
  }

  /**
   * Create new task
   *
   * @param {Object} taskData - Task data
   * @returns {Promise} API response
   */
  async createTask(taskData) {
    return await api.post(API_URL, taskData);
  }

  /**
   * Update existing task
   *
   * @param {string|number} id - Task ID
   * @param {Object} taskData - Updated task data
   * @returns {Promise} API response
   */
  async updateTask(id, taskData) {
    return await api.put(`${API_URL}/${id}`, taskData);
  }

  /**
   * Delete task
   *
   * @param {string|number} id - Task ID
   * @returns {Promise} API response
   */
  async deleteTask(id) {
    return await api.delete(`${API_URL}/${id}`);
  }

  /**
   * Get tasks assigned to current user
   *
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} API response
   */
  async getMyTasks(pageable = { page: 0, size: 20 }) {
    return await api.get(`${API_URL}/my-tasks`, { params: pageable });
  }

  /**
   * Get tasks assigned to specific user
   *
   * @param {string|number} userId - User ID
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} API response
   */
  async getTasksByAssignedUser(userId, pageable = { page: 0, size: 20 }) {
    return await api.get(`${API_URL}/assigned-to/${userId}`, { params: pageable });
  }

  /**
   * Get tasks assigned to specific team
   *
   * @param {string|number} teamId - Team ID
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} API response
   */
  async getTasksByTeam(teamId, pageable = { page: 0, size: 20 }) {
    return await api.get(`${API_URL}/team/${teamId}`, { params: pageable });
  }

  /**
   * Get tasks by status
   *
   * @param {string} status - Task status
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} API response
   */
  async getTasksByStatus(status, pageable = { page: 0, size: 20 }) {
    return await api.get(`${API_URL}/status/${status}`, { params: pageable });
  }

  /**
   * Get overdue tasks
   *
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} API response
   */
  async getOverdueTasks(pageable = { page: 0, size: 20 }) {
    return await api.get(`${API_URL}/overdue`, { params: pageable });
  }

  /**
   * Get tasks due today
   *
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} API response
   */
  async getTasksDueToday(pageable = { page: 0, size: 20 }) {
    return await api.get(`${API_URL}/due-today`, { params: pageable });
  }

  /**
   * Get unassigned tasks
   *
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} API response
   */
  async getUnassignedTasks(pageable = { page: 0, size: 20 }) {
    return await api.get(`${API_URL}/unassigned`, { params: pageable });
  }

  /**
   * Get subtasks of a parent task
   *
   * @param {string|number} parentTaskId - Parent task ID
   * @returns {Promise} API response
   */
  async getSubtasks(parentTaskId) {
    return await api.get(`${API_URL}/${parentTaskId}/subtasks`);
  }

  /**
   * Assign task to user
   *
   * @param {string|number} taskId - Task ID
   * @param {string|number} userId - User ID
   * @returns {Promise} API response
   */
  async assignTaskToUser(taskId, userId) {
    return await api.put(`${API_URL}/${taskId}/assign-to-user/${userId}`);
  }

  /**
   * Update task status
   *
   * @param {string|number} taskId - Task ID
   * @param {string} status - New status
   * @returns {Promise} API response
   */
  async updateTaskStatus(taskId, status) {
    return await api.put(`${API_URL}/${taskId}/status/${status}`);
  }

  /**
   * Get task hierarchy
   *
   * @returns {Promise} API response
   */
  async getAllTasksWithHierarchy() {
    return await api.get(`${API_URL}/hierarchy`);
  }
}

export default new TaskApiClient();