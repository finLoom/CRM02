// packages/backend/src/main/java/com/crm/modules/contacts/repository/ContactRepository.java
package com.enterprise.modules.contacts.repository;

import com.enterprise.modules.contacts.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByAccountName(String accountName);
    List<Contact> findByAssignedTo(String assignee);
}