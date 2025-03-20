// src/modules/leads/services/LeadService.js
import api from '../../../services/api/apiClient';

const BASE_URL = '/leads';

/**
 * Service for handling Lead API operations
 */
const LeadService = {
  /**
   * Fetch all leads
   * @returns {Promise<Array>} Promise containing leads data
   */
  getAllLeads: async () => {
    try {
      const response = await api.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  },

  /**
   * Get a lead by its ID
   * @param {string|number} id - Lead ID
   * @returns {Promise<Object>} Promise containing the lead data
   */
  getLeadById: async (id) => {
    try {
      const response = await api.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching lead ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new lead
   * @param {Object} lead - Lead data
   * @returns {Promise<Object>} Promise containing the created lead
   */
  createLead: async (lead) => {
    try {
      const response = await api.post(BASE_URL, lead);
      return response.data;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  },

  /**
   * Update an existing lead
   * @param {string|number} id - Lead ID
   * @param {Object} lead - Updated lead data
   * @returns {Promise<Object>} Promise containing the updated lead
   */
  updateLead: async (id, lead) => {
    try {
      const response = await api.put(`${BASE_URL}/${id}`, lead);
      return response.data;
    } catch (error) {
      console.error(`Error updating lead ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a lead
   * @param {string|number} id - Lead ID
   * @returns {Promise<void>}
   */
  deleteLead: async (id) => {
    try {
      await api.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting lead ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get leads filtered by status
   * @param {string} status - Lead status
   * @returns {Promise<Array>} Promise containing filtered leads
   */
  getLeadsByStatus: async (status) => {
    try {
      const response = await api.get(`${BASE_URL}/status/${status}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching leads with status ${status}:`, error);
      throw error;
    }
  },

  /**
   * Get leads filtered by assignee
   * @param {string} assignee - Assignee name
   * @returns {Promise<Array>} Promise containing filtered leads
   */
  getLeadsByAssignee: async (assignee) => {
    try {
      const response = await api.get(`${BASE_URL}/assignee/${assignee}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching leads assigned to ${assignee}:`, error);
      throw error;
    }
  },

  /**
   * Import leads from Excel data
   * @param {Array} leadData - Array of lead objects
   * @returns {Promise<Object>} Promise containing import results
   */
  importLeads: async (leadData) => {
    try {
      const response = await api.post(`${BASE_URL}/import`, leadData);
      return response.data;
    } catch (error) {
      console.error('Error importing leads:', error);
      throw error;
    }
  }
};

export default LeadService;