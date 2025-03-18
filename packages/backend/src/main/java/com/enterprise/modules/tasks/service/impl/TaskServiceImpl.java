// File: backend/src/main/java/com/enterprise/core/tasks/service/impl/TaskServiceImpl.java
package com.enterprise.modules.tasks.service.impl;

import com.enterprise.core.common.exception.ResourceNotFoundException;
import com.enterprise.modules.tasks.dto.TaskCreateDto;
import com.enterprise.modules.tasks.dto.TaskDto;
import com.enterprise.modules.tasks.dto.TaskRelatedObjectCreateDto;
import com.enterprise.modules.tasks.entity.Task;
import com.enterprise.modules.tasks.entity.TaskModule;
import com.enterprise.modules.tasks.entity.TaskRelatedObject;
import com.enterprise.modules.tasks.entity.TaskStatus;
import com.enterprise.modules.tasks.mapper.TaskMapper;
import com.enterprise.modules.tasks.repository.TaskRelatedObjectRepository;
import com.enterprise.modules.tasks.repository.TaskRepository;
import com.enterprise.modules.tasks.service.TaskService;
import com.enterprise.core.team.entity.Team;
import com.enterprise.core.team.repository.TeamRepository;
import com.enterprise.core.user.entity.User;
import com.enterprise.core.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of the TaskService interface.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskRelatedObjectRepository taskRelatedObjectRepository;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final TaskMapper taskMapper;

    @Override
    public TaskDto createTask(TaskCreateDto taskCreateDto, Long createdById) {
        // Get the user who is creating the tasks
        User createdBy = userRepository.findById(createdById)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", createdById));

        // Create a new tasks entity
        Task task = new Task();
        task.setTitle(taskCreateDto.getTitle());
        task.setDescription(taskCreateDto.getDescription());
        task.setDueDate(taskCreateDto.getDueDate());
        task.setPriority(taskCreateDto.getPriority());
        task.setModule(taskCreateDto.getModule());
        task.setEstimatedHours(taskCreateDto.getEstimatedHours());
        task.setReminderTime(taskCreateDto.getReminderTime());
        task.setCreatedBy(createdBy);

        // Set the assigned user if specified
        if (taskCreateDto.getAssignedToId() != null) {
            User assignedTo = userRepository.findById(taskCreateDto.getAssignedToId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", taskCreateDto.getAssignedToId()));
            task.setAssignedTo(assignedTo);
        }

        // Set the team if specified
        if (taskCreateDto.getTeamId() != null) {
            Team team = teamRepository.findById(taskCreateDto.getTeamId())
                    .orElseThrow(() -> new ResourceNotFoundException("Team", "id", taskCreateDto.getTeamId()));
            task.setTeam(team);
        }

        // Set the parent tasks if specified
        if (taskCreateDto.getParentTaskId() != null) {
            Task parentTask = taskRepository.findById(taskCreateDto.getParentTaskId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent tasks", "id", taskCreateDto.getParentTaskId()));
            task.setParentTask(parentTask);
        }

        // Save the tasks
        Task savedTask = taskRepository.save(task);

        // Add related objects if any
        if (taskCreateDto.getRelatedObjects() != null && !taskCreateDto.getRelatedObjects().isEmpty()) {
            for (TaskRelatedObjectCreateDto relatedObjectDto : taskCreateDto.getRelatedObjects()) {
                TaskRelatedObject relatedObject = new TaskRelatedObject();
                relatedObject.setTask(savedTask);
                relatedObject.setObjectType(relatedObjectDto.getObjectType());
                relatedObject.setObjectId(relatedObjectDto.getObjectId());
                relatedObject.setRelationshipType(relatedObjectDto.getRelationshipType());
                taskRelatedObjectRepository.save(relatedObject);
            }
        }

        // Reload the tasks with related objects
        savedTask = taskRepository.findById(savedTask.getId()).orElseThrow();

        return taskMapper.toDto(savedTask);
    }

    @Override
    @Transactional(readOnly = true)
    public TaskDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));
        return taskMapper.toDto(task);
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto taskDto) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));

        // Update basic properties
        existingTask.setTitle(taskDto.getTitle());
        existingTask.setDescription(taskDto.getDescription());
        existingTask.setDueDate(taskDto.getDueDate());
        existingTask.setPriority(taskDto.getPriority());
        existingTask.setStatus(taskDto.getStatus());
        existingTask.setCompletionDate(taskDto.getCompletionDate());
        existingTask.setReminderTime(taskDto.getReminderTime());
        existingTask.setCompletionPercentage(taskDto.getCompletionPercentage());
        existingTask.setEstimatedHours(taskDto.getEstimatedHours());
        existingTask.setActualHours(taskDto.getActualHours());
        existingTask.setModule(taskDto.getModule());

        // Update assigned user if changed
        if (taskDto.getAssignedToId() != null) {
            User assignedTo = userRepository.findById(taskDto.getAssignedToId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", taskDto.getAssignedToId()));
            existingTask.setAssignedTo(assignedTo);
        } else {
            existingTask.setAssignedTo(null);
        }

        // Update team if changed
        if (taskDto.getTeamId() != null) {
            Team team = teamRepository.findById(taskDto.getTeamId())
                    .orElseThrow(() -> new ResourceNotFoundException("Team", "id", taskDto.getTeamId()));
            existingTask.setTeam(team);
        } else {
            existingTask.setTeam(null);
        }

        // Save the updated tasks
        Task updatedTask = taskRepository.save(existingTask);

        return taskMapper.toDto(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task", "id", id);
        }

        // Check for subtasks
        List<Task> subtasks = taskRepository.findByParentTaskId(id);

        // Delete subtasks first if any
        if (!subtasks.isEmpty()) {
            for (Task subtask : subtasks) {
                deleteTask(subtask.getId());
            }
        }

        // Delete the tasks
        taskRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDto> getAllTasks(Pageable pageable) {
        return taskRepository.findAll(pageable)
                .map(taskMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDto> getTasksByAssignedUser(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        return taskRepository.findByAssignedTo(user, pageable)
                .map(taskMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDto> getTasksByTeam(Long teamId, Pageable pageable) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team", "id", teamId));

        return taskRepository.findByTeam(team, pageable)
                .map(taskMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDto> getTasksByStatus(TaskStatus status, Pageable pageable) {
        return taskRepository.findByStatus(status, pageable)
                .map(taskMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDto> getTasksByModule(TaskModule module, Pageable pageable) {
        return taskRepository.findByModule(module, pageable)
                .map(taskMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDto> getOverdueTasks(Pageable pageable) {
        // Find tasks that are overdue and not completed
        return taskRepository.findByDueDateBeforeAndStatusNot(
                        LocalDateTime.now(), TaskStatus.COMPLETED, pageable)
                .map(taskMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDto> getTasksDueToday(Pageable pageable) {
        return taskRepository.findTasksDueToday(TaskStatus.COMPLETED, pageable)
                .map(taskMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDto> getUpcomingTasks(LocalDateTime start, LocalDateTime end, Pageable pageable) {
        return taskRepository.findUpcomingTasks(start, end, TaskStatus.COMPLETED, pageable)
                .map(taskMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskDto> getTasksByRelatedObject(String objectType, Long objectId) {
        return taskRepository.findTasksByRelatedObject(objectType, objectId)
                .stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskDto> getSubtasks(Long parentTaskId) {
        return taskRepository.findByParentTaskId(parentTaskId)
                .stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto assignTaskToUser(Long taskId, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        task.setAssignedTo(user);

        Task updatedTask = taskRepository.save(task);
        return taskMapper.toDto(updatedTask);
    }

    @Override
    public TaskDto assignTaskToTeam(Long taskId, Long teamId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team", "id", teamId));

        task.setTeam(team);

        Task updatedTask = taskRepository.save(task);
        return taskMapper.toDto(updatedTask);
    }

    @Override
    public TaskDto updateTaskStatus(Long taskId, TaskStatus status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        task.setStatus(status);

        // If the tasks is marked as completed, set the completion date
        if (status == TaskStatus.COMPLETED) {
            task.setCompletionDate(LocalDateTime.now());
            task.setCompletionPercentage(100);
        } else if (status == TaskStatus.NOT_STARTED) {
            task.setCompletionPercentage(0);
        }

        Task updatedTask = taskRepository.save(task);
        return taskMapper.toDto(updatedTask);
    }

    @Override
    public TaskDto updateTaskCompletion(Long taskId, Integer percentage) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        // Validate percentage range
        if (percentage < 0 || percentage > 100) {
            throw new IllegalArgumentException("Completion percentage must be between 0 and 100");
        }

        task.setCompletionPercentage(percentage);

        // Update status based on completion percentage
        if (percentage == 100) {
            task.setStatus(TaskStatus.COMPLETED);
            task.setCompletionDate(LocalDateTime.now());
        } else if (percentage > 0) {
            task.setStatus(TaskStatus.IN_PROGRESS);
        } else {
            task.setStatus(TaskStatus.NOT_STARTED);
        }

        Task updatedTask = taskRepository.save(task);
        return taskMapper.toDto(updatedTask);
    }

    @Override
    public TaskDto addRelatedObjectToTask(Long taskId, String objectType, Long objectId, String relationshipType) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        TaskRelatedObject relatedObject = new TaskRelatedObject();
        relatedObject.setTask(task);
        relatedObject.setObjectType(objectType);
        relatedObject.setObjectId(objectId);
        relatedObject.setRelationshipType(relationshipType);

        taskRelatedObjectRepository.save(relatedObject);

        // Reload the tasks to get the updated related objects
        Task updatedTask = taskRepository.findById(taskId).orElseThrow();
        return taskMapper.toDto(updatedTask);
    }

    @Override
    public TaskDto removeRelatedObjectFromTask(Long taskId, Long relatedObjectId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        TaskRelatedObject relatedObject = taskRelatedObjectRepository.findById(relatedObjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Related object", "id", relatedObjectId));

        // Ensure the related object belongs to the specified tasks
        if (!relatedObject.getTask().getId().equals(taskId)) {
            throw new IllegalArgumentException("Related object does not belong to the specified tasks");
        }

        taskRelatedObjectRepository.delete(relatedObject);

        // Reload the tasks to get the updated related objects
        Task updatedTask = taskRepository.findById(taskId).orElseThrow();
        return taskMapper.toDto(updatedTask);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDto> getUnassignedTasks(Pageable pageable) {
        return taskRepository.findByAssignedToIsNull(pageable)
                .map(taskMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDto> searchTasks(String query, Pageable pageable) {
        // Implementation depends on the search functionality
        // This is a placeholder for a more sophisticated search implementation

        // For now, filter by title or description containing the query
        List<TaskDto> filteredTasks = taskRepository.findAll()
                .stream()
                .map(taskMapper::toDto)
                .filter(taskDto ->
                        taskDto.getTitle().toLowerCase().contains(query.toLowerCase()) ||
                                (taskDto.getDescription() != null &&
                                        taskDto.getDescription().toLowerCase().contains(query.toLowerCase()))
                )
                .collect(Collectors.toList());

        // Paginate the filtered results
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filteredTasks.size());

        // Create a sublist for the current page
        List<TaskDto> pageContent = filteredTasks.subList(start, end);

        // Convert the filtered list back to a Page
        return new PageImpl<>(pageContent, pageable, filteredTasks.size());
    }
}