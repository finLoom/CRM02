// packages/backend/src/main/java/com/crm/module/contact/repository/ContactRepository.java
package com.enterprise.module.contact.repository;

import com.enterprise.module.contact.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByAccountName(String accountName);
    List<Contact> findByAssignedTo(String assignee);
}