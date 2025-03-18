// packages/backend/src/main/java/com/crm/modules/opportunity/mapper/OpportunityMapper.java
package com.enterprise.modules.opportunity.mapper;

import com.enterprise.modules.opportunity.dto.OpportunityDto;
import com.enterprise.modules.opportunity.entity.Opportunity;

public interface OpportunityMapper {
    OpportunityDto toDto(Opportunity opportunity);
    Opportunity toEntity(OpportunityDto opportunityDto);
    void updateEntityFromDto(OpportunityDto opportunityDto, Opportunity opportunity);
}