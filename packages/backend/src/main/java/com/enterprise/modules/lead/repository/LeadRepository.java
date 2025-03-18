// File: backend/src/main/java/com/enterprise/modules/lead/repository/LeadRepository.java
package com.enterprise.modules.lead.repository;

import com.enterprise.modules.lead.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    /**
     * Find leads by status
     * @param status the status to search for
     * @return list of leads with the specified status
     */
    List<Lead> findByStatus(String status);

    /**
     * Find leads assigned to a specific user
     * @param assignedTo the user to search for
     * @return list of leads assigned to the specified user
     */
    List<Lead> findByAssignedTo(String assignedTo);
}