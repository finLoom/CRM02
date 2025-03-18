package com.enterprise.modules.lead.mapper;
   
import com.enterprise.modules.lead.dto.LeadDto;
import com.enterprise.modules.lead.entity.Lead;
import org.springframework.stereotype.Component;

@Component
public class LeadMapperImpl implements LeadMapper {
    @Override
    public LeadDto toDto(Lead lead) {
        if (lead == null) {
            return null;
        }
        
        return LeadDto.builder()
                .id(lead.getId())
                .firstName(lead.getFirstName())
                .lastName(lead.getLastName())
                .email(lead.getEmail())
                .phone(lead.getPhone())
                .company(lead.getCompany())
                .status(lead.getStatus())
                .source(lead.getSource())
                .estimatedValue(lead.getEstimatedValue())
                .assignedTo(lead.getAssignedTo())
                .createdAt(lead.getCreatedAt())
                .updatedAt(lead.getUpdatedAt())
                .build();
    }
    
    @Override
    public Lead toEntity(LeadDto leadDto) {
        if (leadDto == null) {
            return null;
        }
        
        return Lead.builder()
                .id(leadDto.getId())
                .firstName(leadDto.getFirstName())
                .lastName(leadDto.getLastName())
                .email(leadDto.getEmail())
                .phone(leadDto.getPhone())
                .company(leadDto.getCompany())
                .status(leadDto.getStatus())
                .source(leadDto.getSource())
                .estimatedValue(leadDto.getEstimatedValue())
                .assignedTo(leadDto.getAssignedTo())
                .createdAt(leadDto.getCreatedAt())
                .updatedAt(leadDto.getUpdatedAt())
                .build();
    }
    
    @Override
    public void updateEntityFromDto(LeadDto leadDto, Lead lead) {
        if (leadDto == null || lead == null) {
            return;
        }
        
        lead.setFirstName(leadDto.getFirstName());
        lead.setLastName(leadDto.getLastName());
        lead.setEmail(leadDto.getEmail());
        lead.setPhone(leadDto.getPhone());
        lead.setCompany(leadDto.getCompany());
        lead.setStatus(leadDto.getStatus());
        lead.setSource(leadDto.getSource());
        lead.setEstimatedValue(leadDto.getEstimatedValue());
        lead.setAssignedTo(leadDto.getAssignedTo());
    }
}
