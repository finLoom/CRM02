// File: packages/frontend/src/modules/tasks/hooks/useTaskData.js
import { useState, useEffect, useCallback } from 'react';
import TaskService from '../services/TaskService';

/**
 * Hook for fetching and managing task data
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.taskId - Task ID to fetch (optional)
 * @param {Object} options.filter - Initial filter criteria (optional)
 * @param {Object} options.pageable - Pagination parameters (optional)
 * @param {boolean} options.loadOnMount - Whether to load data on mount (default: true)
 * @returns {Object} Task data and operations
 */
const useTaskData = ({
  taskId = null,
  filter = {},
  pageable = { page: 0, size: 20 },
  loadOnMount = true
} = {}) => {
  // State for task data
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [subtasks, setSubtasks] = useState([]);

  // State for API operations
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({
    totalElements: 0,
    totalPages: 0,
    page: 0,
    size: 20
  });

  // State for filtering and pagination
  const [currentFilter, setCurrentFilter] = useState(filter);
  const [currentPageable, setCurrentPageable] = useState(pageable);

  /**
   * Load a single task by ID
   *
   * @param {string|number} id - Task ID to load
   * @returns {Promise<Object>} Task data
   */
  const loadTask = useCallback(async (id) => {
    if (!id) {
      setError(new Error('Task ID is required'));
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await TaskService.getTaskById(id);
      const taskData = response.data;
      setTask(taskData);
      return taskData;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load tasks with filter and pagination
   *
   * @param {Object} taskFilter - Filter criteria
   * @param {Object} taskPageable - Pagination parameters
   * @returns {Promise<Array>} Tasks array
   */
  const loadTasks = useCallback(async (taskFilter = currentFilter, taskPageable = currentPageable) => {
    setLoading(true);
    setError(null);

    try {
      const response = await TaskService.fetchTasks(taskFilter, taskPageable);
      const tasksData = response.data || [];
      const metaData = response.meta || {
        totalElements: tasksData.length,
        totalPages: 1,
        page: 0,
        size: taskPageable.size
      };

      setTasks(tasksData);
      setMeta(metaData);
      setCurrentFilter(taskFilter);
      setCurrentPageable(taskPageable);

      return tasksData;
    } catch (err) {
      setError(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [currentFilter, currentPageable]);

  /**
   * Load subtasks for a parent task
   *
   * @param {string|number} parentId - Parent task ID
   * @returns {Promise<Array>} Subtasks array
   */
  const loadSubtasks = useCallback(async (parentId) => {
    if (!parentId) return [];

    setLoading(true);

    try {
      const response = await TaskService.getSubtasks(parentId);
      const subtasksData = response.data || [];
      setSubtasks(subtasksData);
      return subtasksData;
    } catch (err) {
      console.error('Error loading subtasks:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new task
   *
   * @param {Object} taskData - Task data
   * @returns {Promise<Object>} Created task
   */
  const createTask = useCallback(async (taskData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await TaskService.createTask(taskData);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update an existing task
   *
   * @param {string|number} id - Task ID
   * @param {Object} taskData - Updated task data
   * @returns {Promise<Object>} Updated task
   */
  const updateTask = useCallback(async (id, taskData) => {
    if (!id) {
      setError(new Error('Task ID is required for update'));
      throw new Error('Task ID is required for update');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await TaskService.updateTask(id, taskData);

      // Update local state if this is the currently loaded task
      if (task && task.id === id) {
        setTask(response.data);
      }

      // Update in tasks list if present
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === id ? response.data : t)
      );

      // Update in subtasks list if present
      setSubtasks(prevSubtasks =>
        prevSubtasks.map(t => t.id === id ? response.data : t)
      );

      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [task]);

  /**
   * Delete a task
   *
   * @param {string|number} id - Task ID to delete
   * @returns {Promise<Object>} Deletion result
   */
  const deleteTask = useCallback(async (id) => {
    if (!id) {
      setError(new Error('Task ID is required for deletion'));
      throw new Error('Task ID is required for deletion');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await TaskService.deleteTask(id);

      // Remove from tasks list if present
      setTasks(prevTasks => prevTasks.filter(t => t.id !== id));

      // Remove from subtasks list if present
      setSubtasks(prevSubtasks => prevSubtasks.filter(t => t.id !== id));

      // Clear task if this is the currently loaded task
      if (task && task.id === id) {
        setTask(null);
      }

      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [task]);

  /**
   * Update task status
   *
   * @param {string|number} id - Task ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated task
   */
  const updateTaskStatus = useCallback(async (id, status) => {
    if (!id || !status) {
      setError(new Error('Task ID and status are required'));
      throw new Error('Task ID and status are required');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await TaskService.updateTaskStatus(id, status);

      // Update local state if this is the currently loaded task
      if (task && task.id === id) {
        setTask(response.data);
      }

      // Update in tasks list if present
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === id ? response.data : t)
      );

      // Update in subtasks list if present
      setSubtasks(prevSubtasks =>
        prevSubtasks.map(t => t.id === id ? response.data : t)
      );

      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [task]);

  /**
   * Change current page
   *
   * @param {number} page - Page number
   */
  const goToPage = useCallback((page) => {
    const newPageable = { ...currentPageable, page };
    setCurrentPageable(newPageable);
    loadTasks(currentFilter, newPageable);
  }, [currentFilter, currentPageable, loadTasks]);

  /**
   * Change page size
   *
   * @param {number} size - Page size
   */
  const setPageSize = useCallback((size) => {
    const newPageable = { ...currentPageable, size, page: 0 };
    setCurrentPageable(newPageable);
    loadTasks(currentFilter, newPageable);
  }, [currentFilter, currentPageable, loadTasks]);

  /**
   * Apply new filter
   *
   * @param {Object} newFilter - New filter criteria
   */
  const applyFilter = useCallback((newFilter) => {
    const newPageable = { ...currentPageable, page: 0 };
    setCurrentPageable(newPageable);
    setCurrentFilter(newFilter);
    loadTasks(newFilter, newPageable);
  }, [currentPageable, loadTasks]);

  // Load data on mount if requested
  useEffect(() => {
    if (loadOnMount) {
      if (taskId) {
        loadTask(taskId);
      } else {
        loadTasks(filter, pageable);
      }
    }
  }, [taskId, filter, pageable, loadOnMount, loadTask, loadTasks]);

  return {
    // Data
    task,
    tasks,
    subtasks,
    meta,
    loading,
    error,
    filter: currentFilter,
    pageable: currentPageable,

    // Operations
    loadTask,
    loadTasks,
    loadSubtasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,

    // Pagination helpers
    goToPage,
    setPageSize,
    applyFilter,

    // State setters
    setTask,
    setTasks,
    setSubtasks,
    setError
  };
};

export default useTaskData;