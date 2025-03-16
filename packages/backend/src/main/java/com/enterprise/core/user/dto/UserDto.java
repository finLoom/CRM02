package com.enterprise.core.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String department;
    private String jobTitle;
    private String phoneNumber;
    private String profileImage;
    private Long managerId;
    private String managerName;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}