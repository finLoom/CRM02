import { useEffect } from 'react';
import { initializeIcons } from '../config/icons';

/**
 * Custom hook for initializing application settings and services
 * Runs once when the application starts
 *
 * @returns {void}
 */
export const useAppInitializer = () => {
  useEffect(() => {
    // Initialize icons
    if (typeof initializeIcons === 'function') {
      initializeIcons();
    }

    // Setup event listeners
    const handleOnline = () => {
      console.log('App is online');
    };

    const handleOffline = () => {
      console.log('App is offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up effect
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
};

export default useAppInitializer;