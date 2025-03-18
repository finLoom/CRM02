package com.enterprise.modules.tasks.dto;

import com.enterprise.modules.tasks.entity.TaskModule;
import com.enterprise.modules.tasks.entity.TaskPriority;
import com.enterprise.modules.tasks.entity.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Data Transfer Object for Task entity.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskDto {

    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    private String title;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    private LocalDateTime dueDate;

    private TaskPriority priority;

    private TaskStatus status;

    private LocalDateTime completionDate;

    private LocalDateTime reminderTime;

    private Integer completionPercentage;

    private Float estimatedHours;

    private Float actualHours;

    private Long assignedToId;

    private String assignedToName;

    private Long createdById;

    private String createdByName;

    private Long parentTaskId;

    private String parentTaskTitle;

    private Long teamId;

    private String teamName;

    private TaskModule module;

    private Set<TaskRelatedObjectDto> relatedObjects = new HashSet<>();

    private Set<TaskDto> subtasks = new HashSet<>();

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}