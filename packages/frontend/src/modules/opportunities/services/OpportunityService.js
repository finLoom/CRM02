// packages/frontend/src/modules/opportunities/services/OpportunityService.js
import api from '../../../services/api/apiClient';

/**
 * Service for managing opportunities
 */
class OpportunityService {
  /**
   * Fetch all opportunities
   * @returns {Promise} Promise resolving to opportunities data
   */
  getAllOpportunities() {
    console.log('Fetching all opportunities...');
    return api.get('/opportunities')
      .then(response => {
        console.log('Opportunities data:', response.data);
        return response;
      })
      .catch(error => {
        console.error('Error fetching opportunities:', error);
        throw error;
      });
  }

  /**
   * Fetch opportunity by ID
   * @param {string} id Opportunity ID
   * @returns {Promise} Promise resolving to opportunity data
   */
  getOpportunityById(id) {
    return api.get(`/opportunities/${id}`);
  }

  /**
   * Create a new opportunity
   * @param {Object} opportunity Opportunity data
   * @returns {Promise} Promise resolving to created opportunity
   */
  createOpportunity(opportunity) {
    return api.post('/opportunities', opportunity);
  }

  /**
   * Update an existing opportunity
   * @param {string} id Opportunity ID
   * @param {Object} opportunity Updated opportunity data
   * @returns {Promise} Promise resolving to updated opportunity
   */
  updateOpportunity(id, opportunity) {
    return api.put(`/opportunities/${id}`, opportunity);
  }

  /**
   * Delete an opportunity
   * @param {string} id Opportunity ID
   * @returns {Promise} Promise resolving to deletion result
   */
  deleteOpportunity(id) {
    return api.delete(`/opportunities/${id}`);
  }

  /**
   * Delete multiple opportunities
   * @param {Array} ids Array of opportunity IDs
   * @returns {Promise} Promise resolving to deletion result
   */
  deleteMultipleOpportunities(ids) {
    return api.delete('/opportunities/batch', { data: ids });
  }

  /**
   * Get opportunities by account name
   * @param {string} accountName Account name to filter by
   * @returns {Promise} Promise resolving to filtered opportunities
   */
  getOpportunitiesByAccountName(accountName) {
    return api.get(`/opportunities/account/${accountName}`);
  }

  /**
   * Get opportunities by stage
   * @param {string} stage Stage to filter by
   * @returns {Promise} Promise resolving to filtered opportunities
   */
  getOpportunitiesByStage(stage) {
    return api.get(`/opportunities/stage/${stage}`);
  }

  /**
   * Get opportunities by status
   * @param {string} status Status to filter by
   * @returns {Promise} Promise resolving to filtered opportunities
   */
  getOpportunitiesByStatus(status) {
    return api.get(`/opportunities/status/${status}`);
  }

  /**
   * Get opportunities by assignee
   * @param {string} assignee Assignee to filter by
   * @returns {Promise} Promise resolving to filtered opportunities
   */
  getOpportunitiesByAssignee(assignee) {
    return api.get(`/opportunities/assignee/${assignee}`);
  }

  /**
   * Search opportunities
   * @param {string} query Search query
   * @returns {Promise} Promise resolving to search results
   */
  searchOpportunities(query) {
    return api.get(`/opportunities/search?query=${query}`);
  }
}

export default new OpportunityService();