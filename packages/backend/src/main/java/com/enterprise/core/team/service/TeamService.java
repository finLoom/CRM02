// File: backend/src/main/java/com/enterprise/core/team/service/TeamService.java
package com.enterprise.core.team.service;

import com.enterprise.core.team.dto.TeamCreateDto;
import com.enterprise.core.team.dto.TeamDto;
import com.enterprise.core.team.dto.TeamUpdateDto;
import com.enterprise.core.team.entity.TeamType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Service interface for team management operations.
 */
public interface TeamService {

    /**
     * Create a new team.
     *
     * @param teamCreateDto The team creation data
     * @return The created team
     */
    TeamDto createTeam(TeamCreateDto teamCreateDto);

    /**
     * Get a team by ID.
     *
     * @param id The team ID
     * @return The team if found
     */
    TeamDto getTeamById(Long id);

    /**
     * Get a team by name.
     *
     * @param name The team name
     * @return The team if found
     */
    TeamDto getTeamByName(String name);

    /**
     * Update a team.
     *
     * @param id The team ID
     * @param teamUpdateDto The updated team data
     * @return The updated team
     */
    TeamDto updateTeam(Long id, TeamUpdateDto teamUpdateDto);

    /**
     * Delete a team.
     *
     * @param id The team ID
     */
    void deleteTeam(Long id);

    /**
     * Get all teams with pagination.
     *
     * @param pageable Pagination information
     * @return Page of teams
     */
    Page<TeamDto> getAllTeams(Pageable pageable);

    /**
     * Get teams by type.
     *
     * @param type The team type
     * @return List of teams
     */
    List<TeamDto> getTeamsByType(TeamType type);

    /**
     * Get active teams.
     *
     * @return List of active teams
     */
    List<TeamDto> getActiveTeams();

    /**
     * Get teams by department.
     *
     * @param department The department
     * @return List of teams
     */
    List<TeamDto> getTeamsByDepartment(String department);

    /**
     * Get teams by functional area.
     *
     * @param functionalArea The functional area
     * @return List of teams
     */
    List<TeamDto> getTeamsByFunctionalArea(String functionalArea);

    /**
     * Get teams managed by a specific user.
     *
     * @param managerId The manager's user ID
     * @return List of teams
     */
    List<TeamDto> getTeamsByManager(Long managerId);

    /**
     * Get teams that a user belongs to.
     *
     * @param userId The user ID
     * @return List of teams
     */
    List<TeamDto> getTeamsByMember(Long userId);

    /**
     * Add a member to a team.
     *
     * @param teamId The team ID
     * @param userId The user ID to add
     * @return The updated team
     */
    TeamDto addMemberToTeam(Long teamId, Long userId);

    /**
     * Remove a member from a team.
     *
     * @param teamId The team ID
     * @param userId The user ID to remove
     * @return The updated team
     */
    TeamDto removeMemberFromTeam(Long teamId, Long userId);

    /**
     * Set the manager of a team.
     *
     * @param teamId The team ID
     * @param managerId The manager's user ID
     * @return The updated team
     */
    TeamDto setTeamManager(Long teamId, Long managerId);

    /**
     * Activate a team.
     *
     * @param teamId The team ID
     * @return The updated team
     */
    TeamDto activateTeam(Long teamId);

    /**
     * Deactivate a team.
     *
     * @param teamId The team ID
     * @return The updated team
     */
    TeamDto deactivateTeam(Long teamId);

    /**
     * Search teams by name or description.
     *
     * @param query The search query
     * @param pageable Pagination information
     * @return Page of teams
     */
    Page<TeamDto> searchTeams(String query, Pageable pageable);
}