// File: backend/src/main/java/com/enterprise/core/team/dto/TeamMemberDto.java
package com.enterprise.core.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamMemberDto {

    private Long id;

    private String name;

    private String email;

    private String role;

    private String department;

    private String jobTitle;
}