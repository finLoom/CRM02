// packages/frontend/src/modules/contacts/services/ContactService.js
import api from '../../../services/api/apiClient';

/**
 * Service for contact-related API operations
 */
class ContactService {
  /**
   * Get all contacts with optional filtering
   * @param {Object} filters - Optional filters
   * @returns {Promise} - API response
   */
  getAllContacts(filters = {}) {
    console.log('Fetching all contacts...');
    return api.get('/contacts', { params: filters })
      .then(response => {
        console.log('Contacts data:', response.data);
        return response;
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);

        // For development/demo purposes - return dummy data if API fails
        if (process.env.NODE_ENV === 'development') {
          console.log('Returning mock contacts data');
          return {
            data: [
              {
                id: '1',
                firstName: 'Jane',
                lastName: 'Cooper',
                email: 'jane.cooper@example.com',
                phone: '(555) 123-4567',
                mobile: '(555) 765-4321',
                accountName: 'Acme Inc',
                title: 'CEO',
                department: 'Executive',
                assignedTo: 'Robert Fox',
                mailingStreet: '123 Main St',
                mailingCity: 'San Francisco',
                mailingState: 'CA',
                mailingZip: '94105',
                mailingCountry: 'USA'
              },
              {
                id: '2',
                firstName: 'John',
                lastName: 'Smith',
                email: 'john.smith@example.com',
                phone: '(555) 234-5678',
                mobile: '(555) 876-5432',
                accountName: 'Globex Corp',
                title: 'CTO',
                department: 'Technology',
                assignedTo: 'Jane Cooper',
                mailingStreet: '456 Market St',
                mailingCity: 'San Francisco',
                mailingState: 'CA',
                mailingZip: '94103',
                mailingCountry: 'USA'
              }
            ]
          };
        }

        throw error;
      });
  }

  /**
   * Get a contact by ID
   * @param {string} id - Contact ID
   * @returns {Promise} - API response
   */
  getContactById(id) {
    return api.get(`/contacts/${id}`)
      .catch(error => {
        console.error('Error fetching contact:', error);

        // For development/demo purposes - return dummy data if API fails
        if (process.env.NODE_ENV === 'development') {
          console.log('Returning mock contact data');
          return {
            data: {
              id: id,
              firstName: 'Jane',
              lastName: 'Cooper',
              email: 'jane.cooper@example.com',
              phone: '(555) 123-4567',
              mobile: '(555) 765-4321',
              accountName: 'Acme Inc',
              title: 'CEO',
              department: 'Executive',
              assignedTo: 'Robert Fox',
              mailingStreet: '123 Main St',
              mailingCity: 'San Francisco',
              mailingState: 'CA',
              mailingZip: '94105',
              mailingCountry: 'USA'
            }
          };
        }

        throw error;
      });
  }

  /**
   * Create a new contact
   * @param {Object} contactData - Contact data
   * @returns {Promise} - API response
   */
  createContact(contactData) {
    return api.post('/contacts', contactData)
      .catch(error => {
        console.error('Error creating contact:', error);

        // For development/demo purposes - return dummy success if API fails
        if (process.env.NODE_ENV === 'development') {
          console.log('Returning mock create response');
          return {
            data: {
              id: Math.floor(Math.random() * 1000).toString(),
              ...contactData
            }
          };
        }

        throw error;
      });
  }

  /**
   * Update an existing contact
   * @param {string} id - Contact ID
   * @param {Object} contactData - Updated contact data
   * @returns {Promise} - API response
   */
  updateContact(id, contactData) {
    return api.put(`/contacts/${id}`, contactData)
      .catch(error => {
        console.error('Error updating contact:', error);

        // For development/demo purposes - return dummy success if API fails
        if (process.env.NODE_ENV === 'development') {
          console.log('Returning mock update response');
          return {
            data: {
              id: id,
              ...contactData
            }
          };
        }

        throw error;
      });
  }

  /**
   * Delete a contact
   * @param {string} id - Contact ID
   * @returns {Promise} - API response
   */
  deleteContact(id) {
    return api.delete(`/contacts/${id}`)
      .catch(error => {
        console.error('Error deleting contact:', error);

        // For development/demo purposes - return dummy success if API fails
        if (process.env.NODE_ENV === 'development') {
          console.log('Returning mock delete response');
          return { data: { success: true } };
        }

        throw error;
      });
  }

  /**
   * Get contacts by account name
   * @param {string} accountName - Account name
   * @returns {Promise} - API response
   */
  getContactsByAccountName(accountName) {
    return api.get(`/contacts/account/${accountName}`);
  }

  /**
   * Get contacts by assignee
   * @param {string} assignee - Assignee name
   * @returns {Promise} - API response
   */
  getContactsByAssignee(assignee) {
    return api.get(`/contacts/assignee/${assignee}`);
  }

  /**
   * Search contacts
   * @param {string} query - Search query
   * @returns {Promise} - API response
   */
  searchContacts(query) {
    return api.get(`/contacts/search?query=${query}`);
  }

  /**
   * Import contacts from a file
   * @param {File} file - CSV or Excel file
   * @param {Object} options - Import options
   * @returns {Promise} - API response
   */
  importContacts(file, options = {}) {
    const formData = new FormData();
    formData.append('file', file);

    Object.keys(options).forEach(key => {
      formData.append(key, options[key]);
    });

    return api.post('/contacts/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  /**
   * Export contacts
   * @param {Object} filters - Filters to apply
   * @param {string} format - Export format (csv, xlsx)
   * @returns {Promise} - API response
   */
  exportContacts(filters = {}, format = 'csv') {
    return api.get('/contacts/export', {
      params: { ...filters, format },
      responseType: 'blob'
    });
  }
}

export default new ContactService();