// src/services/LeadService.js

/**
 * Service for handling Lead API operations
 * Connects to the Spring Boot backend
 */
const API_URL = 'http://localhost:8080/api/leads';

export const LeadService = {
  /**
   * Fetch all leads
   * @returns {Promise<Array>} Promise containing leads data
   */
  getAllLeads: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  },

  /**
   * Get a lead by its ID
   * @param {number} id - Lead ID
   * @returns {Promise<Object>} Promise containing the lead data
   */
  getLeadById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
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
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  },

  /**
   * Update an existing lead
   * @param {number} id - Lead ID
   * @param {Object} lead - Updated lead data
   * @returns {Promise<Object>} Promise containing the updated lead
   */
  updateLead: async (id, lead) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating lead ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a lead
   * @param {number} id - Lead ID
   * @returns {Promise<void>}
   */
  deleteLead: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
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
      const response = await fetch(`${API_URL}/status/${status}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
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
      const response = await fetch(`${API_URL}/assignee/${assignee}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching leads assigned to ${assignee}:`, error);
      throw error;
    }
  },

  /**
   * import leads from an Excel file
   * @
   * 
   */
  importLeads: async (leadData) => {
    try {
      const response = await fetch(`${API_URL}/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error importing leads:', error);
      throw error;
    }
  }

};

export default LeadService;