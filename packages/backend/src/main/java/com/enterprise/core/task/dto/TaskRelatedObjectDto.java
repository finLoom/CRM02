package com.enterprise.core.task.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskRelatedObjectDto {

    private Long id;

    private String objectType;

    private Long objectId;

    private String objectName;

    private String relationshipType;
}