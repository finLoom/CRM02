// packages/backend/src/main/java/com/crm/module/opportunity/repository/OpportunityRepository.java
package main.java.com.crm.module.opportunity.repository;

import main.java.com.crm.module.opportunity.entity.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
    List<Opportunity> findByAccountName(String accountName);
    List<Opportunity> findByStage(String stage);
    List<Opportunity> findByAssignedTo(String assignee);
}