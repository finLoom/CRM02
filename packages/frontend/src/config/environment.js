/**
 * Environment configuration
 *
 * This file consolidates environment variable access to provide
 * type safety and default values. Instead of accessing process.env directly,
 * import variables from this file.
 */

// Environment detection
export const ENV = {
  PRODUCTION: process.env.NODE_ENV === 'production',
  DEVELOPMENT: process.env.NODE_ENV === 'development',
  TEST: process.env.NODE_ENV === 'test',
  ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || process.env.NODE_ENV || 'development',
};

// API configuration
export const API = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT || '30000', 10),
  MOCK_ENABLED: process.env.REACT_APP_USE_MOCK_API === 'true',
  VERSION: process.env.REACT_APP_API_VERSION || 'v1',
};

// Authentication configuration
export const AUTH = {
  AUTH_URL: process.env.REACT_APP_AUTH_URL || `${API.BASE_URL}/auth`,
  TOKEN_REFRESH_INTERVAL: parseInt(process.env.REACT_APP_TOKEN_REFRESH_INTERVAL || '300000', 10), // 5 minutes
  SESSION_TIMEOUT: parseInt(process.env.REACT_APP_SESSION_TIMEOUT || '1800000', 10), // 30 minutes
};

// Feature flags
export const FEATURES = {
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  ENABLE_NOTIFICATIONS: process.env.REACT_APP_ENABLE_NOTIFICATIONS !== 'false', // default to true
  ENABLE_THEME_SWITCHING: process.env.REACT_APP_ENABLE_THEME_SWITCHING !== 'false', // default to true
  ENABLE_ERROR_REPORTING: process.env.REACT_APP_ENABLE_ERROR_REPORTING !== 'false', // default to true
  ENABLE_OFFLINE_MODE: process.env.REACT_APP_ENABLE_OFFLINE_MODE === 'true',
  ENABLE_DEMO_MODE: process.env.REACT_APP_ENABLE_DEMO_MODE === 'true',
};

// External services
export const SERVICES = {
  ANALYTICS_ID: process.env.REACT_APP_ANALYTICS_ID || '',
  ERROR_TRACKING_DSN: process.env.REACT_APP_ERROR_TRACKING_DSN || '',
  MAPS_API_KEY: process.env.REACT_APP_MAPS_API_KEY || '',
};

// Application metadata
export const APP = {
  NAME: process.env.REACT_APP_NAME || 'Fluent CRM',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  BUILD_NUMBER: process.env.REACT_APP_BUILD_NUMBER || 'dev',
  COPYRIGHT: process.env.REACT_APP_COPYRIGHT || `© ${new Date().getFullYear()} Your Company`,
  SUPPORT_EMAIL: process.env.REACT_APP_SUPPORT_EMAIL || 'support@example.com',
  HELP_URL: process.env.REACT_APP_HELP_URL || 'https://example.com/help',
};

// Performance configurations
export const PERFORMANCE = {
  ENABLE_QUERY_CACHE: process.env.REACT_APP_ENABLE_QUERY_CACHE !== 'false', // default to true
  QUERY_CACHE_TIME: parseInt(process.env.REACT_APP_QUERY_CACHE_TIME || '300000', 10), // 5 minutes
  STALE_TIME: parseInt(process.env.REACT_APP_STALE_TIME || '60000', 10), // 1 minute
  ENABLE_CODE_SPLITTING: process.env.REACT_APP_ENABLE_CODE_SPLITTING !== 'false', // default to true
};

// Combine all environment settings
const env = {
  ENV,
  API,
  AUTH,
  FEATURES,
  SERVICES,
  APP,
  PERFORMANCE,
};

// Helper function to log environment configuration during development
if (ENV.DEVELOPMENT) {
  console.group('Environment Configuration');
  console.log('Environment:', ENV.ENVIRONMENT);
  console.log('API Base URL:', API.BASE_URL);
  console.log('Features:', FEATURES);
  console.log('Application:', `${APP.NAME} v${APP.VERSION} (${APP.BUILD_NUMBER})`);
  console.groupEnd();
}

export default env;