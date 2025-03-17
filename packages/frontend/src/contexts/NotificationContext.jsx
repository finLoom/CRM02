import React, { createContext, useState, useCallback } from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';

// Create the Notification Context
export const NotificationContext = createContext({
  showNotification: () => {},
  hideNotification: () => {},
  notifications: []
});

/**
 * NotificationProvider Component
 * Provides notification functionality to the app
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Generate a unique ID for each notification
  const generateId = () => `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Show a notification
  const showNotification = useCallback((message, type = 'info', autoHideDuration = 5000) => {
    const id = generateId();

    // Create a new notification
    const notification = {
      id,
      message,
      type: type === 'success' ? MessageBarType.success :
           type === 'error' ? MessageBarType.error :
           type === 'warning' ? MessageBarType.warning :
           MessageBarType.info,
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
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          maxWidth: 400
        }}>
          {notifications.map(notification => (
            <MessageBar
              key={notification.id}
              messageBarType={notification.type}
              isMultiline={false}
              onDismiss={() => hideNotification(notification.id)}
              dismissButtonAriaLabel="Close"
            >
              {notification.message}
            </MessageBar>
          ))}
        </div>
      )}

      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;