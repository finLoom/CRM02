// package com.enterprise.module.lead.service;
   
// import com.dto.lead.module.enterprise.LeadDto;
// import java.util.List;

// public interface LeadService {
//     List<LeadDto> getAllLeads();
//     LeadDto getLeadById(Long id);
//     LeadDto createLead(LeadDto leadDto);
//     LeadDto updateLead(Long id, LeadDto leadDto);
//     boolean deleteLead(Long id);
//     List<LeadDto> getLeadsByStatus(String status);
//     List<LeadDto> getLeadsByAssignee(String assignee);
// }


package com.enterprise.module.lead.service;
   
import com.enterprise.module.lead.dto.LeadDto;
import java.util.List;

public interface LeadService {
    /**
     * Get all leads
     * @return List of all leads
     */
    List<LeadDto> getAllLeads();
    
    /**
     * Get a lead by ID
     * @param id Lead ID
     * @return Lead with the specified ID
     */
    LeadDto getLeadById(Long id);
    
    /**
     * Create a new lead
     * @param leadDto Lead data
     * @return Created lead with generated ID
     */
    LeadDto createLead(LeadDto leadDto);
    
    /**
     * Update an existing lead
     * @param id Lead ID
     * @param leadDto Updated lead data
     * @return Updated lead
     */
    LeadDto updateLead(Long id, LeadDto leadDto);
    
    /**
     * Delete a lead
     * @param id Lead ID
     * @return true if lead was deleted, false if not found
     */
    boolean deleteLead(Long id);
    
    /**
     * Get leads filtered by status
     * @param status Lead status
     * @return List of leads with the specified status
     */
    List<LeadDto> getLeadsByStatus(String status);
    
    /**
     * Get leads filtered by assignee
     * @param assignee Assignee name
     * @return List of leads assigned to the specified assignee
     */
    List<LeadDto> getLeadsByAssignee(String assignee);
}