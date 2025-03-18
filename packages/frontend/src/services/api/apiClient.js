// File: packages/frontend/src/services/api/apiClient.js
import axios from 'axios';

/**
 * Create an Axios instance with base configuration
 * Fix: Remove the duplicate "/api" path segment from API_BASE_URL
 */
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Simple temporary notification function
const showNotification = (message, type) => {
  console.log(`[${type}] ${message}`);
  // You can replace this with a proper notification system later
};

// Simple auth token getter
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

// Simple auth clear function
const clearAuth = () => {
  localStorage.removeItem('auth_token');
};

// Simple token refresh function (placeholder)
const refreshToken = async () => {
  try {
    // In a real app, you would call an API endpoint to refresh the token
    // For now, we just return null to indicate token refresh failed
    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};

/**
 * Setup Axios interceptors for authentication and error handling
 */
export const setupAxiosInterceptors = () => {
  // Request interceptor to add auth token
  apiClient.interceptors.request.use(
    config => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  // Response interceptor to handle errors and token refresh
  apiClient.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      // Handle 401 Unauthorized errors (token expired)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh the token
          const newToken = await refreshToken();

          // Update the request with the new token
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          // If token refresh fails, log out the user
          clearAuth();
          showNotification('Your session has expired. Please log in again.', 'warning');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      // Handle 403 Forbidden errors
      if (error.response?.status === 403) {
        showNotification('You do not have permission to perform this action.', 'error');
      }

      // Handle 404 Not Found errors
      if (error.response?.status === 404) {
        // Only show notification for specific data requests
        if (!originalRequest.url.includes('/exists/')) {
          showNotification('The requested resource could not be found.', 'warning');
        }
      }

      // Handle 500 Internal Server Error
      if (error.response?.status >= 500) {
        showNotification('An unexpected error occurred. Our team has been notified.', 'error');
      }

      // Network errors
      if (error.message === 'Network Error') {
        showNotification('Unable to connect to the server. Please check your internet connection.', 'error');
      }

      return Promise.reject(error);
    }
  );
};

/**
 * Helper methods for common API operations
 */
export const api = {
  get: (url, config = {}) => apiClient.get(url, config),
  post: (url, data, config = {}) => apiClient.post(url, data, config),
  put: (url, data, config = {}) => apiClient.put(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),
  patch: (url, data, config = {}) => apiClient.patch(url, data, config)
};

export default api;