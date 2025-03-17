// File: packages/frontend/src/services/OpportunityService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class OpportunityService {
  getAllOpportunities() {
    console.log('Fetching all opportunities...');
    return axios.get(`${API_URL}/opportunities`)
      .then(response => {
        console.log('Opportunities data:', response.data);
        return response;
      })
      .catch(error => {
        console.error('Error fetching opportunities:', error);
        throw error;
      });
  }

  getOpportunityById(id) {
    return axios.get(`${API_URL}/opportunities/${id}`);
  }

  createOpportunity(opportunity) {
    return axios.post(`${API_URL}/opportunities`, opportunity);
  }

  updateOpportunity(id, opportunity) {
    return axios.put(`${API_URL}/opportunities/${id}`, opportunity);
  }

  deleteOpportunity(id) {
    return axios.delete(`${API_URL}/opportunities/${id}`);
  }

  deleteMultipleOpportunities(ids) {
    return axios.delete(`${API_URL}/opportunities/batch`, { data: ids });
  }

  getOpportunitiesByAccountName(accountName) {
    return axios.get(`${API_URL}/opportunities/account/${accountName}`);
  }

  getOpportunitiesByStage(stage) {
    return axios.get(`${API_URL}/opportunities/stage/${stage}`);
  }

  getOpportunitiesByStatus(status) {
    return axios.get(`${API_URL}/opportunities/status/${status}`);
  }

  getOpportunitiesByAssignee(assignee) {
    return axios.get(`${API_URL}/opportunities/assignee/${assignee}`);
  }

  searchOpportunities(query) {
    return axios.get(`${API_URL}/opportunities/search?query=${query}`);
  }
}

export default new OpportunityService();