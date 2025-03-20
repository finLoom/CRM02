/**
 * Task formatting utilities
 * Contains helpers for formatting task data for display
 */

import { format, formatDistance, parseISO, isValid } from 'date-fns';

/**
 * Format a date string to a human-readable format
 * @param {string} dateString - ISO date string
 * @param {string} formatString - date-fns format pattern (default: 'MMMM d, yyyy h:mm a')
 * @param {string} fallbackText - Text to show if date is invalid (default: 'Not set')
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, formatString = 'MMMM d, yyyy h:mm a', fallbackText = 'Not set') => {
  if (!dateString) return fallbackText;

  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return fallbackText;

    return format(date, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Format a date string as a relative time (e.g., "2 days ago")
 * @param {string} dateString - ISO date string
 * @param {boolean} addSuffix - Whether to add a suffix (default: true)
 * @returns {string} Relative time string or empty string if invalid
 */
export const formatRelativeDate = (dateString, addSuffix = true) => {
  if (!dateString) return '';

  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return '';

    return formatDistance(date, new Date(), { addSuffix });
  } catch (error) {
    return '';
  }
};

/**
 * Format a date with both absolute and relative time
 * @param {string} dateString - ISO date string
 * @param {string} formatString - date-fns format pattern
 * @param {string} fallbackText - Text to show if date is invalid
 * @returns {string} Combined date string
 */
export const formatDateWithRelative = (dateString, formatString, fallbackText = 'Not set') => {
  if (!dateString) return fallbackText;

  const formattedDate = formatDate(dateString, formatString, fallbackText);
  const relativeDate = formatRelativeDate(dateString);

  if (formattedDate === fallbackText || !relativeDate) {
    return formattedDate;
  }

  return `${formattedDate} (${relativeDate})`;
};

/**
 * Format compact date for lists
 * @param {string} dateString - ISO date string
 * @param {string} fallbackText - Text to show if date is invalid
 * @returns {string} Formatted date string
 */
export const formatListDate = (dateString, fallbackText = '-') => {
  return formatDate(dateString, 'MMM d, yyyy', fallbackText);
};

/**
 * Check if a task is overdue
 * @param {Object} task - Task object
 * @returns {boolean} Whether the task is overdue
 */
export const isTaskOverdue = (task) => {
  if (!task.dueDate || task.status === 'COMPLETED' || task.status === 'CANCELLED') {
    return false;
  }

  try {
    const dueDate = parseISO(task.dueDate);
    if (!isValid(dueDate)) return false;

    return dueDate < new Date();
  } catch (error) {
    return false;
  }
};

/**
 * Format hours to display with appropriate unit
 * @param {number} hours - Hours value
 * @returns {string} Formatted hours string
 */
export const formatHours = (hours) => {
  if (hours === undefined || hours === null) return '';

  return hours === 1 ? '1 hour' : `${hours} hours`;
};

/**
 * Format percentage for display
 * @param {number} percentage - Percentage value (0-100)
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (percentage) => {
  if (percentage === undefined || percentage === null) return '';

  return `${Math.round(percentage)}%`;
};