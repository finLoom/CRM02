/**
 * Task validation utilities
 * Contains functions for validating task data
 */

/**
 * Validates required task fields
 * @param {Object} taskData - Task data to validate
 * @returns {Object} Validation result with isValid flag and errors object
 */
export const validateTaskRequired = (taskData) => {
  const errors = {};

  if (!taskData.title || taskData.title.trim() === '') {
    errors.title = 'Title is required';
  }

  if (taskData.title && taskData.title.length > 200) {
    errors.title = 'Title cannot exceed 200 characters';
  }

  if (taskData.description && taskData.description.length > 5000) {
    errors.description = 'Description cannot exceed 5000 characters';
  }

  // Validate due date is in the future if provided
  if (taskData.dueDate) {
    const dueDate = new Date(taskData.dueDate);
    const now = new Date();

    if (isNaN(dueDate.getTime())) {
      errors.dueDate = 'Invalid date format';
    } else if (dueDate < now && !taskData.id) {
      // Only enforce for new tasks (without an ID)
      errors.dueDate = 'Due date cannot be in the past';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates task status transitions
 * @param {string} currentStatus - Current task status
 * @param {string} newStatus - Proposed new status
 * @returns {Object} Validation result with isValid flag and error message
 */
export const validateStatusTransition = (currentStatus, newStatus) => {
  // Define allowed status transitions
  const allowedTransitions = {
    not_started: ['in_progress', 'deferred', 'canceled'],
    in_progress: ['completed', 'waiting', 'deferred', 'canceled', 'not_started'],
    waiting: ['in_progress', 'canceled', 'deferred'],
    deferred: ['not_started', 'in_progress', 'canceled'],
    completed: ['in_progress', 'not_started'],
    canceled: ['not_started']
  };

  // If statuses are the same, it's valid
  if (currentStatus === newStatus) {
    return { isValid: true };
  }

  // If current status isn't in our defined transitions, something is wrong
  if (!allowedTransitions[currentStatus]) {
    return {
      isValid: false,
      error: `Invalid current status: ${currentStatus}`
    };
  }

  // Check if the new status is allowed
  if (!allowedTransitions[currentStatus].includes(newStatus)) {
    return {
      isValid: false,
      error: `Cannot transition from "${currentStatus}" to "${newStatus}"`
    };
  }

  return { isValid: true };
};

/**
 * Validates task priority
 * @param {string} priority - Task priority
 * @returns {boolean} Whether the priority is valid
 */
export const validatePriority = (priority) => {
  const validPriorities = ['high', 'medium', 'low'];
  return validPriorities.includes(priority?.toLowerCase());
};

/**
 * Validates estimated hours
 * @param {number} hours - Estimated hours
 * @returns {Object} Validation result with isValid flag and error message
 */
export const validateEstimatedHours = (hours) => {
  if (hours === undefined || hours === null) {
    return { isValid: true };
  }

  if (isNaN(hours) || hours < 0) {
    return {
      isValid: false,
      error: 'Estimated hours must be a positive number'
    };
  }

  if (hours > 1000) {
    return {
      isValid: false,
      error: 'Estimated hours cannot exceed 1000'
    };
  }

  return { isValid: true };
};

/**
 * Complete task validation
 * @param {Object} taskData - Task data to validate
 * @returns {Object} Validation result with isValid flag and errors object
 */
export const validateTask = (taskData) => {
  // Start with required fields validation
  const requiredValidation = validateTaskRequired(taskData);

  if (!requiredValidation.isValid) {
    return requiredValidation;
  }

  const errors = { ...requiredValidation.errors };

  // Validate priority if provided
  if (taskData.priority && !validatePriority(taskData.priority)) {
    errors.priority = 'Invalid priority value';
  }

  // Validate estimated hours if provided
  if (taskData.estimatedHours !== undefined) {
    const hoursValidation = validateEstimatedHours(taskData.estimatedHours);
    if (!hoursValidation.isValid) {
      errors.estimatedHours = hoursValidation.error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};