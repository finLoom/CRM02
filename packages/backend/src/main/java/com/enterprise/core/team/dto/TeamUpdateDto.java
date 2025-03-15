package com.enterprise.core.team.dto;

import com.enterprise.core.team.entity.TeamType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamUpdateDto {

    @NotBlank(message = "Team name is required")
    @Size(max = 255, message = "Team name cannot exceed 255 characters")
    private String name;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    private Long managerId;

    private String department;

    private TeamType type;

    private String functionalArea;

    private boolean active;
}