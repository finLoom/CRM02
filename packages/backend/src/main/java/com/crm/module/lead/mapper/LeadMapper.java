package main.java.com.crm.module.lead.mapper;
   
import main.java.com.crm.module.lead.dto.LeadDto;
import main.java.com.crm.module.lead.entity.Lead;

public interface LeadMapper {
    LeadDto toDto(Lead lead);
    Lead toEntity(LeadDto leadDto);
    void updateEntityFromDto(LeadDto leadDto, Lead lead);
}