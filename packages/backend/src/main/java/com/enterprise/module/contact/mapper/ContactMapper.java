// packages/backend/src/main/java/com/crm/module/contact/mapper/ContactMapper.java
package com.enterprise.module.contact.mapper;

import com.enterprise.module.contact.dto.ContactDto;
import com.enterprise.module.contact.entity.Contact;

public interface ContactMapper {
    ContactDto toDto(Contact contact);
    Contact toEntity(ContactDto contactDto);
    void updateEntityFromDto(ContactDto contactDto, Contact contact);
}