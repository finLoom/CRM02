import React, { createContext, useState, useCallback } from 'react';
import { makeStyles, tokens, shorthands } from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import { Dismiss20Regular } from '@fluentui/react-icons';

// Create the Notification Context
export const NotificationContext = createContext({
  showNotification: () => {},
  hideNotification: () => {},
  notifications: []
});

const useStyles = makeStyles({
  notificationsContainer: {
    position: 'fixed',
    top: tokens.spacingVerticalM,
    right: tokens.spacingHorizontalM,
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
    maxWidth: '400px'
  },
  notification: {
    boxShadow: tokens.shadow8,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    overflow: 'hidden'
  }
});

/**
 * NotificationProvider Component
 * Provides notification functionality to the app
 */
export const NotificationProvider = ({ children }) => {
  const styles = useStyles();
  const [notifications, setNotifications] = useState([]);

  // Generate a unique ID for each notification
  const generateId = () => `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Map notification type to Alert intent
  const mapTypeToIntent = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  // Show a notification
  const showNotification = useCallback((message, type = 'info', autoHideDuration = 5000) => {
    const id = generateId();

    // Create a new notification
    const notification = {
      id,
      message,
      type,
      timestamp: Date.now()
    };

    // Add the notification to the array
    setNotifications(prev => [...prev, notification]);

    // Auto-hide the notification after duration if specified
    if (autoHideDuration) {
      setTimeout(() => {
        hideNotification(id);
      }, autoHideDuration);
    }

    return id;
  }, []);

  // Hide a notification by ID
  const hideNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification, notifications }}>
      {/* Render notifications */}
      {notifications.length > 0 && (
        <div className={styles.notificationsContainer}>
          {notifications.map(notification => (
            <div key={notification.id} className={styles.notification}>
              <Alert
                intent={mapTypeToIntent(notification.type)}
                action={{
                  icon: <Dismiss20Regular />,
                  onClick: () => hideNotification(notification.id)
                }}
              >
                {notification.message}
              </Alert>
            </div>
          ))}
        </div>
      )}

      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;