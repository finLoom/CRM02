// packages/backend/src/main/java/com/crm/module/opportunity/mapper/OpportunityMapper.java
package main.java.com.crm.module.opportunity.mapper;

import main.java.com.crm.module.opportunity.dto.OpportunityDto;
import main.java.com.crm.module.opportunity.entity.Opportunity;

public interface OpportunityMapper {
    OpportunityDto toDto(Opportunity opportunity);
    Opportunity toEntity(OpportunityDto opportunityDto);
    void updateEntityFromDto(OpportunityDto opportunityDto, Opportunity opportunity);
}