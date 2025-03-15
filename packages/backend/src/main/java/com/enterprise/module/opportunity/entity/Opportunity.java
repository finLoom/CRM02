// packages/backend/src/main/java/com/crm/module/opportunity/entity/Opportunity.java
package com.enterprise.module.opportunity.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "opportunities")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Opportunity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "account_name")
    private String accountName;
    
    private String stage;
    private Double amount;
    private Double probability;
    
    @Column(name = "close_date")
    private LocalDate closeDate;
    
    private String type;
    
    @Column(name = "lead_source")
    private String leadSource;
    
    @Column(name = "campaign_source")
    private String campaignSource;
    
    private String description;
    
    @Column(name = "next_step")
    private String nextStep;
    
    @Column(name = "contact_name")
    private String contactName;
    
    @Column(name = "contact_id")
    private Long contactId;
    
    @Column(name = "assigned_to")
    private String assignedTo;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}