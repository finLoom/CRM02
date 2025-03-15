// packages/backend/src/main/java/com/crm/module/contact/mapper/ContactMapperImpl.java
package main.java.com.crm.module.contact.mapper;

import main.java.com.crm.module.contact.dto.ContactDto;
import main.java.com.crm.module.contact.entity.Contact;
import org.springframework.stereotype.Component;

@Component
public class ContactMapperImpl implements ContactMapper {
    @Override
    public ContactDto toDto(Contact contact) {
        if (contact == null) {
            return null;
        }
        
        return ContactDto.builder()
                .id(contact.getId())
                .firstName(contact.getFirstName())
                .lastName(contact.getLastName())
                .email(contact.getEmail())
                .phone(contact.getPhone())
                .mobile(contact.getMobile())
                .title(contact.getTitle())
                .department(contact.getDepartment())
                .accountName(contact.getAccountName())
                .reportingManager(contact.getReportingManager())
                .mailingStreet(contact.getMailingStreet())
                .mailingCity(contact.getMailingCity())
                .mailingState(contact.getMailingState())
                .mailingZip(contact.getMailingZip())
                .mailingCountry(contact.getMailingCountry())
                .assignedTo(contact.getAssignedTo())
                .createdAt(contact.getCreatedAt())
                .updatedAt(contact.getUpdatedAt())
                .build();
    }
    
    @Override
    public Contact toEntity(ContactDto contactDto) {
        if (contactDto == null) {
            return null;
        }
        
        return Contact.builder()
                .id(contactDto.getId())
                .firstName(contactDto.getFirstName())
                .lastName(contactDto.getLastName())
                .email(contactDto.getEmail())
                .phone(contactDto.getPhone())
                .mobile(contactDto.getMobile())
                .title(contactDto.getTitle())
                .department(contactDto.getDepartment())
                .accountName(contactDto.getAccountName())
                .reportingManager(contactDto.getReportingManager())
                .mailingStreet(contactDto.getMailingStreet())
                .mailingCity(contactDto.getMailingCity())
                .mailingState(contactDto.getMailingState())
                .mailingZip(contactDto.getMailingZip())
                .mailingCountry(contactDto.getMailingCountry())
                .assignedTo(contactDto.getAssignedTo())
                .createdAt(contactDto.getCreatedAt())
                .updatedAt(contactDto.getUpdatedAt())
                .build();
    }
    
    @Override
    public void updateEntityFromDto(ContactDto contactDto, Contact contact) {
        if (contactDto == null || contact == null) {
            return;
        }
        
        contact.setFirstName(contactDto.getFirstName());
        contact.setLastName(contactDto.getLastName());
        contact.setEmail(contactDto.getEmail());
        contact.setPhone(contactDto.getPhone());
        contact.setMobile(contactDto.getMobile());
        contact.setTitle(contactDto.getTitle());
        contact.setDepartment(contactDto.getDepartment());
        contact.setAccountName(contactDto.getAccountName());
        contact.setReportingManager(contactDto.getReportingManager());
        contact.setMailingStreet(contactDto.getMailingStreet());
        contact.setMailingCity(contactDto.getMailingCity());
        contact.setMailingState(contactDto.getMailingState());
        contact.setMailingZip(contactDto.getMailingZip());
        contact.setMailingCountry(contactDto.getMailingCountry());
        contact.setAssignedTo(contactDto.getAssignedTo());
    }
}