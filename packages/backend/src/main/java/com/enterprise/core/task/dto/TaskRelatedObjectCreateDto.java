package com.enterprise.core.task.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskRelatedObjectCreateDto {

    @NotBlank(message = "Object type is required")
    private String objectType;

    @NotNull(message = "Object ID is required")
    private Long objectId;

    private String relationshipType;
}