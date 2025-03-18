// File: packages/frontend/src/services/UserService.js
import api from './api/apiClient';

const API_URL = '/api/users';

// Mock data for development
const MOCK_USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'ADMIN',
    department: 'Sales',
    isActive: true
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'USER',
    department: 'Marketing',
    isActive: true
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'USER',
    department: 'Support',
    isActive: true
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'MANAGER',
    department: 'Sales',
    isActive: true
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'USER',
    department: 'IT',
    isActive: false
  }
];

// Flag to toggle mock mode for development
const USE_MOCK = true; // Set to false when backend is ready

/**
 * Service for user-related API calls.
 * Includes mock data fallback for development.
 */
class UserService {
  /**
   * Get all users with pagination.
   *
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getAllUsers(pageable = { page: 0, size: 1000 }) {
    if (USE_MOCK) {
      console.log('Using mock data for getAllUsers');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: MOCK_USERS,
            meta: {
              totalElements: MOCK_USERS.length,
              totalPages: 1,
              size: MOCK_USERS.length,
              page: 0
            }
          });
        }, 300);
      });
    }

    return api.get(API_URL, { params: pageable });
  }

  /**
   * Get a user by ID.
   *
   * @param {number} id - User ID
   * @returns {Promise} - Promise with response data
   */
  getUserById(id) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = MOCK_USERS.find(u => u.id === parseInt(id));
          if (user) {
            resolve({ data: user });
          } else {
            reject({ message: 'User not found' });
          }
        }, 300);
      });
    }

    return api.get(`${API_URL}/${id}`);
  }

  /**
   * Get the current authenticated user.
   *
   * @returns {Promise} - Promise with response data
   */
  getCurrentUser() {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: MOCK_USERS[0] });
        }, 300);
      });
    }

    return api.get(`${API_URL}/me`);
  }

  /**
   * Create a new user.
   *
   * @param {Object} userData - User data
   * @returns {Promise} - Promise with response data
   */
  createUser(userData) {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newUser = {
            ...userData,
            id: Math.max(...MOCK_USERS.map(u => u.id)) + 1
          };
          MOCK_USERS.push(newUser);
          resolve({ data: newUser });
        }, 300);
      });
    }

    return api.post(API_URL, userData);
  }

  /**
   * Update a user.
   *
   * @param {number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise} - Promise with response data
   */
  updateUser(id, userData) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = MOCK_USERS.findIndex(u => u.id === parseInt(id));
          if (index !== -1) {
            MOCK_USERS[index] = { ...MOCK_USERS[index], ...userData };
            resolve({ data: MOCK_USERS[index] });
          } else {
            reject({ message: 'User not found' });
          }
        }, 300);
      });
    }

    return api.put(`${API_URL}/${id}`, userData);
  }

  /**
   * Delete a user.
   *
   * @param {number} id - User ID
   * @returns {Promise} - Promise with response data
   */
  deleteUser(id) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = MOCK_USERS.findIndex(u => u.id === parseInt(id));
          if (index !== -1) {
            const deletedUser = MOCK_USERS.splice(index, 1)[0];
            resolve({ data: deletedUser });
          } else {
            reject({ message: 'User not found' });
          }
        }, 300);
      });
    }

    return api.delete(`${API_URL}/${id}`);
  }

  /**
   * Get users by department.
   *
   * @param {string} department - Department name
   * @returns {Promise} - Promise with response data
   */
  getUsersByDepartment(department) {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const filteredUsers = MOCK_USERS.filter(u =>
            u.department === department);
          resolve({ data: filteredUsers });
        }, 300);
      });
    }

    return api.get(`${API_URL}/department/${department}`);
  }

  /**
   * Get users by role.
   *
   * @param {string} role - Role name
   * @returns {Promise} - Promise with response data
   */
  getUsersByRole(role) {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const filteredUsers = MOCK_USERS.filter(u => u.role === role);
          resolve({ data: filteredUsers });
        }, 300);
      });
    }

    return api.get(`${API_URL}/role/${role}`);
  }

  /**
   * Search users.
   *
   * @param {string} query - Search query
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  searchUsers(query, pageable = { page: 0, size: 20 }) {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const lowerQuery = query.toLowerCase();
          const filteredUsers = MOCK_USERS.filter(u =>
            u.name.toLowerCase().includes(lowerQuery) ||
            u.email.toLowerCase().includes(lowerQuery) ||
            (u.department && u.department.toLowerCase().includes(lowerQuery))
          );

          resolve({
            data: filteredUsers,
            meta: {
              totalElements: filteredUsers.length,
              totalPages: 1,
              size: filteredUsers.length,
              page: 0
            }
          });
        }, 300);
      });
    }

    return api.get(`${API_URL}/search`, {
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
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Mock implementation - return first 2 users
          resolve({ data: MOCK_USERS.slice(0, 2) });
        }, 300);
      });
    }

    return api.get(`${API_URL}/team/${teamId}`);
  }

  /**
   * Activate a user.
   *
   * @param {number} id - User ID
   * @returns {Promise} - Promise with response data
   */
  activateUser(id) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = MOCK_USERS.findIndex(u => u.id === parseInt(id));
          if (index !== -1) {
            MOCK_USERS[index].isActive = true;
            resolve({ data: MOCK_USERS[index] });
          } else {
            reject({ message: 'User not found' });
          }
        }, 300);
      });
    }

    return api.put(`${API_URL}/${id}/activate`);
  }

  /**
   * Deactivate a user.
   *
   * @param {number} id - User ID
   * @returns {Promise} - Promise with response data
   */
  deactivateUser(id) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = MOCK_USERS.findIndex(u => u.id === parseInt(id));
          if (index !== -1) {
            MOCK_USERS[index].isActive = false;
            resolve({ data: MOCK_USERS[index] });
          } else {
            reject({ message: 'User not found' });
          }
        }, 300);
      });
    }

    return api.put(`${API_URL}/${id}/deactivate`);
  }

  /**
   * Change a user's password.
   *
   * @param {number} id - User ID
   * @param {Object} passwordData - Object containing old and new password
   * @returns {Promise} - Promise with response data
   */
  changePassword(id, passwordData) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = MOCK_USERS.find(u => u.id === parseInt(id));
          if (user) {
            resolve({ data: { success: true, message: 'Password changed successfully' } });
          } else {
            reject({ message: 'User not found' });
          }
        }, 300);
      });
    }

    return api.put(`${API_URL}/${id}/password`, passwordData);
  }

  /**
   * Reset a user's password.
   *
   * @param {number} id - User ID
   * @returns {Promise} - Promise with response data
   */
  resetPassword(id) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = MOCK_USERS.find(u => u.id === parseInt(id));
          if (user) {
            resolve({ data: { success: true, message: 'Password reset successfully' } });
          } else {
            reject({ message: 'User not found' });
          }
        }, 300);
      });
    }

    return api.post(`${API_URL}/${id}/reset-password`);
  }

  /**
   * Get user's assigned tasks.
   *
   * @param {number} id - User ID
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getUserTasks(id, pageable = { page: 0, size: 20 }) {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: [],
            meta: {
              totalElements: 0,
              totalPages: 0,
              size: pageable.size,
              page: pageable.page
            }
          });
        }, 300);
      });
    }

    return api.get(`${API_URL}/${id}/tasks`, { params: pageable });
  }

  /**
   * Get users without a team.
   *
   * @returns {Promise} - Promise with response data
   */
  getUnassignedUsers() {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Mock implementation - return a subset of users
          resolve({ data: MOCK_USERS.slice(2, 4) });
        }, 300);
      });
    }

    return api.get(`${API_URL}/unassigned`);
  }

  /**
   * Update a user's profile.
   *
   * @param {Object} profileData - Profile data
   * @returns {Promise} - Promise with response data
   */
  updateProfile(profileData) {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Just return success for mock
          resolve({ data: { success: true, ...profileData } });
        }, 300);
      });
    }

    return api.put(`${API_URL}/profile`, profileData);
  }

  /**
   * Upload a user avatar.
   *
   * @param {number} id - User ID
   * @param {FormData} formData - Form data containing the image file
   * @returns {Promise} - Promise with response data
   */
  uploadAvatar(id, formData) {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Just return success for mock
          resolve({ data: { success: true, avatarUrl: 'https://via.placeholder.com/150' } });
        }, 300);
      });
    }

    return api.post(`${API_URL}/${id}/avatar`, formData, {
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
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Mock implementation - users 2 and 3 report to manager 4
          if (parseInt(managerId) === 4) {
            resolve({ data: MOCK_USERS.slice(1, 3) });
          } else {
            resolve({ data: [] });
          }
        }, 300);
      });
    }

    return api.get(`${API_URL}/manager/${managerId}`);
  }

  /**
   * Assign a manager to a user.
   *
   * @param {number} userId - User ID
   * @param {number} managerId - Manager's user ID
   * @returns {Promise} - Promise with response data
   */
  assignManager(userId, managerId) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const userIndex = MOCK_USERS.findIndex(u => u.id === parseInt(userId));
          const managerIndex = MOCK_USERS.findIndex(u => u.id === parseInt(managerId));

          if (userIndex !== -1 && managerIndex !== -1) {
            // Just return success for mock
            resolve({ data: { success: true, message: 'Manager assigned successfully' } });
          } else {
            reject({ message: 'User or manager not found' });
          }
        }, 300);
      });
    }

    return api.put(`${API_URL}/${userId}/manager/${managerId}`);
  }

  /**
   * Remove a manager from a user.
   *
   * @param {number} userId - User ID
   * @returns {Promise} - Promise with response data
   */
  removeManager(userId) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const userIndex = MOCK_USERS.findIndex(u => u.id === parseInt(userId));

          if (userIndex !== -1) {
            // Just return success for mock
            resolve({ data: { success: true, message: 'Manager removed successfully' } });
          } else {
            reject({ message: 'User not found' });
          }
        }, 300);
      });
    }

    return api.delete(`${API_URL}/${userId}/manager`);
  }

  /**
   * Add a role to a user.
   *
   * @param {number} userId - User ID
   * @param {string} role - Role name
   * @returns {Promise} - Promise with response data
   */
  addRole(userId, role) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const userIndex = MOCK_USERS.findIndex(u => u.id === parseInt(userId));

          if (userIndex !== -1) {
            // Just return success for mock
            resolve({ data: { success: true, message: 'Role added successfully' } });
          } else {
            reject({ message: 'User not found' });
          }
        }, 300);
      });
    }

    return api.post(`${API_URL}/${userId}/roles/${role}`);
  }

  /**
   * Remove a role from a user.
   *
   * @param {number} userId - User ID
   * @param {string} role - Role name
   * @returns {Promise} - Promise with response data
   */
  removeRole(userId, role) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const userIndex = MOCK_USERS.findIndex(u => u.id === parseInt(userId));

          if (userIndex !== -1) {
            // Just return success for mock
            resolve({ data: { success: true, message: 'Role removed successfully' } });
          } else {
            reject({ message: 'User not found' });
          }
        }, 300);
      });
    }

    return api.delete(`${API_URL}/${userId}/roles/${role}`);
  }

  /**
   * Get user's sessions.
   *
   * @param {number} userId - User ID
   * @returns {Promise} - Promise with response data
   */
  getUserSessions(userId) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const userIndex = MOCK_USERS.findIndex(u => u.id === parseInt(userId));

          if (userIndex !== -1) {
            // Return mock sessions data
            resolve({
              data: [
                { id: 'session1', device: 'Chrome/Windows', lastActive: new Date().toISOString(), current: true },
                { id: 'session2', device: 'Mobile/iOS', lastActive: new Date(Date.now() - 86400000).toISOString(), current: false }
              ]
            });
          } else {
            reject({ message: 'User not found' });
          }
        }, 300);
      });
    }

    return api.get(`${API_URL}/${userId}/sessions`);
  }

  /**
   * Terminate a user session.
   *
   * @param {number} userId - User ID
   * @param {string} sessionId - Session ID
   * @returns {Promise} - Promise with response data
   */
  terminateSession(userId, sessionId) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const userIndex = MOCK_USERS.findIndex(u => u.id === parseInt(userId));

          if (userIndex !== -1) {
            // Just return success for mock
            resolve({ data: { success: true, message: 'Session terminated successfully' } });
          } else {
            reject({ message: 'User not found' });
          }
        }, 300);
      });
    }

    return api.delete(`${API_URL}/${userId}/sessions/${sessionId}`);
  }

  /**
   * Terminate all user sessions except the current one.
   *
   * @param {number} userId - User ID
   * @returns {Promise} - Promise with response data
   */
  terminateAllSessions(userId) {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const userIndex = MOCK_USERS.findIndex(u => u.id === parseInt(userId));

          if (userIndex !== -1) {
            // Just return success for mock
            resolve({ data: { success: true, message: 'All sessions terminated successfully' } });
          } else {
            reject({ message: 'User not found' });
          }
        }, 300);
      });
    }

    return api.delete(`${API_URL}/${userId}/sessions`);
  }
}

export default new UserService();