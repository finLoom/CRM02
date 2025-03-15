// File: frontend/src/services/UserService.js
import axios from 'axios';

const API_URL = '/api/users';

/**
 * Service for user-related API calls.
 */
class UserService {
  /**
   * Get all users with pagination.
   * 
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getAllUsers(pageable = { page: 0, size: 1000 }) {
    return axios.get(API_URL, { params: pageable });
  }

  /**
   * Get a user by ID.
   * 
   * @param {number} id - User ID
   * @returns {Promise} - Promise with response data
   */
  getUserById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  /**
   * Get the current authenticated user.
   * 
   * @returns {Promise} - Promise with response data
   */
  getCurrentUser() {
    return axios.get(`${API_URL}/me`);
  }

  /**
   * Create a new user.
   * 
   * @param {Object} userData - User data
   * @returns {Promise} - Promise with response data
   */
  createUser(userData) {
    return axios.post(API_URL, userData);
  }

  /**
   * Update a user.
   * 
   * @param {number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise} - Promise with response data
   */
  updateUser(id, userData) {
    return axios.put(`${API_URL}/${id}`, userData);
  }

  /**
   * Delete a user.
   * 
   * @param {number} id - User ID
   * @returns {Promise} - Promise with response data
   */
  deleteUser(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  /**
   * Get users by department.
   * 
   * @param {string} department - Department name
   * @returns {Promise} - Promise with response data
   */
  getUsersByDepartment(department) {
    return axios.get(`${API_URL}/department/${department}`);
  }

  /**
   * Get users by role.
   * 
   * @param {string} role - Role name
   * @returns {Promise} - Promise with response data
   */
  getUsersByRole(role) {
    return axios.get(`${API_URL}/role/${role}`);
  }

  /**
   * Search users.
   * 
   * @param {string} query - Search query
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  searchUsers(query, pageable = { page: 0, size: 20 }) {
    return axios.get(`${API_URL}/search`, {
      params: {
        query,
        ...pageable
      }
    });
  }
  
  /**
   * Get users by team.
   * 
   * @param {number} teamId - Team ID
   * @returns {Promise} - Promise with response data
   */
  getUsersByTeam(teamId) {
    return axios.get(`${API_URL}/team/${teamId}`);
  }

  /**
   * Activate a user.
   * 
   * @param {number} id - User ID
   * @returns {Promise} - Promise with response data
   */
  activateUser(id) {
    return axios.put(`${API_URL}/${id}/activate`);
  }

  /**
   * Deactivate a user.
   * 
   * @param {number} id - User ID
   * @returns {Promise} - Promise with response data
   */
  deactivateUser(id) {
// File continuation: frontend/src/services/UserService.js
return axios.put(`${API_URL}/${id}/deactivate`);
}

/**
 * Change a user's password.
 * 
 * @param {number} id - User ID
 * @param {Object} passwordData - Object containing old and new password
 * @returns {Promise} - Promise with response data
 */
changePassword(id, passwordData) {
  return axios.put(`${API_URL}/${id}/password`, passwordData);
}

/**
 * Reset a user's password.
 * 
 * @param {number} id - User ID
 * @returns {Promise} - Promise with response data
 */
resetPassword(id) {
  return axios.post(`${API_URL}/${id}/reset-password`);
}

/**
 * Get user's assigned tasks.
 * 
 * @param {number} id - User ID
 * @param {Object} pageable - Pagination parameters
 * @returns {Promise} - Promise with response data
 */
getUserTasks(id, pageable = { page: 0, size: 20 }) {
  return axios.get(`${API_URL}/${id}/tasks`, { params: pageable });
}

/**
 * Get users without a team.
 * 
 * @returns {Promise} - Promise with response data
 */
getUnassignedUsers() {
  return axios.get(`${API_URL}/unassigned`);
}

/**
 * Update a user's profile.
 * 
 * @param {Object} profileData - Profile data
 * @returns {Promise} - Promise with response data
 */
updateProfile(profileData) {
  return axios.put(`${API_URL}/profile`, profileData);
}

/**
 * Upload a user avatar.
 * 
 * @param {number} id - User ID
 * @param {FormData} formData - Form data containing the image file
 * @returns {Promise} - Promise with response data
 */
uploadAvatar(id, formData) {
  return axios.post(`${API_URL}/${id}/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * Get users by manager.
 * 
 * @param {number} managerId - Manager's user ID
 * @returns {Promise} - Promise with response data
 */
getUsersByManager(managerId) {
  return axios.get(`${API_URL}/manager/${managerId}`);
}

/**
 * Assign a manager to a user.
 * 
 * @param {number} userId - User ID
 * @param {number} managerId - Manager's user ID
 * @returns {Promise} - Promise with response data
 */
assignManager(userId, managerId) {
  return axios.put(`${API_URL}/${userId}/manager/${managerId}`);
}

/**
 * Remove a manager from a user.
 * 
 * @param {number} userId - User ID
 * @returns {Promise} - Promise with response data
 */
removeManager(userId) {
  return axios.delete(`${API_URL}/${userId}/manager`);
}

/**
 * Add a role to a user.
 * 
 * @param {number} userId - User ID
 * @param {string} role - Role name
 * @returns {Promise} - Promise with response data
 */
addRole(userId, role) {
  return axios.post(`${API_URL}/${userId}/roles/${role}`);
}

/**
 * Remove a role from a user.
 * 
 * @param {number} userId - User ID
 * @param {string} role - Role name
 * @returns {Promise} - Promise with response data
 */
removeRole(userId, role) {
  return axios.delete(`${API_URL}/${userId}/roles/${role}`);
}

/**
 * Get user's sessions.
 * 
 * @param {number} userId - User ID
 * @returns {Promise} - Promise with response data
 */
getUserSessions(userId) {
  return axios.get(`${API_URL}/${userId}/sessions`);
}

/**
 * Terminate a user session.
 * 
 * @param {number} userId - User ID
 * @param {string} sessionId - Session ID
 * @returns {Promise} - Promise with response data
 */
terminateSession(userId, sessionId) {
  return axios.delete(`${API_URL}/${userId}/sessions/${sessionId}`);
}

/**
 * Terminate all user sessions except the current one.
 * 
 * @param {number} userId - User ID
 * @returns {Promise} - Promise with response data
 */
terminateAllSessions(userId) {
  return axios.delete(`${API_URL}/${userId}/sessions`);
}
}

export default new UserService();