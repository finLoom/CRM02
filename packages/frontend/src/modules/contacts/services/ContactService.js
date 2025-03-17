// src/services/ContactService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class ContactService {
  getAllContacts() {
    console.log('Fetching all contacts...');
    return axios.get(`${API_URL}/contacts`)
      .then(response => {
        console.log('Contacts data:', response.data);
        return response;
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
        throw error;
      });
  }

  getContactById(id) {
    return axios.get(`${API_URL}/contacts/${id}`);
  }

  createContact(contact) {
    return axios.post(`${API_URL}/contacts`, contact);
  }

  updateContact(id, contact) {
    return axios.put(`${API_URL}/contacts/${id}`, contact);
  }

  deleteContact(id) {
    return axios.delete(`${API_URL}/contacts/${id}`);
  }

  getContactsByAccountName(accountName) {
    return axios.get(`${API_URL}/contacts/account/${accountName}`);
  }

  getContactsByAssignee(assignee) {
    return axios.get(`${API_URL}/contacts/assignee/${assignee}`);
  }

  searchContacts(query) {
    return axios.get(`${API_URL}/contacts/search?query=${query}`);
  }
}

export default new ContactService();