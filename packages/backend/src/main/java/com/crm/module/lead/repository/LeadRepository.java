// src/main/java/com/crm/module/lead/repository/LeadRepository.java
package main.java.com.crm.module.lead.repository;

import main.java.com.crm.module.lead.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    List<Lead> findByStatus(String status);
    List<Lead> findByAssignedTo(String assignee);

}