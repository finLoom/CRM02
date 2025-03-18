// packages/backend/src/main/java/com/crm/modules/opportunity/service/OpportunityService.java
package com.enterprise.modules.opportunity.service;

import com.enterprise.modules.opportunity.dto.OpportunityDto;
import java.util.List;

public interface OpportunityService {
    /**
     * Get all opportunities
     * @return List of all opportunities
     */
    List<OpportunityDto> getAllOpportunities();
    
    /**
     * Get an opportunity by ID
     * @param id Opportunity ID
     * @return Opportunity with the specified ID
     */
    OpportunityDto getOpportunityById(Long id);
    
    /**
     * Create a new opportunity
     * @param opportunityDto Opportunity data
     * @return Created opportunity with generated ID
     */
    OpportunityDto createOpportunity(OpportunityDto opportunityDto);
    
    /**
     * Update an existing opportunity
     * @param id Opportunity ID
     * @param opportunityDto Updated opportunity data
     * @return Updated opportunity
     */
    OpportunityDto updateOpportunity(Long id, OpportunityDto opportunityDto);
    
    /**
     * Delete an opportunity
     * @param id Opportunity ID
     * @return true if opportunity was deleted, false if not found
     */
    boolean deleteOpportunity(Long id);
    
    /**
     * Delete multiple opportunities
     * @param ids List of opportunity IDs to delete
     * @return Number of opportunities deleted
     */
    int deleteOpportunities(List<Long> ids);
    
    /**
     * Get opportunities filtered by account name
     * @param accountName Account name
     * @return List of opportunities with the specified account name
     */
    List<OpportunityDto> getOpportunitiesByAccountName(String accountName);
    
    /**
     * Get opportunities filtered by stage
     * @param stage Stage name
     * @return List of opportunities in the specified stage
     */
    List<OpportunityDto> getOpportunitiesByStage(String stage);
    
    /**
     * Get opportunities filtered by status
     * @param status Status (Open or Closed)
     * @return List of opportunities with the specified status
     */
    List<OpportunityDto> getOpportunitiesByStatus(String status);
    
    /**
     * Get opportunities filtered by assignee
     * @param assignee Assignee name
     * @return List of opportunities assigned to the specified assignee
     */
    List<OpportunityDto> getOpportunitiesByAssignee(String assignee);
    
    /**
     * Search opportunities by name, account name, or contacts name
     * @param query Search query
     * @return List of opportunities matching the search query
     */
    List<OpportunityDto> searchOpportunities(String query);
}