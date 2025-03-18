// File: backend/src/main/java/com/enterprise/core/tasks/service/TaskService.java
package com.enterprise.modules.tasks.service;

import com.enterprise.modules.tasks.dto.TaskCreateDto;
import com.enterprise.modules.tasks.dto.TaskDto;
import com.enterprise.modules.tasks.entity.TaskModule;
import com.enterprise.modules.tasks.entity.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service interface for tasks management operations.
 */
public interface TaskService {

    /**
     * Create a new tasks.
     *
     * @param taskCreateDto The tasks creation data
     * @param createdById ID of the user creating the tasks
     * @return The created tasks
     */
    TaskDto createTask(TaskCreateDto taskCreateDto, Long createdById);

    /**
     * Get a tasks by ID.
     *
     * @param id The tasks ID
     * @return The tasks if found
     */
    TaskDto getTaskById(Long id);

    /**
     * Update a tasks.
     *
     * @param id The tasks ID
     * @param taskDto The updated tasks data
     * @return The updated tasks
     */
    TaskDto updateTask(Long id, TaskDto taskDto);

    /**
     * Delete a tasks.
     *
     * @param id The tasks ID
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
     * @param status The tasks status
     * @param pageable Pagination information
     * @return Page of tasks
     */
    Page<TaskDto> getTasksByStatus(TaskStatus status, Pageable pageable);

    /**
     * Get tasks by modules.
     *
     * @param module The modules
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
     * Get subtasks of a parent tasks.
     *
     * @param parentTaskId The parent tasks ID
     * @return List of subtasks
     */
    List<TaskDto> getSubtasks(Long parentTaskId);

    /**
     * Assign a tasks to a user.
     *
     * @param taskId The tasks ID
     * @param userId The user ID
     * @return The updated tasks
     */
    TaskDto assignTaskToUser(Long taskId, Long userId);

    /**
     * Assign a tasks to a team.
     *
     * @param taskId The tasks ID
     * @param teamId The team ID
     * @return The updated tasks
     */
    TaskDto assignTaskToTeam(Long taskId, Long teamId);

    /**
     * Update the status of a tasks.
     *
     * @param taskId The tasks ID
     * @param status The new status
     * @return The updated tasks
     */
    TaskDto updateTaskStatus(Long taskId, TaskStatus status);

    /**
     * Update the completion percentage of a tasks.
     *
     * @param taskId The tasks ID
     * @param percentage The completion percentage
     * @return The updated tasks
     */
    TaskDto updateTaskCompletion(Long taskId, Integer percentage);

    /**
     * Add a related object to a tasks.
     *
     * @param taskId The tasks ID
     * @param objectType The type of the related object
     * @param objectId The ID of the related object
     * @param relationshipType The type of relationship
     * @return The updated tasks
     */
    TaskDto addRelatedObjectToTask(Long taskId, String objectType, Long objectId, String relationshipType);

    /**
     * Remove a related object from a tasks.
     *
     * @param taskId The tasks ID
     * @param relatedObjectId The related object ID
     * @return The updated tasks
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