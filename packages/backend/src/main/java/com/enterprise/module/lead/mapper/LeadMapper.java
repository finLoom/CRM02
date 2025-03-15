package com.enterprise.module.lead.mapper;
   
import com.enterprise.module.lead.dto.LeadDto;
import com.enterprise.module.lead.entity.Lead;

public interface LeadMapper {
    LeadDto toDto(Lead lead);
    Lead toEntity(LeadDto leadDto);
    void updateEntityFromDto(LeadDto leadDto, Lead lead);
}