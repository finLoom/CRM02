// File: backend/src/main/java/com/enterprise/modules/tasks/entity/Task.java
package com.enterprise.modules.tasks.entity;

import com.enterprise.core.common.entity.BaseEntity;
import com.enterprise.core.team.entity.Team;
import com.enterprise.core.user.entity.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Entity representing a tasks in the system.
 * Tasks can be linked to multiple objects across different modules.
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "tasks")
public class Task extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Enumerated(EnumType.STRING)
    private TaskPriority priority = TaskPriority.MEDIUM;

    @Enumerated(EnumType.STRING)
    private TaskStatus status = TaskStatus.NOT_STARTED;

    @Column(name = "completion_date")
    private LocalDateTime completionDate;

    @Column(name = "reminder_time")
    private LocalDateTime reminderTime;

    @Column(name = "completion_percentage")
    private Integer completionPercentage = 0;

    @Column(name = "estimated_hours")
    private Float estimatedHours;

    @Column(name = "actual_hours")
    private Float actualHours;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to_id")
    private User assignedTo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", nullable = false)
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_task_id")
    private Task parentTask;

    @OneToMany(mappedBy = "parentTask", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Task> subtasks = new HashSet<>();

    // Fix here - change "tasks" to "task" to match the field name in TaskRelatedObject
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TaskRelatedObject> relatedObjects = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    // Module identification - which modules this tasks belongs to
    @Enumerated(EnumType.STRING)
    private TaskModule module;

    // Methods for managing relationships
    public void addSubtask(Task subtask) {
        subtasks.add(subtask);
        subtask.setParentTask(this);
    }

    public void removeSubtask(Task subtask) {
        subtasks.remove(subtask);
        subtask.setParentTask(null);
    }

    public void addRelatedObject(String objectType, Long objectId) {
        TaskRelatedObject relatedObject = new TaskRelatedObject();
        relatedObject.setTask(this);
        relatedObject.setObjectType(objectType);
        relatedObject.setObjectId(objectId);
        relatedObjects.add(relatedObject);
    }

    public void removeRelatedObject(TaskRelatedObject relatedObject) {
        relatedObjects.remove(relatedObject);
        relatedObject.setTask(null);
    }
}