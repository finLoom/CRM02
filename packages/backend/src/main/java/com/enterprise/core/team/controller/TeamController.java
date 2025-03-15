// File: backend/src/main/java/com/enterprise/core/team/controller/TeamController.java
package com.enterprise.core.team.controller;

import com.enterprise.core.common.dto.ApiResponse;
import com.enterprise.core.team.dto.TeamCreateDto;
import com.enterprise.core.team.dto.TeamDto;
import com.enterprise.core.team.dto.TeamUpdateDto;
import com.enterprise.core.team.entity.TeamType;
import com.enterprise.core.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

/**
 * REST controller for team management operations.
 */
@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    /**
     * Create a new team.
     */
    @PostMapping
    public ResponseEntity<TeamDto> createTeam(@Valid @RequestBody TeamCreateDto teamCreateDto) {
        TeamDto createdTeam = teamService.createTeam(teamCreateDto);
        return new ResponseEntity<>(createdTeam, HttpStatus.CREATED);
    }

    /**
     * Get a team by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TeamDto> getTeamById(@PathVariable Long id) {
        TeamDto team = teamService.getTeamById(id);
        return ResponseEntity.ok(team);
    }

    /**
     * Get a team by name.
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<TeamDto> getTeamByName(@PathVariable String name) {
        TeamDto team = teamService.getTeamByName(name);
        return ResponseEntity.ok(team);
    }

    /**
     * Update a team.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TeamDto> updateTeam(
            @PathVariable Long id,
            @Valid @RequestBody TeamUpdateDto teamUpdateDto) {
        TeamDto updatedTeam = teamService.updateTeam(id, teamUpdateDto);
        return ResponseEntity.ok(updatedTeam);
    }

    /**
     * Delete a team.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteTeam(@PathVariable Long id) {
        teamService.deleteTeam(id);
        return ResponseEntity.ok(new ApiResponse(true, "Team deleted successfully"));
    }

    /**
     * Get all teams with pagination.
     */
    @GetMapping
    public ResponseEntity<Page<TeamDto>> getAllTeams(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TeamDto> teams = teamService.getAllTeams(pageable);
        return ResponseEntity.ok(teams);
    }

    /**
     * Get teams by type.
     */
    @GetMapping("/type/{type}")
    public ResponseEntity<List<TeamDto>> getTeamsByType(@PathVariable TeamType type) {
        List<TeamDto> teams = teamService.getTeamsByType(type);
        return ResponseEntity.ok(teams);
    }

    /**
     * Get active teams.
     */
    @GetMapping("/active")
    public ResponseEntity<List<TeamDto>> getActiveTeams() {
        List<TeamDto> teams = teamService.getActiveTeams();
        return ResponseEntity.ok(teams);
    }

    /**
     * Get teams by department.
     */
    @GetMapping("/department/{department}")
    public ResponseEntity<List<TeamDto>> getTeamsByDepartment(@PathVariable String department) {
        List<TeamDto> teams = teamService.getTeamsByDepartment(department);
        return ResponseEntity.ok(teams);
    }

    /**
     * Get teams by functional area.
     */
    @GetMapping("/functional-area/{functionalArea}")
    public ResponseEntity<List<TeamDto>> getTeamsByFunctionalArea(@PathVariable String functionalArea) {
        List<TeamDto> teams = teamService.getTeamsByFunctionalArea(functionalArea);
        return ResponseEntity.ok(teams);
    }

    /**
     * Get teams managed by a specific user.
     */
    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<TeamDto>> getTeamsByManager(@PathVariable Long managerId) {
        List<TeamDto> teams = teamService.getTeamsByManager(managerId);
        return ResponseEntity.ok(teams);
    }

    /**
     * Get teams that a user belongs to.
     */
    @GetMapping("/member/{userId}")
    public ResponseEntity<List<TeamDto>> getTeamsByMember(@PathVariable Long userId) {
        List<TeamDto> teams = teamService.getTeamsByMember(userId);
        return ResponseEntity.ok(teams);
    }

    /**
     * Add a member to a team.
     */
    @PutMapping("/{teamId}/members/{userId}")
    public ResponseEntity<TeamDto> addMemberToTeam(
            @PathVariable Long teamId,
            @PathVariable Long userId) {
        TeamDto updatedTeam = teamService.addMemberToTeam(teamId, userId);
        return ResponseEntity.ok(updatedTeam);
    }

    /**
     * Remove a member from a team.
     */
    @DeleteMapping("/{teamId}/members/{userId}")
    public ResponseEntity<TeamDto> removeMemberFromTeam(
            @PathVariable Long teamId,
            @PathVariable Long userId) {
        TeamDto updatedTeam = teamService.removeMemberFromTeam(teamId, userId);
        return ResponseEntity.ok(updatedTeam);
    }

    /**
     * Set the manager of a team.
     */
    @PutMapping("/{teamId}/manager/{managerId}")
    public ResponseEntity<TeamDto> setTeamManager(
            @PathVariable Long teamId,
            @PathVariable Long managerId) {
        TeamDto updatedTeam = teamService.setTeamManager(teamId, managerId);
        return ResponseEntity.ok(updatedTeam);
    }

    /**
     * Activate a team.
     */
    @PutMapping("/{teamId}/activate")
    public ResponseEntity<TeamDto> activateTeam(@PathVariable Long teamId) {
        TeamDto updatedTeam = teamService.activateTeam(teamId);
        return ResponseEntity.ok(updatedTeam);
    }

    /**
     * Deactivate a team.
     */
    @PutMapping("/{teamId}/deactivate")
    public ResponseEntity<TeamDto> deactivateTeam(@PathVariable Long teamId) {
        TeamDto updatedTeam = teamService.deactivateTeam(teamId);
        return ResponseEntity.ok(updatedTeam);
    }

    /**
     * Search teams by name or description.
     */
    @GetMapping("/search")
    public ResponseEntity<Page<TeamDto>> searchTeams(
            @RequestParam String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<TeamDto> teams = teamService.searchTeams(query, pageable);
        return ResponseEntity.ok(teams);
    }
}