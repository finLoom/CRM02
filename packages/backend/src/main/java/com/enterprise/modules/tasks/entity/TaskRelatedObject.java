// File: backend/src/main/java/com/enterprise/core/tasks/entity/TaskRelatedObject.java
package com.enterprise.modules.tasks.entity;

import com.enterprise.core.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.persistence.*;

/**
 * Entity that represents the relationship between a tasks and
 * another object in the system (Contact, Opportunity, Invoice, etc.)
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "task_related_objects")
public class TaskRelatedObject extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @Column(name = "object_type", nullable = false)
    private String objectType;  // "CONTACT", "OPPORTUNITY", "INVOICE", "EMPLOYEE", etc.

    @Column(name = "object_id", nullable = false)
    private Long objectId;

    // Optional additional metadata about the relationship
    @Column(name = "relationship_type")
    private String relationshipType; // "OWNER", "PARTICIPANT", "VIEWER", etc.
}