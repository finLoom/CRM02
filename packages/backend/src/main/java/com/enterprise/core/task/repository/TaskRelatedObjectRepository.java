package com.enterprise.core.task.repository;

import com.enterprise.core.task.entity.TaskRelatedObject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRelatedObjectRepository extends JpaRepository<TaskRelatedObject, Long> {

    List<TaskRelatedObject> findByTaskId(Long taskId);

    List<TaskRelatedObject> findByObjectTypeAndObjectId(String objectType, Long objectId);

    void deleteByTaskId(Long taskId);

    @Query("SELECT tro FROM TaskRelatedObject tro WHERE tro.objectType = :objectType AND tro.objectId IN :objectIds")
    List<TaskRelatedObject> findByObjectTypeAndObjectIdIn(
            @Param("objectType") String objectType,
            @Param("objectIds") List<Long> objectIds);
}