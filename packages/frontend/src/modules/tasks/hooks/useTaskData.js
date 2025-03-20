import { useState, useEffect, useCallback } from 'react';
import TaskService from '../services/TaskService';

/**
 * Custom hook for fetching and managing task data
 * 
 * @param {Object} options - Hook options
 * @param {number} options.taskId - Task ID to fetch (optional)
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
  
  // State for pagination metadata
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
   */
  const loadTask = useCallback(async (id) => {
    if (!id) {
      setError(new Error('Task ID is required'));
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await TaskService.getTaskById(id);
      setTask(data);
      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Load tasks with filtering and pagination
   */
  const loadTasks = useCallback(async (taskFilter = currentFilter, taskPageable = currentPageable) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await TaskService.fetchTasks(taskFilter, taskPageable);
      
      // Extract tasks and pagination metadata from the API response
      const tasksData = response.content || [];
      const metaData = {
        totalElements: response.totalElements || 0,
        totalPages: response.totalPages || 1,
        page: response.number || taskPageable.page,
        size: response.size || taskPageable.size,
        first: response.first,
        last: response.last,
        empty: response.empty
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
   */
  const loadSubtasks = useCallback(async (parentId) => {
    if (!parentId) return [];
    
    setLoading(true);
    
    try {
      const subtasksData = await TaskService.getSubtasks(parentId);
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
   */
  const createTask = useCallback(async (taskData) => {
    setLoading(true);
    setError(null);
    
    try {
      const createdTask = await TaskService.createTask(taskData);
      
      // Refresh tasks list if this isn't a subtask
      if (!taskData.parentTaskId) {
        loadTasks(currentFilter, currentPageable);
      } 
      // If it's a subtask and we have the parent loaded, update subtasks
      else if (task && task.id === taskData.parentTaskId) {
        loadSubtasks(taskData.parentTaskId);
      }
      
      return createdTask;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentFilter, currentPageable, loadTasks, loadSubtasks, task]);
  
  /**
   * Update an existing task
   */
  const updateTask = useCallback(async (id, taskData) => {
    if (!id) {
      setError(new Error('Task ID is required for update'));
      throw new Error('Task ID is required for update');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const updatedTask = await TaskService.updateTask(id, taskData);
      
      // Update local state if this is the currently loaded task
      if (task && task.id === id) {
        setTask(updatedTask);
      }
      
      // Update in tasks list if present
      setTasks(prevTasks => 
        prevTasks.map(t => t.id === id ? updatedTask : t)
      );
      
      // Update in subtasks list if present
      setSubtasks(prevSubtasks => 
        prevSubtasks.map(t => t.id === id ? updatedTask : t)
      );
      
      return updatedTask;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [task]);
  
  /**
   * Delete a task
   */
  const deleteTask = useCallback(async (id) => {
    if (!id) {
      setError(new Error('Task ID is required for deletion'));
      throw new Error('Task ID is required for deletion');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await TaskService.deleteTask(id);
      
      // Remove from tasks list if present
      setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
      
      // Remove from subtasks list if present
      setSubtasks(prevSubtasks => prevSubtasks.filter(t => t.id !== id));
      
      // Clear task if this is the currently loaded task
      if (task && task.id === id) {
        setTask(null);
      }
      
      return true;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [task]);
  
  /**
   * Update task status
   */
  const updateTaskStatus = useCallback(async (id, status) => {
    if (!id || !status) {
      setError(new Error('Task ID and status are required'));
      throw new Error('Task ID and status are required');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const updatedTask = await TaskService.updateTaskStatus(id, status);
      
      // Update local state if this is the currently loaded task
      if (task && task.id === id) {
        setTask(updatedTask);
      }
      
      // Update in tasks list if present
      setTasks(prevTasks => 
        prevTasks.map(t => t.id === id ? updatedTask : t)
      );
      
      // Update in subtasks list if present
      setSubtasks(prevSubtasks => 
        prevSubtasks.map(t => t.id === id ? updatedTask : t)
      );
      
      return updatedTask;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [task]);
  
  /**
   * Change current page
   */
  const goToPage = useCallback((page) => {
    const newPageable = { ...currentPageable, page };
    setCurrentPageable(newPageable);
    loadTasks(currentFilter, newPageable);
  }, [currentFilter, currentPageable, loadTasks]);
  
  /**
   * Change page size
   */
  const setPageSize = useCallback((size) => {
    const newPageable = { ...currentPageable, size, page: 0 };
    setCurrentPageable(newPageable);
    loadTasks(currentFilter, newPageable);
  }, [currentFilter, currentPageable, loadTasks]);
  
  /**
   * Apply new filter
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
  }, [taskId, loadTask, loadTasks, filter, pageable, loadOnMount]);
  
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