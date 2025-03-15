// File: backend/src/main/java/com/enterprise/module/lead/mapper/LeadMapper.java
package com.enterprise.module.lead.mapper;

import com.enterprise.module.lead.dto.LeadDto;
import com.enterprise.module.lead.entity.Lead;
import org.springframework.stereotype.Component;

@Component
public class LeadMapper {
    public LeadDto toDto(Lead lead) {
        // Implementation
        return new LeadDto();
    }

    public Lead toEntity(LeadDto leadDto) {
        // Implementation
        return new Lead();
    }
}