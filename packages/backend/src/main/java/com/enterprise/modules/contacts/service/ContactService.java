// packages/backend/src/main/java/com/crm/modules/contacts/service/ContactService.java
package com.enterprise.modules.contacts.service;

import com.enterprise.modules.contacts.dto.ContactDto;
import java.util.List;

public interface ContactService {
    /**
     * Get all contacts
     * @return List of all contacts
     */
    List<ContactDto> getAllContacts();
    
    /**
     * Get a contacts by ID
     * @param id Contact ID
     * @return Contact with the specified ID
     */
    ContactDto getContactById(Long id);
    
    /**
     * Create a new contacts
     * @param contactDto Contact data
     * @return Created contacts with generated ID
     */
    ContactDto createContact(ContactDto contactDto);
    
    /**
     * Update an existing contacts
     * @param id Contact ID
     * @param contactDto Updated contacts data
     * @return Updated contacts
     */
    ContactDto updateContact(Long id, ContactDto contactDto);
    
    /**
     * Delete a contacts
     * @param id Contact ID
     * @return true if contacts was deleted, false if not found
     */
    boolean deleteContact(Long id);
    
    /**
     * Get contacts filtered by account name
     * @param accountName Account name
     * @return List of contacts with the specified account name
     */
    List<ContactDto> getContactsByAccountName(String accountName);
    
    /**
     * Get contacts filtered by assignee
     * @param assignee Assignee name
     * @return List of contacts assigned to the specified assignee
     */
    List<ContactDto> getContactsByAssignee(String assignee);
}