// File: backend/src/main/java/com/enterprise/core/tasks/mapper/TaskMapper.java
package com.enterprise.modules.tasks.mapper;

import com.enterprise.modules.tasks.dto.TaskDto;
import com.enterprise.modules.tasks.dto.TaskRelatedObjectDto;
import com.enterprise.modules.tasks.entity.Task;
import com.enterprise.modules.tasks.entity.TaskRelatedObject;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class TaskMapper {

    public TaskDto toDto(Task task) {
        if (task == null) {
            return null;
        }

        TaskDto dto = new TaskDto();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setDueDate(task.getDueDate());
        dto.setPriority(task.getPriority());
        dto.setStatus(task.getStatus());
        dto.setCompletionDate(task.getCompletionDate());
        dto.setReminderTime(task.getReminderTime());
        dto.setCompletionPercentage(task.getCompletionPercentage());
        dto.setEstimatedHours(task.getEstimatedHours());
        dto.setActualHours(task.getActualHours());
        dto.setModule(task.getModule());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setUpdatedAt(task.getUpdatedAt());

        if (task.getAssignedTo() != null) {
            dto.setAssignedToId(task.getAssignedTo().getId());
            dto.setAssignedToName(task.getAssignedTo().getName());
        }

        if (task.getCreatedBy() != null) {
            dto.setCreatedById(task.getCreatedBy().getId());
            dto.setCreatedByName(task.getCreatedBy().getName());
        }

        if (task.getParentTask() != null) {
            dto.setParentTaskId(task.getParentTask().getId());
            dto.setParentTaskTitle(task.getParentTask().getTitle());
        }

        if (task.getTeam() != null) {
            dto.setTeamId(task.getTeam().getId());
            dto.setTeamName(task.getTeam().getName());
        }

        if (task.getRelatedObjects() != null) {
            dto.setRelatedObjects(task.getRelatedObjects().stream()
                    .map(this::toRelatedObjectDto)
                    .collect(Collectors.toSet()));
        }

        if (task.getSubtasks() != null) {
            dto.setSubtasks(task.getSubtasks().stream()
                    .map(this::toDto)
                    .collect(Collectors.toSet()));
        }

        return dto;
    }

    public TaskRelatedObjectDto toRelatedObjectDto(TaskRelatedObject relatedObject) {
        if (relatedObject == null) {
            return null;
        }

        TaskRelatedObjectDto dto = new TaskRelatedObjectDto();
        dto.setId(relatedObject.getId());
        dto.setObjectType(relatedObject.getObjectType());
        dto.setObjectId(relatedObject.getObjectId());
        dto.setRelationshipType(relatedObject.getRelationshipType());

        // Object name would typically be fetched from the related object's service
        // This is a simplification
        dto.setObjectName("Object " + relatedObject.getObjectId());

        return dto;
    }
}