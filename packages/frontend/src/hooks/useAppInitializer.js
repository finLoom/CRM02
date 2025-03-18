import { useEffect } from 'react';
import { initializeIcons } from '../config/icons';
import { setupAxiosInterceptors } from '../services/api/apiClient';

/**
 * Hook to handle application initialization tasks
 * Runs setup code when the application loads
 */
export const useAppInitializer = () => {
  useEffect(() => {
    // Initialize UI icons
    initializeIcons();

    // Set up API interceptors
    setupAxiosInterceptors();

    // Set up event listeners or other initialization as needed

    // Return cleanup function
    return () => {
      // Clean up any event listeners or resources
    };
  }, []);
};

export default useAppInitializer;