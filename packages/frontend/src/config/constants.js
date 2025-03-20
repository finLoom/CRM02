/**
 * Application-wide constants
 *
 * This file contains constant values used throughout the application.
 * Centralizing these values makes it easier to maintain and update them.
 */

// API configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
};

// Authentication constants
export const AUTH = {
  TOKEN_KEY: 'auth_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  USER_INFO_KEY: 'user_info',
  EXPIRY_KEY: 'token_expiry',
  TOKEN_TYPE: 'Bearer',
  SESSION_TIMEOUT: 1000 * 60 * 30, // 30 minutes in milliseconds
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'theme_preference',
  LANGUAGE: 'language_preference',
  SIDEBAR_STATE: 'sidebar_collapsed',
  RECENT_ITEMS: 'recent_items',
  USER_SETTINGS: 'user_settings',
  DATA_GRID_STATE: 'data_grid_state',
};

// Data pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 25,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  DEFAULT_PAGE: 0,
};

// Date formats
export const DATE_FORMATS = {
  SHORT_DATE: 'MM/dd/yyyy',
  LONG_DATE: 'MMMM dd, yyyy',
  DATE_TIME: 'MM/dd/yyyy hh:mm a',
  TIME_ONLY: 'hh:mm a',
  ISO_DATE: 'yyyy-MM-dd',
  ISO_DATE_TIME: 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'',
  MONTH_YEAR: 'MMMM yyyy',
  DAY_MONTH: 'dd MMM',
};

// Status constants
export const STATUS = {
  LEAD: {
    NEW: 'new',
    CONTACTED: 'contacted',
    QUALIFIED: 'qualified',
    UNQUALIFIED: 'unqualified',
  },
  OPPORTUNITY: {
    QUALIFICATION: 'qualification',
    NEEDS_ANALYSIS: 'needs_analysis',
    PROPOSAL: 'proposal',
    NEGOTIATION: 'negotiation',
    CLOSED_WON: 'closed_won',
    CLOSED_LOST: 'closed_lost',
  },
  TASK: {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    DEFERRED: 'deferred',
    WAITING: 'waiting',
  },
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
  },
};

// Color palette for charts and visualizations
export const COLORS = {
  PRIMARY: '#0078d4',
  SUCCESS: '#107C10',
  WARNING: '#FFB900',
  ERROR: '#D13438',
  INFO: '#0078D4',
  NEUTRAL: '#605E5C',
  CHART_PALETTE: [
    '#0078D4', // Blue
    '#107C10', // Green
    '#FFB900', // Yellow
    '#D13438', // Red
    '#881798', // Purple
    '#8764B8', // Light Purple
    '#00B7C3', // Teal
    '#498205', // Dark Green
    '#FF8C00', // Orange
    '#004E8C', // Dark Blue
  ],
  STATUS_COLORS: {
    new: '#0078D4',
    contacted: '#00B7C3',
    qualified: '#107C10',
    unqualified: '#605E5C',
    qualification: '#0078D4',
    needs_analysis: '#00B7C3',
    proposal: '#498205',
    negotiation: '#FFB900',
    closed_won: '#107C10',
    closed_lost: '#D13438',
    not_started: '#605E5C',
    in_progress: '#0078D4',
    completed: '#107C10',
    deferred: '#881798',
    waiting: '#FFB900',
    low: '#605E5C',
    medium: '#00B7C3',
    high: '#FFB900',
    urgent: '#D13438',
  },
};

// File upload limits
export const UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  ALLOWED_FILE_TYPES: {
    IMAGES: ['.jpg', '.jpeg', '.png', '.gif'],
    DOCUMENTS: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt'],
    CSV: ['.csv'],
    ALL: ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.csv'],
  },
};

// Regular expressions for validation
export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^\+?[0-9]{1,3}?[-. (]?[0-9]{3}[-. )]?[0-9]{3}[-. ]?[0-9]{4}$/,
  URL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

// Export all constants as default
export default {
  API_CONFIG,
  AUTH,
  STORAGE_KEYS,
  PAGINATION,
  DATE_FORMATS,
  STATUS,
  COLORS,
  UPLOAD,
  REGEX,
};

// File: packages/frontend/src/config/constants.js

// API URL configuration
//export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Task module constants
export const TASK_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  DEFERRED: 'DEFERRED',
  BLOCKED: 'BLOCKED',
  CANCELLED: 'CANCELLED'
};

export const TASK_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export const TASK_MODULE = {
  CRM: 'CRM',
  ACCOUNTING: 'ACCOUNTING',
  HR: 'HR',
  OPERATIONS: 'OPERATIONS',
  GLOBAL: 'GLOBAL'
};

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE = 0;

// Date format patterns
export const DATE_FORMAT = {
  DISPLAY: 'MMM d, yyyy',
  API: 'yyyy-MM-dd',
  FULL: 'yyyy-MM-dd\'T\'HH:mm:ss'
};