// packages/backend/src/main/java/com/crm/module/contact/mapper/ContactMapper.java
package main.java.com.crm.module.contact.mapper;

import main.java.com.crm.module.contact.dto.ContactDto;
import main.java.com.crm.module.contact.entity.Contact;

public interface ContactMapper {
    ContactDto toDto(Contact contact);
    Contact toEntity(ContactDto contactDto);
    void updateEntityFromDto(ContactDto contactDto, Contact contact);
}