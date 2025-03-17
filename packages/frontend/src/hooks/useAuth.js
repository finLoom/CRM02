import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Custom hook that provides authentication functionality
 * Wraps the AuthContext for easier access to authentication state and methods
 *
 * @returns {Object} Authentication state and methods
 * @returns {boolean} .isAuthenticated - Whether the user is currently authenticated
 * @returns {Object} .user - The current user's information
 * @returns {boolean} .loading - Whether authentication is being checked
 * @returns {Function} .login - Function to log in a user
 * @returns {Function} .logout - Function to log out the current user
 * @returns {Function} .register - Function to register a new user
 * @returns {Function} .updateProfile - Function to update the user's profile
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default useAuth;