/**
 * Notification service for displaying application messages
 * Provides a centralized way to show toast notifications and alerts
 */

// Internal store for multiple notification systems
let notificationHandlers = {
  toast: null,
  alert: null
};

/**
 * Register a notification handler
 *
 * @param {string} type - Type of notification handler (toast, alert)
 * @param {Function} handler - The handler function
 */
export const registerNotificationHandler = (type, handler) => {
  notificationHandlers[type] = handler;
};

/**
 * Unregister a notification handler
 *
 * @param {string} type - Type of notification handler to remove
 */
export const unregisterNotificationHandler = (type) => {
  notificationHandlers[type] = null;
};

/**
 * Show a notification
 *
 * @param {string} message - Notification message
 * @param {string} type - Notification type (info, success, warning, error)
 * @param {Object} options - Additional options (duration, action, etc)
 */
export const showNotification = (message, type = 'info', options = {}) => {
  // Default options
  const defaultOptions = {
    duration: 5000, // 5 seconds
    action: null,
    onClose: null
  };

  // Merge options
  const mergedOptions = { ...defaultOptions, ...options };

  // Try to use toast handler first (for non-critical notifications)
  if (notificationHandlers.toast) {
    notificationHandlers.toast(message, type, mergedOptions);
    return;
  }

  // Fall back to alert handler if no toast handler
  if (notificationHandlers.alert) {
    notificationHandlers.alert(message, type, mergedOptions);
    return;
  }

  // Fall back to console if no handlers are registered
  switch (type) {
    case 'error':
      console.error(message);
      break;
    case 'warning':
      console.warn(message);
      break;
    case 'success':
      console.log(`%c${message}`, 'color: green');
      break;
    default:
      console.log(message);
  }
};

/**
 * Show a success notification
 *
 * @param {string} message - Notification message
 * @param {Object} options - Additional options
 */
export const showSuccess = (message, options = {}) => {
  showNotification(message, 'success', options);
};

/**
 * Show an error notification
 *
 * @param {string} message - Notification message
 * @param {Object} options - Additional options
 */
export const showError = (message, options = {}) => {
  showNotification(message, 'error', options);
};

/**
 * Show a warning notification
 *
 * @param {string} message - Notification message
 * @param {Object} options - Additional options
 */
export const showWarning = (message, options = {}) => {
  showNotification(message, 'warning', options);
};

/**
 * Show an info notification
 *
 * @param {string} message - Notification message
 * @param {Object} options - Additional options
 */
export const showInfo = (message, options = {}) => {
  showNotification(message, 'info', options);
};

export default {
  registerNotificationHandler,
  unregisterNotificationHandler,
  showNotification,
  showSuccess,
  showError,
  showWarning,
  showInfo
};