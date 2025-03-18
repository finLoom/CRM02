// File: packages/frontend/src/modules/tasks/services/TaskService.js
import api from '../../../services/api/apiClient';
import { showError } from '../../../services/notifications/notificationService';

// Base API path for tasks - note: api base URL is configured in apiClient.js
const API_URL = '/api/tasks';

// Flag to toggle mock mode for development
const USE_MOCK = false; // Set to false as requested

// Mock tasks data for development
const MOCK_TASKS = [
  {
    id: 1,
    title: "Complete quarterly sales report",
    description: "Analyze Q1 sales data and prepare a report for management",
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    priority: "HIGH",
    status: "IN_PROGRESS",
    assignedTo: { id: 1, name: "John Doe" },
    completionPercentage: 60
  },
  {
    id: 2,
    title: "Follow up with client X",
    description: "Send email regarding their recent inquiry about our premium plan",
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    priority: "MEDIUM",
    status: "NOT_STARTED",
    assignedTo: { id: 1, name: "John Doe" },
    completionPercentage: 0
  },
  {
    id: 3,
    title: "Review marketing campaign results",
    description: "Analyze the performance metrics of our last email campaign",
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    priority: "LOW",
    status: "COMPLETED",
    assignedTo: { id: 2, name: "Jane Smith" },
    completionPercentage: 100
  },
  {
    id: 4,
    title: "Update customer onboarding document",
    description: "Revise the onboarding process to include new feature tutorials",
    dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    priority: "MEDIUM",
    status: "NOT_STARTED",
    assignedTo: null,
    completionPercentage: 0
  },
  {
    id: 5,
    title: "Fix critical bug in reporting module",
    description: "Address issue causing incorrect data in monthly reports",
    dueDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    priority: "CRITICAL",
    status: "IN_PROGRESS",
    assignedTo: { id: 3, name: "Bob Johnson" },
    completionPercentage: 30
  }
];

// Compute mock task statistics dynamically
const calculateMockStats = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return {
    total: MOCK_TASKS.length,
    completed: MOCK_TASKS.filter(t => t.status === "COMPLETED").length,
    overdue: MOCK_TASKS.filter(t =>
      new Date(t.dueDate) < now && t.status !== "COMPLETED").length,
    dueToday: MOCK_TASKS.filter(t => {
      const dueDate = new Date(t.dueDate);
      return dueDate >= today && dueDate < tomorrow;
    }).length,
    unassigned: MOCK_TASKS.filter(t => t.assignedTo === null).length
  };
};

// Helper function to filter mock tasks based on criteria
const filterMockTasks = (filter = {}) => {
  let filteredTasks = [...MOCK_TASKS];

  // Filter by status
  if (filter.status && filter.status.length > 0) {
    filteredTasks = filteredTasks.filter(task =>
      filter.status.includes(task.status));
  }

  // Filter by priority
  if (filter.priority && filter.priority.length > 0) {
    filteredTasks = filteredTasks.filter(task =>
      filter.priority.includes(task.priority));
  }

  // Filter by start date
  if (filter.startDate) {
    const startDate = new Date(filter.startDate);
    filteredTasks = filteredTasks.filter(task =>
      new Date(task.dueDate) >= startDate);
  }

  // Filter by end date
  if (filter.endDate) {
    const endDate = new Date(filter.endDate);
    filteredTasks = filteredTasks.filter(task =>
      new Date(task.dueDate) <= endDate);
  }

  // Filter by assignee
  if (filter.assigneeId !== undefined) {
    if (filter.assigneeId === 'unassigned' || filter.assigneeId === null) {
      filteredTasks = filteredTasks.filter(task => task.assignedTo === null);
    } else if (filter.assigneeId === 'currentUserId') {
      // For mock data, assume currentUserId is 1
      filteredTasks = filteredTasks.filter(task =>
        task.assignedTo && task.assignedTo.id === 1);
    } else {
      filteredTasks = filteredTasks.filter(task =>
        task.assignedTo && task.assignedTo.id === filter.assigneeId);
    }
  }

  // Include/exclude completed tasks
  if (filter.includeCompleted === false) {
    filteredTasks = filteredTasks.filter(task => task.status !== 'COMPLETED');
  }

  // Filter by search query
  if (filter.search) {
    const query = filter.search.toLowerCase();
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(query) ||
      (task.description && task.description.toLowerCase().includes(query)));
  }

  return filteredTasks;
};

