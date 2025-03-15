// File: backend/src/main/java/com/enterprise/core/task/repository/TaskRepository.java
package com.enterprise.core.task.repository;

import com.enterprise.core.task.entity.Task;
import com.enterprise.core.task.entity.TaskModule;
import com.enterprise.core.task.entity.TaskStatus;
import com.enterprise.core.team.entity.Team;
import com.enterprise.core.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Repository for Task entity providing data access methods.
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Find tasks assigned to a specific user
    Page<Task> findByAssignedTo(User user, Pageable pageable);

    // Find tasks assigned to a specific team
    Page<Task> findByTeam(Team team, Pageable pageable);

    // Find tasks by status
    Page<Task> findByStatus(TaskStatus status, Pageable pageable);

    // Find tasks by module
    Page<Task> findByModule(TaskModule module, Pageable pageable);

    // Find overdue tasks
    Page<Task> findByDueDateBeforeAndStatusNot(
            LocalDateTime date,
            TaskStatus notStatus,
            Pageable pageable);

    // Find tasks due today
    @Query("SELECT t FROM Task t WHERE DATE(t.dueDate) = CURRENT_DATE AND t.status <> :status")
    Page<Task> findTasksDueToday(@Param("status") TaskStatus status, Pageable pageable);

    // Find upcoming tasks
    @Query("SELECT t FROM Task t WHERE t.dueDate BETWEEN :start AND :end AND t.status <> :status")
    Page<Task> findUpcomingTasks(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end,
            @Param("status") TaskStatus status,
            Pageable pageable);

    // Find tasks related to a specific object
    @Query("SELECT t FROM Task t JOIN t.relatedObjects ro " +
            "WHERE ro.objectType = :objectType AND ro.objectId = :objectId")
    List<Task> findTasksByRelatedObject(
            @Param("objectType") String objectType,
            @Param("objectId") Long objectId);

    // Find subtasks of a parent task
    List<Task> findByParentTaskId(Long parentTaskId);

    // Find tasks in a team, assigned to a user, with a specific status
    Page<Task> findByTeamAndAssignedToAndStatus(
            Team team,
            User user,
            TaskStatus status,
            Pageable pageable);

    // Find tasks by multiple statuses
    @Query("SELECT t FROM Task t WHERE t.status IN :statuses")
    Page<Task> findByStatuses(@Param("statuses") List<TaskStatus> statuses, Pageable pageable);

    // Find tasks assigned to a user in a module
    Page<Task> findByAssignedToAndModule(User user, TaskModule module, Pageable pageable);

    // Find unassigned tasks
    Page<Task> findByAssignedToIsNull(Pageable pageable);
}