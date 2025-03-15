// packages/backend/src/main/java/com/crm/module/opportunity/service/OpportunityServiceImpl.java
package main.java.com.crm.module.opportunity.service;

import main.java.com.crm.module.opportunity.dto.OpportunityDto;
import main.java.com.crm.module.opportunity.entity.Opportunity;
import main.java.com.crm.module.opportunity.mapper.OpportunityMapper;
import main.java.com.crm.module.opportunity.repository.OpportunityRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OpportunityServiceImpl implements OpportunityService {
    private final OpportunityRepository opportunityRepository;
    private final OpportunityMapper opportunityMapper;
    
    @PostConstruct
    public void init() {
        // Create dummy data only if repository is empty
        if (opportunityRepository.count() == 0) {
            createDummyOpportunities();
        }
    }
    
    /**
     * Create dummy opportunities for testing
     */
    private void createDummyOpportunities() {
        // Add sample opportunities
        createOpportunity(OpportunityDto.builder()
                .name("Enterprise Software License")
                .accountName("Acme Corp")
                .stage("Qualification")
                .amount(45000.00)
                .probability(30.0)
                .closeDate(LocalDate.now().plusDays(30))
                .type("New Business")
                .leadSource("Website")
                .nextStep("Schedule demo with IT team")
                .contactName("John Smith")
                .assignedTo("Jane Cooper")
                .build());
        
        createOpportunity(OpportunityDto.builder()
                .name("Consulting Services")
                .accountName("XYZ Industries")
                .stage("Proposal")
                .amount(12800.00)
                .probability(50.0)
                .closeDate(LocalDate.now().plusDays(15))
                .type("Existing Business")
                .leadSource("Partner Referral")
                .nextStep("Follow up on contract review")
                .contactName("Sarah Johnson")
                .assignedTo("Jane Cooper")
                .build());
                
        createOpportunity(OpportunityDto.builder()
                .name("Hardware Upgrade")
                .accountName("Global Tech")
                .stage("Negotiation")
                .amount(28000.00)
                .probability(75.0)
                .closeDate(LocalDate.now().plusDays(10))
                .type("Existing Business")
                .leadSource("Email Campaign")
                .nextStep("Schedule final negotiation call")
                .contactName("Michael Brown")
                .assignedTo("Robert Fox")
                .build());
                
        createOpportunity(OpportunityDto.builder()
                .name("Support Contract")
                .accountName("Local Services")
                .stage("Discovery")
                .amount(5600.00)
                .probability(20.0)
                .closeDate(LocalDate.now().plusDays(60))
                .type("New Business")
                .leadSource("Website")
                .nextStep("Initial requirements gathering")
                .contactName("Emily Davis")
                .assignedTo("Jane Cooper")
                .build());
                
        createOpportunity(OpportunityDto.builder()
                .name("Cloud Migration")
                .accountName("Big Enterprises")
                .stage("Proposal")
                .amount(32000.00)
                .probability(45.0)
                .closeDate(LocalDate.now().plusDays(20))
                .type("New Business")
                .leadSource("Trade Show")
                .nextStep("Send proposal documents")
                .contactName("Robert Wilson")
                .assignedTo("Robert Fox")
                .build());
                
        createOpportunity(OpportunityDto.builder()
                .name("Software Subscription")
                .accountName("Tech Innovations")
                .stage("Closed Won")
                .amount(18500.00)
                .probability(100.0)
                .closeDate(LocalDate.now().minusDays(5))
                .type("New Business")
                .leadSource("Website")
                .nextStep("Implementation kickoff")
                .contactName("Lisa Anderson")
                .assignedTo("Jane Cooper")
                .build());
                
        createOpportunity(OpportunityDto.builder()
                .name("Training Package")
                .accountName("Smart Solutions")
                .stage("Closed Lost")
                .amount(9500.00)
                .probability(0.0)
                .closeDate(LocalDate.now().minusDays(10))
                .type("Existing Business")
                .leadSource("Email Campaign")
                .nextStep("None")
                .contactName("David Martinez")
                .assignedTo("Robert Fox")
                .build());
    }
    
    @Override
    public List<OpportunityDto> getAllOpportunities() {
        return opportunityRepository.findAll().stream()
                .map(opportunityMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public OpportunityDto getOpportunityById(Long id) {
        return opportunityRepository.findById(id)
                .map(opportunityMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Opportunity not found with id: " + id));
    }
    
    @Override
    public OpportunityDto createOpportunity(OpportunityDto opportunityDto) {
        Opportunity opportunity = opportunityMapper.toEntity(opportunityDto);
        
        // Set timestamps
        LocalDateTime now = LocalDateTime.now();
        opportunity.setCreatedAt(now);
        opportunity.setUpdatedAt(now);
        
        Opportunity savedOpportunity = opportunityRepository.save(opportunity);
        return opportunityMapper.toDto(savedOpportunity);
    }
    
    @Override
    public OpportunityDto updateOpportunity(Long id, OpportunityDto opportunityDto) {
        Opportunity existingOpportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Opportunity not found with id: " + id));
        
        opportunityMapper.updateEntityFromDto(opportunityDto, existingOpportunity);
        existingOpportunity.setUpdatedAt(LocalDateTime.now());
        
        Opportunity updatedOpportunity = opportunityRepository.save(existingOpportunity);
        return opportunityMapper.toDto(updatedOpportunity);
    }
    
    @Override
    public boolean deleteOpportunity(Long id) {
        if (opportunityRepository.existsById(id)) {
            opportunityRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    @Override
    @Transactional
    public int deleteOpportunities(List<Long> ids) {
        int count = 0;
        for (Long id : ids) {
            if (opportunityRepository.existsById(id)) {
                opportunityRepository.deleteById(id);
                count++;
            }
        }
        return count;
    }
    
    @Override
    public List<OpportunityDto> getOpportunitiesByAccountName(String accountName) {
        return opportunityRepository.findByAccountName(accountName).stream()
                .map(opportunityMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<OpportunityDto> getOpportunitiesByStage(String stage) {
        return opportunityRepository.findByStage(stage).stream()
                .map(opportunityMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<OpportunityDto> getOpportunitiesByStatus(String status) {
        List<Opportunity> opportunities;
        
        if ("Open".equalsIgnoreCase(status)) {
            // Get all opportunities that are not Closed Won or Closed Lost
            opportunities = opportunityRepository.findAll().stream()
                .filter(opp -> !opp.getStage().startsWith("Closed"))
                .collect(Collectors.toList());
        } else if ("Closed".equalsIgnoreCase(status)) {
            // Get all opportunities that are Closed Won or Closed Lost
            opportunities = opportunityRepository.findAll().stream()
                .filter(opp -> opp.getStage().startsWith("Closed"))
                .collect(Collectors.toList());
        } else {
            throw new IllegalArgumentException("Invalid status: " + status);
        }
        
        return opportunities.stream()
                .map(opportunityMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<OpportunityDto> getOpportunitiesByAssignee(String assignee) {
        return opportunityRepository.findByAssignedTo(assignee).stream()
                .map(opportunityMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<OpportunityDto> searchOpportunities(String query) {
        String lowerCaseQuery = query.toLowerCase();
        
        return opportunityRepository.findAll().stream()
                .filter(opp -> 
                    (opp.getName() != null && opp.getName().toLowerCase().contains(lowerCaseQuery)) ||
                    (opp.getAccountName() != null && opp.getAccountName().toLowerCase().contains(lowerCaseQuery)) ||
                    (opp.getContactName() != null && opp.getContactName().toLowerCase().contains(lowerCaseQuery))
                )
                .map(opportunityMapper::toDto)
                .collect(Collectors.toList());
    }
}