// packages/backend/src/main/java/com/crm/module/opportunity/dto/OpportunityDto.java
package com.enterprise.module.opportunity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OpportunityDto {
    private Long id;
    private String name;
    private String accountName;
    private String stage;
    private Double amount;
    private Double probability;
    private LocalDate closeDate;
    private String type;
    private String leadSource;
    private String campaignSource;
    private String description;
    private String nextStep;
    private String contactName;
    private Long contactId;
    private String assignedTo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}