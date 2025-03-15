// packages/backend/src/main/java/com/crm/module/opportunity/mapper/OpportunityMapper.java
package com.enterprise.module.opportunity.mapper;

import com.enterprise.module.opportunity.dto.OpportunityDto;
import com.enterprise.module.opportunity.entity.Opportunity;

public interface OpportunityMapper {
    OpportunityDto toDto(Opportunity opportunity);
    Opportunity toEntity(OpportunityDto opportunityDto);
    void updateEntityFromDto(OpportunityDto opportunityDto, Opportunity opportunity);
}