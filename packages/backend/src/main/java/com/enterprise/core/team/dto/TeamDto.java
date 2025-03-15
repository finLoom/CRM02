package com.enterprise.core.team.dto;

import com.enterprise.core.team.entity.TeamType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Data Transfer Object for Team entity.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamDto {

    private Long id;

    private String name;

    private String description;

    private Long managerId;

    private String managerName;

    private Set<TeamMemberDto> members = new HashSet<>();

    private String department;

    private TeamType type;

    private String functionalArea;

    private boolean active;

    private int memberCount;

    private int taskCount;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}