// packages/backend/src/main/java/com/crm/modules/contacts/mapper/ContactMapper.java
package com.enterprise.modules.contacts.mapper;

import com.enterprise.modules.contacts.dto.ContactDto;
import com.enterprise.modules.contacts.entity.Contact;

public interface ContactMapper {
    ContactDto toDto(Contact contact);
    Contact toEntity(ContactDto contactDto);
    void updateEntityFromDto(ContactDto contactDto, Contact contact);
}