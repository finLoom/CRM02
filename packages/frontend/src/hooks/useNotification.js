import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

/**
 * Custom hook for showing notifications in the application
 *
 * @returns {Object} Notification methods
 * @returns {Function} .showNotification - Shows a notification with type and options
 * @returns {Function} .showSuccess - Shows a success notification
 * @returns {Function} .showError - Shows an error notification
 * @returns {Function} .showWarning - Shows a warning notification
 * @returns {Function} .showInfo - Shows an info notification
 * @returns {Function} .clearNotifications - Clears all notifications
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    // Fallback if context is not available (for testing or if used outside provider)
    return {
      showNotification: (message, type = 'info', options = {}) => {
        console.log(`Notification (${type}): ${message}`);
      },
      showSuccess: (message, options = {}) => {
        console.log(`Success: ${message}`);
      },
      showError: (message, options = {}) => {
        console.error(`Error: ${message}`);
      },
      showWarning: (message, options = {}) => {
        console.warn(`Warning: ${message}`);
      },
      showInfo: (message, options = {}) => {
        console.info(`Info: ${message}`);
      },
      clearNotifications: () => {}
    };
  }

  return {
    showNotification: context.addNotification,
    showSuccess: (message, options = {}) => context.addNotification(message, 'success', options),
    showError: (message, options = {}) => context.addNotification(message, 'error', options),
    showWarning: (message, options = {}) => context.addNotification(message, 'warning', options),
    showInfo: (message, options = {}) => context.addNotification(message, 'info', options),
    clearNotifications: context.clearAllNotifications
  };
};

export default useNotification;