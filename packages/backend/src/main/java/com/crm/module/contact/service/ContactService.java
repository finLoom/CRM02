// packages/backend/src/main/java/com/crm/module/contact/service/ContactService.java
package main.java.com.crm.module.contact.service;

import main.java.com.crm.module.contact.dto.ContactDto;
import java.util.List;

public interface ContactService {
    /**
     * Get all contacts
     * @return List of all contacts
     */
    List<ContactDto> getAllContacts();
    
    /**
     * Get a contact by ID
     * @param id Contact ID
     * @return Contact with the specified ID
     */
    ContactDto getContactById(Long id);
    
    /**
     * Create a new contact
     * @param contactDto Contact data
     * @return Created contact with generated ID
     */
    ContactDto createContact(ContactDto contactDto);
    
    /**
     * Update an existing contact
     * @param id Contact ID
     * @param contactDto Updated contact data
     * @return Updated contact
     */
    ContactDto updateContact(Long id, ContactDto contactDto);
    
    /**
     * Delete a contact
     * @param id Contact ID
     * @return true if contact was deleted, false if not found
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