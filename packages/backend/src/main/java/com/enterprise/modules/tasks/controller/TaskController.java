// File: backend/src/main/java/com/enterprise/core/tasks/controller/TaskController.java
package com.enterprise.modules.tasks.controller;

import com.enterprise.core.common.dto.ApiResponse;
import com.enterprise.modules.tasks.dto.TaskCreateDto;
import com.enterprise.modules.tasks.dto.TaskDto;
import com.enterprise.modules.tasks.entity.TaskModule;
import com.enterprise.modules.tasks.entity.TaskStatus;
import com.enterprise.modules.tasks.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

/**
 * REST controller for tasks management operations.
 */
@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    /**
     * Create a new tasks.
     */
    @PostMapping
    public ResponseEntity<TaskDto> createTask(
            @Valid @RequestBody TaskCreateDto taskCreateDto,
            @AuthenticationPrincipal UserDetails userDetails) {
        // Extract user ID from authenticated user details
        Long userId = extractUserId(userDetails);
        TaskDto createdTask = taskService.createTask(taskCreateDto, userId);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    /**
     * Get a tasks by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Long id) {
        TaskDto task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    /**
     * Update a tasks.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskDto taskDto) {
        TaskDto updatedTask = taskService.updateTask(id, taskDto);
        return ResponseEntity.ok(updatedTask);
    }

    /**
     * Delete a tasks.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok(new ApiResponse(true, "Task deleted successfully"));
    }

    /**
     * Get all tasks with pagination.
     */
    @GetMapping
    public ResponseEntity<Page<TaskDto>> getAllTasks(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TaskDto> tasks = taskService.getAllTasks(pageable);
        return ResponseEntity.ok(tasks);
    }

    /**
     * Get tasks assigned to a specific user.
     */
    @GetMapping("/assigned-to/{userId}")
    public ResponseEntity<Page<TaskDto>> getTasksByAssignedUser(
            @PathVariable Long userId,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TaskDto> tasks = taskService.getTasksByAssignedUser(userId, pageable);
        return ResponseEntity.ok(tasks);
    }

    /**
     * Get tasks assigned to the current user.
     */
    @GetMapping("/my-tasks")
    public ResponseEntity<Page<TaskDto>> getMyTasks(
            @AuthenticationPrincipal UserDetails userDetails,
            @PageableDefault(size = 20) Pageable pageable) {
        Long userId = extractUserId(userDetails);
        Page<TaskDto> tasks = taskService.getTasksByAssignedUser(userId, pageable);
        return ResponseEntity.ok(tasks);
    }

    /**
     * Get tasks assigned to a specific team.
     */
    @GetMapping("/team/{teamId}")
    public ResponseEntity<Page<TaskDto>> getTasksByTeam(
            @PathVariable Long teamId,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TaskDto> tasks = taskService.getTasksByTeam(teamId, pageable);
        return ResponseEntity.ok(tasks);
    }

    /**
     * Get tasks by status.
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<Page<TaskDto>> getTasksByStatus(
            @PathVariable TaskStatus status,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TaskDto> tasks = taskService.getTasksByStatus(status, pageable);
        return ResponseEntity.ok(tasks);
    }

    /**
     * Get tasks by modules.
     */
    @GetMapping("/modules/{modules}")
    public ResponseEntity<Page<TaskDto>> getTasksByModule(
            @PathVariable TaskModule module,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TaskDto> tasks = taskService.getTasksByModule(module, pageable);
        return ResponseEntity.ok(tasks);
    }

    /**
     * Get overdue tasks.
     */
    @GetMapping("/overdue")
    public ResponseEntity<Page<TaskDto>> getOverdueTasks(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TaskDto> tasks = taskService.getOverdueTasks(pageable);
        return ResponseEntity.ok(tasks);
    }

    // File continuation: backend/src/main/java/com/enterprise/core/tasks/controller/TaskController.java

    /**
     * Get tasks due today.
     */
    @GetMapping("/due-today")
    public ResponseEntity<Page<TaskDto>> getTasksDueToday(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TaskDto> tasks = taskService.getTasksDueToday(pageable);
        return ResponseEntity.ok(tasks);
    }

    /**
     * Get upcoming tasks within a date range.
     */
    @GetMapping("/upcoming")
    public ResponseEntity<Page<TaskDto>> getUpcomingTasks(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TaskDto> tasks = taskService.getUpcomingTasks(start, end, pageable);
        return ResponseEntity.ok(tasks);
    }

    /**
     * Get tasks related to a specific object.
     */
    @GetMapping("/related/{objectType}/{objectId}")
    public ResponseEntity<List<TaskDto>> getTasksByRelatedObject(
            @PathVariable String objectType,
            @PathVariable Long objectId) {
        List<TaskDto> tasks = taskService.getTasksByRelatedObject(objectType, objectId);
        return ResponseEntity.ok(tasks);
    }

    /**
     * Get subtasks of a parent tasks.
     */
    @GetMapping("/{parentTaskId}/subtasks")
    public ResponseEntity<List<TaskDto>> getSubtasks(@PathVariable Long parentTaskId) {
        List<TaskDto> subtasks = taskService.getSubtasks(parentTaskId);
        return ResponseEntity.ok(subtasks);
    }

    /**
     * Assign a tasks to a user.
     */
    @PutMapping("/{taskId}/assign-to-user/{userId}")
    public ResponseEntity<TaskDto> assignTaskToUser(
            @PathVariable Long taskId,
            @PathVariable Long userId) {
        TaskDto updatedTask = taskService.assignTaskToUser(taskId, userId);
        return ResponseEntity.ok(updatedTask);
    }

    /**
     * Assign a tasks to a team.
     */
    @PutMapping("/{taskId}/assign-to-team/{teamId}")
    public ResponseEntity<TaskDto> assignTaskToTeam(
            @PathVariable Long taskId,
            @PathVariable Long teamId) {
        TaskDto updatedTask = taskService.assignTaskToTeam(taskId, teamId);
        return ResponseEntity.ok(updatedTask);
    }

    /**
     * Update the status of a tasks.
     */
    @PutMapping("/{taskId}/status/{status}")
    public ResponseEntity<TaskDto> updateTaskStatus(
            @PathVariable Long taskId,
            @PathVariable TaskStatus status) {
        TaskDto updatedTask = taskService.updateTaskStatus(taskId, status);
        return ResponseEntity.ok(updatedTask);
    }

    /**
     * Update the completion percentage of a tasks.
     */
    @PutMapping("/{taskId}/completion/{percentage}")
    public ResponseEntity<TaskDto> updateTaskCompletion(
            @PathVariable Long taskId,
            @PathVariable Integer percentage) {
        TaskDto updatedTask = taskService.updateTaskCompletion(taskId, percentage);
        return ResponseEntity.ok(updatedTask);
    }

    /**
     * Add a related object to a tasks.
     */
    @PostMapping("/{taskId}/related-objects")
    public ResponseEntity<TaskDto> addRelatedObjectToTask(
            @PathVariable Long taskId,
            @RequestParam String objectType,
            @RequestParam Long objectId,
            @RequestParam(required = false) String relationshipType) {
        TaskDto updatedTask = taskService.addRelatedObjectToTask(taskId, objectType, objectId, relationshipType);
        return ResponseEntity.ok(updatedTask);
    }

    /**
     * Remove a related object from a tasks.
     */
    @DeleteMapping("/{taskId}/related-objects/{relatedObjectId}")
    public ResponseEntity<TaskDto> removeRelatedObjectFromTask(
            @PathVariable Long taskId,
            @PathVariable Long relatedObjectId) {
        TaskDto updatedTask = taskService.removeRelatedObjectFromTask(taskId, relatedObjectId);
        return ResponseEntity.ok(updatedTask);
    }

    /**
     * Get unassigned tasks.
     */
    @GetMapping("/unassigned")
    public ResponseEntity<Page<TaskDto>> getUnassignedTasks(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TaskDto> tasks = taskService.getUnassignedTasks(pageable);
        return ResponseEntity.ok(tasks);
    }

    /**
     * Search tasks.
     */
    @GetMapping("/search")
    public ResponseEntity<Page<TaskDto>> searchTasks(
            @RequestParam String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TaskDto> tasks = taskService.searchTasks(query, pageable);
        return ResponseEntity.ok(tasks);
    }

    /**
     * Helper method to extract user ID from UserDetails.
     * In a real application, this would depend on how you store the user ID in the UserDetails.
     */
    private Long extractUserId(UserDetails userDetails) {
        // Implementation depends on your authentication setup
        // This is a placeholder - in a real application,
        // you would extract the user ID from your custom UserDetails implementation
        return 1L; // Placeholder
    }
}