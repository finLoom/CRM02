// File: backend/src/main/java/com/enterprise/core/team/repository/TeamRepository.java
package com.enterprise.core.team.repository;

import com.enterprise.core.team.entity.Team;
import com.enterprise.core.team.entity.TeamType;
import com.enterprise.core.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Team entity providing data access methods.
 */
@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    // Find teams by name
    Optional<Team> findByName(String name);

    // Find teams by type
    List<Team> findByType(TeamType type);

    // Find active teams
    List<Team> findByActiveTrue();

    // Find teams by department
    List<Team> findByDepartment(String department);

    // Find teams by functional area
    List<Team> findByFunctionalArea(String functionalArea);

    // Find teams by manager
    List<Team> findByManager(User manager);

    // Find teams that a user belongs to
    @Query("SELECT t FROM Team t JOIN t.members m WHERE m = :user")
    List<Team> findTeamsByMember(@Param("user") User user);

    // Find active teams by type
    List<Team> findByTypeAndActiveTrue(TeamType type);

    // Find teams with pagination
    Page<Team> findAll(Pageable pageable);

    // Find teams by type with pagination
    Page<Team> findByType(TeamType type, Pageable pageable);

    // Search teams by name or description
    @Query("SELECT t FROM Team t WHERE " +
            "LOWER(t.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Team> searchTeams(@Param("query") String query, Pageable pageable);

    // Count teams by type
    Long countByType(TeamType type);

    // Find teams without a manager
    List<Team> findByManagerIsNull();
}