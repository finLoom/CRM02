// File: backend/src/main/java/com/enterprise/core/team/entity/Team.java
package com.enterprise.core.team.entity;

import com.enterprise.core.common.entity.BaseEntity;
import com.enterprise.core.user.entity.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Entity representing a team in the system.
 * Teams are groups of users that can be assigned tasks collectively.
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "teams")
public class Team extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 1000)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private User manager;

    @ManyToMany
    @JoinTable(
            name = "team_members",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> members = new HashSet<>();

    @Column(name = "department")
    private String department;

    @Enumerated(EnumType.STRING)
    private TeamType type = TeamType.OPERATIONS;

    // For operations teams, their specific functional area
    @Column(name = "functional_area")
    private String functionalArea;

    @Column(name = "is_active")
    private boolean active = true;

    // Helper methods for managing team membership
    public void addMember(User user) {
        members.add(user);
    }

    public void removeMember(User user) {
        members.remove(user);
    }

    public boolean containsMember(User user) {
        return members.contains(user);
    }
}