import api from '../../../services/api/apiClient';

/**
 * TaskService
 * Service for managing tasks in the CRM
 */
class TaskService {
  /**
   * Get tasks with optional filtering
   * 
   * @param {Object} filters - Filter criteria
   * @param {number} page - Page number (0-based)
   * @param {number} size - Page size
   * @param {string} sort - Sort field and direction (e.g., "dueDate,desc")
   * @returns {Promise<Object>} - Paginated task data
   */
  async fetchTasks(filters = {}, pageable = { page: 0, size: 20, sort: '' }) {
    try {
      const params = { ...pageable };
      
      // Apply filters to params
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.module) params.module = filters.module;
      if (filters.assignedToId) params.assignedToId = filters.assignedToId;
      if (filters.teamId) params.teamId = filters.teamId;
      if (filters.search) params.search = filters.search;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      if (filters.parentTaskId) params.parentTaskId = filters.parentTaskId;
      if (filters.showCompleted !== undefined) params.showCompleted = filters.showCompleted;
      
      const response = await api.get('/tasks', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  /**
   * Get a task by ID
   * 
   * @param {number} id - Task ID 
   * @returns {Promise<Object>} - Task data
   */
  async getTaskById(id) {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new task
   * 
   * @param {Object} taskData - Task data 
   * @returns {Promise<Object>} - Created task
   */
  async createTask(taskData) {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  /**
   * Update an existing task
   * 
   * @param {number} id - Task ID 
   * @param {Object} taskData - Updated task data
   * @returns {Promise<Object>} - Updated task
   */
  async updateTask(id, taskData) {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a task
   * 
   * @param {number} id - Task ID
   * @returns {Promise<void>}
   */
  async deleteTask(id) {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get subtasks for a parent task
   * 
   * @param {number} parentTaskId - Parent task ID
   * @returns {Promise<Array>} - List of subtasks
   */
  async getSubtasks(parentTaskId) {
    try {
      const response = await api.get('/tasks', {
        params: { parentTaskId }
      });
      return response.data.content || [];
    } catch (error) {
      console.error(`Error fetching subtasks for task ${parentTaskId}:`, error);
      throw error;
    }
  }

  /**
   * Update task status
   * 
   * @param {number} id - Task ID
   * @param {string} status - New task status
   * @returns {Promise<Object>} - Updated task
   */
  async updateTaskStatus(id, status) {
    try {
      const response = await api.patch(`/tasks/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id} status:`, error);
      throw error;
    }
  }

  /**
   * Update task priority
   * 
   * @param {number} id - Task ID
   * @param {string} priority - New task priority
   * @returns {Promise<Object>} - Updated task
   */
  async updateTaskPriority(id, priority) {
    try {
      const response = await api.patch(`/tasks/${id}/priority`, { priority });
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id} priority:`, error);
      throw error;
    }
  }

  /**
   * Get all available task modules
   * 
   * @returns {Promise<Array>} - List of module names
   */
  async getTaskModules() {
    try {
      const response = await api.get('/tasks/modules');
      return response.data;
    } catch (error) {
      console.error('Error fetching task modules:', error);
      // Return default modules in case of error
      return ['CRM', 'OPERATIONS', 'SALES', 'SUPPORT', 'MARKETING'];
    }
  }

  /**
   * Get task statistics
   * 
   * @returns {Promise<Object>} - Task statistics
   */
  async getTaskStats() {
    try {
      const response = await api.get('/tasks/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching task stats:', error);
      return {
        total: 0,
        completed: 0,
        inProgress: 0,
        notStarted: 0,
        overdue: 0
      };
    }
  }

  /**
   * Assign task to user
   * 
   * @param {number} taskId - Task ID
   * @param {number} userId - User ID
   * @returns {Promise<Object>} - Updated task
   */
  async assignTask(taskId, userId) {
    try {
      const response = await api.patch(`/tasks/${taskId}/assign`, { userId });
      return response.data;
    } catch (error) {
      console.error(`Error assigning task ${taskId}:`, error);
      throw error;
    }
  }
}

export default new TaskService();