/**
 * Fetch tasks with optional filtering
 *
 * @param {Object} filter - Task filter criteria
 * @param {Object} pageable - Pagination parameters
 * @returns {Promise} - Promise that resolves to the API response
 */
export const fetchTasks = async (filter = {}, pageable = { page: 0, size: 20 }) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredTasks = filterMockTasks(filter);
        const start = pageable.page * pageable.size;
        const end = start + pageable.size;
        const paginatedTasks = filteredTasks.slice(start, end);

        resolve({
          data: paginatedTasks,
          meta: {
            totalElements: filteredTasks.length,
            totalPages: Math.ceil(filteredTasks.length / pageable.size),
            size: pageable.size,
            page: pageable.page
          }
        });
      }, 300);
    });
  }

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
  // Always use mock stats to avoid calling the backend /stats endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      // Calculate mock stats dynamically
      resolve({ data: calculateMockStats() });
    }, 300);
  });
};

/**
 * Get a task by ID
 *
 * @param {number|string} id - Task ID
 * @returns {Promise} - Promise that resolves to the API response
 */
export const getTaskById = async (id) => {
  if (USE_MOCK) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const task = MOCK_TASKS.find(t => t.id === parseInt(id));
        if (task) {
          resolve({ data: task });
        } else {
          reject({ message: 'Task not found' });
        }
      }, 300);
    });
  }

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
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = {
          ...taskData,
          id: Math.max(...MOCK_TASKS.map(t => t.id)) + 1,
          completionPercentage: 0
        };
        MOCK_TASKS.push(newTask);
        resolve({ data: newTask });
      }, 300);
    });
  }

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
  if (USE_MOCK) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = MOCK_TASKS.findIndex(t => t.id === parseInt(id));
        if (index !== -1) {
          MOCK_TASKS[index] = { ...MOCK_TASKS[index], ...taskData };
          resolve({ data: MOCK_TASKS[index] });
        } else {
          reject({ message: 'Task not found' });
        }
      }, 300);
    });
  }

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
  if (USE_MOCK) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = MOCK_TASKS.findIndex(t => t.id === parseInt(id));
        if (index !== -1) {
          const deletedTask = MOCK_TASKS.splice(index, 1)[0];
          resolve({ data: deletedTask });
        } else {
          reject({ message: 'Task not found' });
        }
      }, 300);
    });
  }

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
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // For mock data, assume currentUserId is 1
        const myTasks = MOCK_TASKS.filter(t => t.assignedTo && t.assignedTo.id === 1);
        const start = pageable.page * pageable.size;
        const end = start + pageable.size;
        const paginatedTasks = myTasks.slice(start, end);

        resolve({
          data: paginatedTasks,
          meta: {
            totalElements: myTasks.length,
            totalPages: Math.ceil(myTasks.length / pageable.size),
            size: pageable.size,
            page: pageable.page
          }
        });
      }, 300);
    });
  }

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
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userTasks = MOCK_TASKS.filter(t =>
          t.assignedTo && t.assignedTo.id === parseInt(userId));
        const start = pageable.page * pageable.size;
        const end = start + pageable.size;
        const paginatedTasks = userTasks.slice(start, end);

        resolve({
          data: paginatedTasks,
          meta: {
            totalElements: userTasks.length,
            totalPages: Math.ceil(userTasks.length / pageable.size),
            size: pageable.size,
            page: pageable.page
          }
        });
      }, 300);
    });
  }

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
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // For mock data, just return all tasks
        const start = pageable.page * pageable.size;
        const end = start + pageable.size;
        const paginatedTasks = MOCK_TASKS.slice(start, end);

        resolve({
          data: paginatedTasks,
          meta: {
            totalElements: MOCK_TASKS.length,
            totalPages: Math.ceil(MOCK_TASKS.length / pageable.size),
            size: pageable.size,
            page: pageable.page
          }
        });
      }, 300);
    });
  }

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
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const statusTasks = MOCK_TASKS.filter(t => t.status === status);
        const start = pageable.page * pageable.size;
        const end = start + pageable.size;
        const paginatedTasks = statusTasks.slice(start, end);

        resolve({
          data: paginatedTasks,
          meta: {
            totalElements: statusTasks.length,
            totalPages: Math.ceil(statusTasks.length / pageable.size),
            size: pageable.size,
            page: pageable.page
          }
        });
      }, 300);
    });
  }

  try {
    return await api.get(`${API_URL}/status/${status}`, { params: pageable });
  } catch (error) {
    showError('Failed to fetch tasks by status. Please try again later.');
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
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date();
        const overdueTasks = MOCK_TASKS.filter(t =>
          new Date(t.dueDate) < now && t.status !== 'COMPLETED');
        const start = pageable.page * pageable.size;
        const end = start + pageable.size;
        const paginatedTasks = overdueTasks.slice(start, end);

        resolve({
          data: paginatedTasks,
          meta: {
            totalElements: overdueTasks.length,
            totalPages: Math.ceil(overdueTasks.length / pageable.size),
            size: pageable.size,
            page: pageable.page
          }
        });
      }, 300);
    });
  }

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
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const today = new Date();
        const dueTodayTasks = MOCK_TASKS.filter(t => {
          const dueDate = new Date(t.dueDate);
          return dueDate.getDate() === today.getDate() &&
                 dueDate.getMonth() === today.getMonth() &&
                 dueDate.getFullYear() === today.getFullYear();
        });
        const start = pageable.page * pageable.size;
        const end = start + pageable.size;
        const paginatedTasks = dueTodayTasks.slice(start, end);

        resolve({
          data: paginatedTasks,
          meta: {
            totalElements: dueTodayTasks.length,
            totalPages: Math.ceil(dueTodayTasks.length / pageable.size),
            size: pageable.size,
            page: pageable.page
          }
        });
      }, 300);
    });
  }

  try {
    return await api.get(`${API_URL}/due-today`, { params: pageable });
  } catch (error) {
    showError('Failed to fetch today\'s tasks. Please try again later.');
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
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const unassignedTasks = MOCK_TASKS.filter(t => t.assignedTo === null);
        const start = pageable.page * pageable.size;
        const end = start + pageable.size;
        const paginatedTasks = unassignedTasks.slice(start, end);

        resolve({
          data: paginatedTasks,
          meta: {
            totalElements: unassignedTasks.length,
            totalPages: Math.ceil(unassignedTasks.length / pageable.size),
            size: pageable.size,
            page: pageable.page
          }
        });
      }, 300);
    });
  }

  try {
    return await api.get(`${API_URL}/unassigned`, { params: pageable });
  } catch (error) {
    showError('Failed to fetch unassigned tasks. Please try again later.');
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
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const subtasks = MOCK_TASKS.filter(t =>
          t.parentTaskId === parseInt(parentTaskId));
        resolve({ data: subtasks });
      }, 300);
    });
  }

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
  if (USE_MOCK) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const taskIndex = MOCK_TASKS.findIndex(t => t.id === parseInt(taskId));
        if (taskIndex !== -1) {
          // For mock purposes, just assign to a user by ID
          MOCK_TASKS[taskIndex].assignedTo = { id: parseInt(userId), name: "Mock User" };
          resolve({ data: MOCK_TASKS[taskIndex] });
        } else {
          reject({ message: 'Task not found' });
        }
      }, 300);
    });
  }

  try {
    return await api.put(`${API_URL}/${taskId}/assign-to-user/${userId}`);
  } catch (error) {
    showError('Failed to assign task to user. Please try again later.');
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
  if (USE_MOCK) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const taskIndex = MOCK_TASKS.findIndex(t => t.id === parseInt(taskId));
        if (taskIndex !== -1) {
          MOCK_TASKS[taskIndex].status = status;
          // If completed, set completion percentage to 100
          if (status === 'COMPLETED') {
            MOCK_TASKS[taskIndex].completionPercentage = 100;
          }
          resolve({ data: MOCK_TASKS[taskIndex] });
        } else {
          reject({ message: 'Task not found' });
        }
      }, 300);
    });
  }

  try {
    return await api.put(`${API_URL}/${taskId}/status/${status}`);
  } catch (error) {
    showError('Failed to update task status. Please try again later.');
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
  getOverdueTasks,
  getTasksDueToday,
  getUnassignedTasks,
  getSubtasks,
  assignTaskToUser,
  updateTaskStatus,
  getTaskStats
};