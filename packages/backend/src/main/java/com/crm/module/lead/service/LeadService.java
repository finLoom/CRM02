package main.java.com.crm.module.lead.service;
   
import main.java.com.crm.module.lead.dto.LeadDto;
import java.util.List;

public interface LeadService {
    List<LeadDto> getAllLeads();
    LeadDto getLeadById(Long id);
    LeadDto createLead(LeadDto leadDto);
    LeadDto updateLead(Long id, LeadDto leadDto);
    boolean deleteLead(Long id);
    List<LeadDto> getLeadsByStatus(String status);
    List<LeadDto> getLeadsByAssignee(String assignee);
}