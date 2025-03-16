// File: packages/backend/src/main/java/com/enterprise/module/lead/mapper/LeadMapper.java
package com.enterprise.module.lead.mapper;

import com.enterprise.module.lead.dto.LeadDto;
import com.enterprise.module.lead.entity.Lead;

/**
 * Mapper for converting between Lead entities and DTOs
 */
public interface LeadMapper {
    /**
     * Convert Lead entity to LeadDto
     * @param lead the entity to convert
     * @return the converted DTO
     */
    LeadDto toDto(Lead lead);

    /**
     * Convert LeadDto to Lead entity
     * @param leadDto the DTO to convert
     * @return the converted entity
     */
    Lead toEntity(LeadDto leadDto);

    /**
     * Update an existing Lead entity from a LeadDto
     * @param leadDto the source DTO
     * @param lead the entity to update
     */
    void updateEntityFromDto(LeadDto leadDto, Lead lead);
}