// packages/backend/src/main/java/com/crm/modules/opportunity/repository/OpportunityRepository.java
package com.enterprise.modules.opportunity.repository;

import com.enterprise.modules.opportunity.entity.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
    List<Opportunity> findByAccountName(String accountName);
    List<Opportunity> findByStage(String stage);
    List<Opportunity> findByAssignedTo(String assignee);
}