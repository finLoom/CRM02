// File: backend/src/main/java/com/enterprise/core/tasks/entity/TaskStatus.java
package com.enterprise.modules.tasks.entity;

/**
 * Represents the possible status values for tasks.
 */
public enum TaskStatus {
    NOT_STARTED,
    IN_PROGRESS,
    COMPLETED,
    DEFERRED,
    BLOCKED
}