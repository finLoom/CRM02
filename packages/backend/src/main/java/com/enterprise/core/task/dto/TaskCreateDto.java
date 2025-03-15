package com.enterprise.core.task.dto;

import com.enterprise.core.task.entity.TaskModule;
import com.enterprise.core.task.entity.TaskPriority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskCreateDto {

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    private String title;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    private LocalDateTime dueDate;

    private TaskPriority priority;

    private TaskModule module;

    private Long assignedToId;

    private Long teamId;

    private Long parentTaskId;

    private Float estimatedHours;

    private LocalDateTime reminderTime;

    private Set<TaskRelatedObjectCreateDto> relatedObjects = new HashSet<>();
}