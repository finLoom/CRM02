/**
 * Hook for handling task actions
 */
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskService from '../services/TaskService';

/**
 * Custom hook that provides methods for task operations with standardized success/error handling
 * @param {function} onSuccess - Optional callback on successful operations
 * @param {function} onError - Optional callback on failed operations
 * @returns {Object} Task action methods
 */
const useTaskActions = (onSuccess, onError) => {
  const navigate = useNavigate();

  /**
   * Create a new task
   * @param {Object} taskData - New task data
   */
  const createTask = useCallback(async (taskData) => {
    try {
      const response = await TaskService.createTask(taskData);
      if (onSuccess) {
        onSuccess('Task created successfully', response);
      }
      return response;
    } catch (error) {
      if (onError) {
        onError('Failed to create task', error);
      }
      throw error;
    }
  }, [onSuccess, onError]);

  /**
   * Update an existing task
   * @param {string} taskId - Task ID
   * @param {Object} taskData - Updated task data
   */
  const updateTask = useCallback(async (taskId, taskData) => {
    try {
      const response = await TaskService.updateTask(taskId, taskData);
      if (onSuccess) {
        onSuccess('Task updated successfully', response);
      }
      return response;
    } catch (error) {
      if (onError) {
        onError('Failed to update task', error);
      }
      throw error;
    }
  }, [onSuccess, onError]);

  /**
   * Delete a task
   * @param {string} taskId - Task ID
   */
  const deleteTask = useCallback(async (taskId) => {
    try {
      await TaskService.deleteTask(taskId);
      if (onSuccess) {
        onSuccess('Task deleted successfully');
      }
      return true;
    } catch (error) {
      if (onError) {
        onError('Failed to delete task', error);
      }
      throw error;
    }
  }, [onSuccess, onError]);

  /**
   * Change task status
   * @param {string} taskId - Task ID
   * @param {string} status - New status
   */
  const changeStatus = useCallback(async (taskId, status) => {
    try {
      const response = await TaskService.updateTaskStatus(taskId, status);
      if (onSuccess) {
        onSuccess(`Task marked as ${status}`, response);
      }
      return response;
    } catch (error) {
      if (onError) {
        onError('Failed to update task status', error);
      }
      throw error;
    }
  }, [onSuccess, onError]);

  /**
   * Change task priority
   * @param {string} taskId - Task ID
   * @param {string} priority - New priority
   */
  const changePriority = useCallback(async (taskId, priority) => {
    try {
      const response = await TaskService.updateTask(taskId, { priority });
      if (onSuccess) {
        onSuccess(`Task priority set to ${priority}`, response);
      }
      return response;
    } catch (error) {
      if (onError) {
        onError('Failed to update task priority', error);
      }
      throw error;
    }
  }, [onSuccess, onError]);

  /**
   * Change task assignee
   * @param {string} taskId - Task ID
   * @param {string} assignedToId - Assignee user ID
   */
  const changeAssignee = useCallback(async (taskId, assignedToId) => {
    try {
      const response = await TaskService.updateTask(taskId, { assignedToId });
      if (onSuccess) {
        onSuccess('Task assignee updated', response);
      }
      return response;
    } catch (error) {
      if (onError) {
        onError('Failed to update task assignee', error);
      }
      throw error;
    }
  }, [onSuccess, onError]);

  /**
   * Create a subtask
   * @param {string} parentTaskId - Parent task ID
   * @param {Object} taskData - Subtask data
   */
  const createSubtask = useCallback(async (parentTaskId, taskData) => {
    try {
      const subtaskData = {
        ...taskData,
        parentTaskId
      };
      const response = await TaskService.createTask(subtaskData);
      if (onSuccess) {
        onSuccess('Subtask created successfully', response);
      }
      return response;
    } catch (error) {
      if (onError) {
        onError('Failed to create subtask', error);
      }
      throw error;
    }
  }, [onSuccess, onError]);

  /**
   * Navigate to task edit page
   * @param {string} taskId - Task ID
   */
  const navigateToEditTask = useCallback((taskId) => {
    navigate(`/tasks/${taskId}/edit`);
  }, [navigate]);

  /**
   * Navigate to task detail page
   * @param {string} taskId - Task ID
   */
  const navigateToTaskDetail = useCallback((taskId) => {
    navigate(`/tasks/${taskId}`);
  }, [navigate]);

  /**
   * Navigate to create task page (optionally for a subtask)
   * @param {string} parentTaskId - Optional parent task ID for creating a subtask
   */
  const navigateToCreateTask = useCallback((parentTaskId = null) => {
    if (parentTaskId) {
      navigate(`/tasks/new?parentId=${parentTaskId}`);
    } else {
      navigate('/tasks/new');
    }
  }, [navigate]);

  return {
    createTask,
    updateTask,
    deleteTask,
    changeStatus,
    changePriority,
    changeAssignee,
    createSubtask,
    navigateToEditTask,
    navigateToTaskDetail,
    navigateToCreateTask
  };
};

export default useTaskActions;