// File: backend/src/main/java/com/enterprise/core/task/service/TaskService.java
package com.enterprise.core.task.service;

import com.enterprise.core.task.dto.TaskCreateDto;
import com.enterprise.core.task.dto.TaskDto;
import com.enterprise.core.task.entity.TaskModule;
import com.enterprise.core.task.entity.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service interface for task management operations.
 */
public interface TaskService {

    /**
     * Create a new task.
     *
     * @param taskCreateDto The task creation data
     * @param createdById ID of the user creating the task
     * @return The created task
     */
    TaskDto createTask(TaskCreateDto taskCreateDto, Long createdById);

    /**
     * Get a task by ID.
     *
     * @param id The task ID
     * @return The task if found
     */
    TaskDto getTaskById(Long id);

    /**
     * Update a task.
     *
     * @param id The task ID
     * @param taskDto The updated task data
     * @return The updated task
     */
    TaskDto updateTask(Long id, TaskDto taskDto);

    /**
     * Delete a task.
     *
     * @param id The task ID
     */
    void deleteTask(Long id);

    /**
     * Get all tasks with pagination.
     *
     * @param pageable Pagination information
     * @return Page of tasks
     */
    Page<TaskDto> getAllTasks(Pageable pageable);

    /**
     * Get tasks assigned to a specific user.
     *
     * @param userId The user ID
     * @param pageable Pagination information
     * @return Page of tasks
     */
    Page<TaskDto> getTasksByAssignedUser(Long userId, Pageable pageable);

    /**
     * Get tasks assigned to a specific team.
     *
     * @param teamId The team ID
     * @param pageable Pagination information
     * @return Page of tasks
     */
    Page<TaskDto> getTasksByTeam(Long teamId, Pageable pageable);

    /**
     * Get tasks by status.
     *
     * @param status The task status
     * @param pageable Pagination information
     * @return Page of tasks
     */
    Page<TaskDto> getTasksByStatus(TaskStatus status, Pageable pageable);

    /**
     * Get tasks by module.
     *
     * @param module The module
     * @param pageable Pagination information
     * @return Page of tasks
     */
    Page<TaskDto> getTasksByModule(TaskModule module, Pageable pageable);

    /**
     * Get overdue tasks.
     *
     * @param pageable Pagination information
     * @return Page of tasks
     */
    Page<TaskDto> getOverdueTasks(Pageable pageable);

    /**
     * Get tasks due today.
     *
     * @param pageable Pagination information
     * @return Page of tasks
     */
    Page<TaskDto> getTasksDueToday(Pageable pageable);

    /**
     * Get upcoming tasks within a date range.
     *
     * @param start Start date
     * @param end End date
     * @param pageable Pagination information
     * @return Page of tasks
     */
    Page<TaskDto> getUpcomingTasks(LocalDateTime start, LocalDateTime end, Pageable pageable);

    /**
     * Get tasks related to a specific object.
     *
     * @param objectType The type of the related object
     * @param objectId The ID of the related object
     * @return List of tasks
     */
    List<TaskDto> getTasksByRelatedObject(String objectType, Long objectId);

    /**
     * Get subtasks of a parent task.
     *
     * @param parentTaskId The parent task ID
     * @return List of subtasks
     */
    List<TaskDto> getSubtasks(Long parentTaskId);

    /**
     * Assign a task to a user.
     *
     * @param taskId The task ID
     * @param userId The user ID
     * @return The updated task
     */
    TaskDto assignTaskToUser(Long taskId, Long userId);

    /**
     * Assign a task to a team.
     *
     * @param taskId The task ID
     * @param teamId The team ID
     * @return The updated task
     */
    TaskDto assignTaskToTeam(Long taskId, Long teamId);

    /**
     * Update the status of a task.
     *
     * @param taskId The task ID
     * @param status The new status
     * @return The updated task
     */
    TaskDto updateTaskStatus(Long taskId, TaskStatus status);

    /**
     * Update the completion percentage of a task.
     *
     * @param taskId The task ID
     * @param percentage The completion percentage
     * @return The updated task
     */
    TaskDto updateTaskCompletion(Long taskId, Integer percentage);

    /**
     * Add a related object to a task.
     *
     * @param taskId The task ID
     * @param objectType The type of the related object
     * @param objectId The ID of the related object
     * @param relationshipType The type of relationship
     * @return The updated task
     */
    TaskDto addRelatedObjectToTask(Long taskId, String objectType, Long objectId, String relationshipType);

    /**
     * Remove a related object from a task.
     *
     * @param taskId The task ID
     * @param relatedObjectId The related object ID
     * @return The updated task
     */
    TaskDto removeRelatedObjectFromTask(Long taskId, Long relatedObjectId);

    /**
     * Get unassigned tasks.
     *
     * @param pageable Pagination information
     * @return Page of tasks
     */
    Page<TaskDto> getUnassignedTasks(Pageable pageable);

    /**
     * Search tasks.
     *
     * @param query The search query
     * @param pageable Pagination information
     * @return Page of tasks
     */
    Page<TaskDto> searchTasks(String query, Pageable pageable);
}