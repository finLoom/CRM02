// packages/backend/src/main/java/com/crm/module/opportunity/mapper/OpportunityMapperImpl.java
package main.java.com.crm.module.opportunity.mapper;

import main.java.com.crm.module.opportunity.dto.OpportunityDto;
import main.java.com.crm.module.opportunity.entity.Opportunity;
import org.springframework.stereotype.Component;

@Component
public class OpportunityMapperImpl implements OpportunityMapper {
    @Override
    public OpportunityDto toDto(Opportunity opportunity) {
        if (opportunity == null) {
            return null;
        }
        
        return OpportunityDto.builder()
                .id(opportunity.getId())
                .name(opportunity.getName())
                .accountName(opportunity.getAccountName())
                .stage(opportunity.getStage())
                .amount(opportunity.getAmount())
                .probability(opportunity.getProbability())
                .closeDate(opportunity.getCloseDate())
                .type(opportunity.getType())
                .leadSource(opportunity.getLeadSource())
                .campaignSource(opportunity.getCampaignSource())
                .description(opportunity.getDescription())
                .nextStep(opportunity.getNextStep())
                .contactName(opportunity.getContactName())
                .contactId(opportunity.getContactId())
                .assignedTo(opportunity.getAssignedTo())
                .createdAt(opportunity.getCreatedAt())
                .updatedAt(opportunity.getUpdatedAt())
                .build();
    }
    
    @Override
    public Opportunity toEntity(OpportunityDto opportunityDto) {
        if (opportunityDto == null) {
            return null;
        }
        
        return Opportunity.builder()
                .id(opportunityDto.getId())
                .name(opportunityDto.getName())
                .accountName(opportunityDto.getAccountName())
                .stage(opportunityDto.getStage())
                .amount(opportunityDto.getAmount())
                .probability(opportunityDto.getProbability())
                .closeDate(opportunityDto.getCloseDate())
                .type(opportunityDto.getType())
                .leadSource(opportunityDto.getLeadSource())
                .campaignSource(opportunityDto.getCampaignSource())
                .description(opportunityDto.getDescription())
                .nextStep(opportunityDto.getNextStep())
                .contactName(opportunityDto.getContactName())
                .contactId(opportunityDto.getContactId())
                .assignedTo(opportunityDto.getAssignedTo())
                .createdAt(opportunityDto.getCreatedAt())
                .updatedAt(opportunityDto.getUpdatedAt())
                .build();
    }
    
    @Override
    public void updateEntityFromDto(OpportunityDto opportunityDto, Opportunity opportunity) {
        if (opportunityDto == null || opportunity == null) {
            return;
        }
        
        opportunity.setName(opportunityDto.getName());
        opportunity.setAccountName(opportunityDto.getAccountName());
        opportunity.setStage(opportunityDto.getStage());
        opportunity.setAmount(opportunityDto.getAmount());
        opportunity.setProbability(opportunityDto.getProbability());
        opportunity.setCloseDate(opportunityDto.getCloseDate());
        opportunity.setType(opportunityDto.getType());
        opportunity.setLeadSource(opportunityDto.getLeadSource());
        opportunity.setCampaignSource(opportunityDto.getCampaignSource());
        opportunity.setDescription(opportunityDto.getDescription());
        opportunity.setNextStep(opportunityDto.getNextStep());
        opportunity.setContactName(opportunityDto.getContactName());
        opportunity.setContactId(opportunityDto.getContactId());
        opportunity.setAssignedTo(opportunityDto.getAssignedTo());
    }
}