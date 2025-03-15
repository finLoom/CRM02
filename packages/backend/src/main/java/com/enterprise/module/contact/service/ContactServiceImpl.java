// packages/backend/src/main/java/com/crm/module/contact/service/ContactServiceImpl.java
package com.enterprise.module.contact.service;

import com.enterprise.module.contact.dto.ContactDto;
import com.enterprise.module.contact.entity.Contact;
import com.enterprise.module.contact.mapper.ContactMapper;
import com.enterprise.module.contact.repository.ContactRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {
    private final ContactRepository contactRepository;
    private final ContactMapper contactMapper;
    
    @PostConstruct
    public void init() {
        // Create dummy data only if repository is empty
        if (contactRepository.count() == 0) {
            createDummyContacts();
        }
    }
    
    /**
     * Create dummy contacts for testing
     */
    private void createDummyContacts() {
        // Add sample contacts
        createContact(ContactDto.builder()
                .firstName("John")
                .lastName("Smith")
                .email("john.smith@acmecorp.com")
                .phone("(555) 123-4567")
                .mobile("(555) 987-6543")
                .title("CEO")
                .department("Executive")
                .accountName("Acme Corporation")
                .mailingStreet("123 Main St")
                .mailingCity("San Francisco")
                .mailingState("CA")
                .mailingZip("94105")
                .mailingCountry("USA")
                .assignedTo("Jane Cooper")
                .build());
        
        createContact(ContactDto.builder()
                .firstName("Emily")
                .lastName("Johnson")
                .email("emily.johnson@techco.com")
                .phone("(555) 234-5678")
                .mobile("(555) 876-5432")
                .title("CTO")
                .department("Technology")
                .accountName("Tech Co")
                .mailingStreet("456 Market St")
                .mailingCity("San Francisco")
                .mailingState("CA")
                .mailingZip("94105")
                .mailingCountry("USA")
                .assignedTo("Jane Cooper")
                .build());
    }
    
    @Override
    public List<ContactDto> getAllContacts() {
        return contactRepository.findAll().stream()
                .map(contactMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public ContactDto getContactById(Long id) {
        return contactRepository.findById(id)
                .map(contactMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
    }
    
    @Override
    public ContactDto createContact(ContactDto contactDto) {
        Contact contact = contactMapper.toEntity(contactDto);
        
        // Set timestamps
        LocalDateTime now = LocalDateTime.now();
        contact.setCreatedAt(now);
        contact.setUpdatedAt(now);
        
        Contact savedContact = contactRepository.save(contact);
        return contactMapper.toDto(savedContact);
    }
    
    @Override
    public ContactDto updateContact(Long id, ContactDto contactDto) {
        Contact existingContact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
        
        contactMapper.updateEntityFromDto(contactDto, existingContact);
        existingContact.setUpdatedAt(LocalDateTime.now());
        
        Contact updatedContact = contactRepository.save(existingContact);
        return contactMapper.toDto(updatedContact);
    }
    
    @Override
    public boolean deleteContact(Long id) {
        if (contactRepository.existsById(id)) {
            contactRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    @Override
    public List<ContactDto> getContactsByAccountName(String accountName) {
        return contactRepository.findByAccountName(accountName).stream()
                .map(contactMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ContactDto> getContactsByAssignee(String assignee) {
        return contactRepository.findByAssignedTo(assignee).stream()
                .map(contactMapper::toDto)
                .collect(Collectors.toList());
    }
}