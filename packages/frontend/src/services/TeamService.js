// File: frontend/src/services/TeamService.js
import axios from 'axios';

const API_URL = '/api/teams';

/**
 * Service for team-related API calls.
 */
class TeamService {
  /**
   * Get all teams with pagination.
   * 
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  getAllTeams(pageable = { page: 0, size: 20 }) {
    return axios.get(API_URL, { params: pageable });
  }

  /**
   * Get a team by ID.
   * 
   * @param {number} id - Team ID
   * @returns {Promise} - Promise with response data
   */
  getTeamById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  /**
   * Get a team by name.
   * 
   * @param {string} name - Team name
   * @returns {Promise} - Promise with response data
   */
  getTeamByName(name) {
    return axios.get(`${API_URL}/name/${name}`);
  }

  /**
   * Create a new team.
   * 
   * @param {Object} teamData - Team data
   * @returns {Promise} - Promise with response data
   */
  createTeam(teamData) {
    return axios.post(API_URL, teamData);
  }

  /**
   * Update a team.
   * 
   * @param {number} id - Team ID
   * @param {Object} teamData - Updated team data
   * @returns {Promise} - Promise with response data
   */
  updateTeam(id, teamData) {
    return axios.put(`${API_URL}/${id}`, teamData);
  }

  /**
   * Delete a team.
   * 
   * @param {number} id - Team ID
   * @returns {Promise} - Promise with response data
   */
  deleteTeam(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  /**
   * Get teams by type.
   * 
   * @param {string} type - Team type
   * @returns {Promise} - Promise with response data
   */
  getTeamsByType(type) {
    return axios.get(`${API_URL}/type/${type}`);
  }

  /**
   * Get active teams.
   * 
   * @returns {Promise} - Promise with response data
   */
  getActiveTeams() {
    return axios.get(`${API_URL}/active`);
  }

  /**
   * Get teams by department.
   * 
   * @param {string} department - Department name
   * @returns {Promise} - Promise with response data
   */
  getTeamsByDepartment(department) {
    return axios.get(`${API_URL}/department/${department}`);
  }

  /**
   * Get teams by functional area.
   * 
   * @param {string} functionalArea - Functional area
   * @returns {Promise} - Promise with response data
   */
  getTeamsByFunctionalArea(functionalArea) {
    return axios.get(`${API_URL}/functional-area/${functionalArea}`);
  }

  /**
   * Get teams managed by a specific user.
   * 
   * @param {number} managerId - Manager's user ID
   * @returns {Promise} - Promise with response data
   */
  getTeamsByManager(managerId) {
    return axios.get(`${API_URL}/manager/${managerId}`);
  }

  /**
   * Get teams that a user belongs to.
   * 
   * @param {number} userId - User ID
   * @returns {Promise} - Promise with response data
   */
  getTeamsByMember(userId) {
    return axios.get(`${API_URL}/member/${userId}`);
  }

  /**
   * Add a member to a team.
   * 
   * @param {number} teamId - Team ID
   * @param {number} userId - User ID to add
   * @returns {Promise} - Promise with response data
   */
  addMemberToTeam(teamId, userId) {
    return axios.put(`${API_URL}/${teamId}/members/${userId}`);
  }

  /**
   * Remove a member from a team.
   * 
   * @param {number} teamId - Team ID
   * @param {number} userId - User ID to remove
   * @returns {Promise} - Promise with response data
   */
  removeMemberFromTeam(teamId, userId) {
    return axios.delete(`${API_URL}/${teamId}/members/${userId}`);
  }

  /**
   * Set the manager of a team.
   * 
   * @param {number} teamId - Team ID
   * @param {number} managerId - Manager's user ID
   * @returns {Promise} - Promise with response data
   */
  setTeamManager(teamId, managerId) {
    return axios.put(`${API_URL}/${teamId}/manager/${managerId}`);
  }

  /**
   * Activate a team.
   * 
   * @param {number} teamId - Team ID
   * @returns {Promise} - Promise with response data
   */
  activateTeam(teamId) {
    return axios.put(`${API_URL}/${teamId}/activate`);
  }

  /**
   * Deactivate a team.
   * 
   * @param {number} teamId - Team ID
   * @returns {Promise} - Promise with response data
   */
  deactivateTeam(teamId) {
    return axios.put(`${API_URL}/${teamId}/deactivate`);
  }

  /**
   * Search teams by name or description.
   * 
   * @param {string} query - Search query
   * @param {Object} pageable - Pagination parameters
   * @returns {Promise} - Promise with response data
   */
  searchTeams(query, pageable = { page: 0, size: 20 }) {
    return axios.get(`${API_URL}/search`, {
      params: {
        query,
        ...pageable
      }
    });
  }
}

export default new TeamService();