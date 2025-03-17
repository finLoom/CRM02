import { showNotification } from '../notifications/notificationService';

/**
 * Error severity levels
 */
export const ErrorSeverity = {
  CRITICAL: 'critical',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Configuration settings
const config = {
  enableConsoleLogging: process.env.NODE_ENV !== 'production',
  enableUserNotifications: true,
  enableRemoteLogging: process.env.NODE_ENV === 'production',
  remoteLoggingEndpoint: process.env.REACT_APP_ERROR_LOGGING_ENDPOINT || '/api/logs/error',
};

/**
 * Log an error to the appropriate channels
 *
 * @param {Error|string} error - The error object or message
 * @param {Object} options - Additional logging options
 * @param {string} options.severity - Error severity level
 * @param {Object} options.metadata - Additional error context
 * @param {boolean} options.notify - Whether to show a user notification
 */
export const logError = (error, options = {}) => {
  const {
    severity = ErrorSeverity.ERROR,
    metadata = {},
    notify = config.enableUserNotifications,
  } = options;

  // Format error object
  const errorObject = {
    message: error instanceof Error ? error.message : error,
    stack: error instanceof Error ? error.stack : null,
    timestamp: new Date().toISOString(),
    severity,
    metadata: {
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...metadata,
    },
  };

  // Log to console in development
  if (config.enableConsoleLogging) {
    console.group('Application Error');
    console.error('Error:', errorObject.message);

    if (errorObject.stack) {
      console.error('Stack:', errorObject.stack);
    }

    console.info('Metadata:', errorObject.metadata);
    console.groupEnd();
  }

  // Show notification to user if enabled
  if (notify) {
    const notificationType = severity === ErrorSeverity.WARNING ? 'warning' : 'error';
    showNotification(
      typeof error === 'string' ? error : `An error occurred: ${error.message}`,
      notificationType
    );
  }

  // Send to remote logging service in production
  if (config.enableRemoteLogging) {
    sendToRemoteLoggingService(errorObject);
  }

  return errorObject;
};

/**
 * Log a component error from an error boundary
 *
 * @param {Error} error - The error that occurred
 * @param {Object} errorInfo - React error info object with component stack
 */
export const logComponentError = (error, errorInfo) => {
  logError(error, {
    severity: ErrorSeverity.ERROR,
    metadata: {
      componentStack: errorInfo?.componentStack || 'No component stack available',
      reactVersion: React.version,
    },
  });
};

/**
 * Send error data to a remote logging service
 *
 * @param {Object} errorData - Formatted error data to send
 */
const sendToRemoteLoggingService = async (errorData) => {
  try {
    // This would typically be an API call to your logging service
    const response = await fetch(config.remoteLoggingEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorData),
    });

    if (!response.ok) {
      // Don't use logError here to avoid potential infinite loops
      console.error('Failed to send error to logging service:', response.statusText);
    }
  } catch (err) {
    // Don't use logError here to avoid potential infinite loops
    console.error('Error sending to logging service:', err);
  }
};

export default {
  logError,
  logComponentError,
  ErrorSeverity,
};