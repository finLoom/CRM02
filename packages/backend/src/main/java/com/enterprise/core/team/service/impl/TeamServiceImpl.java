package com.enterprise.core.team.service.impl;

import com.enterprise.core.common.exception.ResourceNotFoundException;
import com.enterprise.core.team.dto.TeamCreateDto;
import com.enterprise.core.team.dto.TeamDto;
import com.enterprise.core.team.dto.TeamMemberDto;
import com.enterprise.core.team.dto.TeamUpdateDto;
import com.enterprise.core.team.entity.Team;
import com.enterprise.core.team.entity.TeamType;
import com.enterprise.core.team.repository.TeamRepository;
import com.enterprise.core.team.service.TeamService;
import com.enterprise.core.user.entity.User;
import com.enterprise.core.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    @Override
    public TeamDto createTeam(TeamCreateDto teamCreateDto) {
        Team team = new Team();
        team.setName(teamCreateDto.getName());
        team.setDescription(teamCreateDto.getDescription());
        team.setDepartment(teamCreateDto.getDepartment());
        team.setType(teamCreateDto.getType());
        team.setFunctionalArea(teamCreateDto.getFunctionalArea());
        team.setActive(true);

        // Set manager if provided
        if (teamCreateDto.getManagerId() != null) {
            User manager = userRepository.findById(teamCreateDto.getManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", teamCreateDto.getManagerId()));
            team.setManager(manager);
        }

        // Add members if provided
        if (teamCreateDto.getMemberIds() != null && !teamCreateDto.getMemberIds().isEmpty()) {
            for (Long memberId : teamCreateDto.getMemberIds()) {
                User member = userRepository.findById(memberId)
                        .orElseThrow(() -> new ResourceNotFoundException("User", "id", memberId));
                team.addMember(member);
            }
        }

        Team savedTeam = teamRepository.save(team);
        return mapToDto(savedTeam);
    }

    @Override
    @Transactional(readOnly = true)
    public TeamDto getTeamById(Long id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team", "id", id));
        return mapToDto(team);
    }

    @Override
    @Transactional(readOnly = true)
    public TeamDto getTeamByName(String name) {
        Team team = teamRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Team", "name", name));
        return mapToDto(team);
    }

    @Override
    public TeamDto updateTeam(Long id, TeamUpdateDto teamUpdateDto) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team", "id", id));

        team.setName(teamUpdateDto.getName());
        team.setDescription(teamUpdateDto.getDescription());
        team.setDepartment(teamUpdateDto.getDepartment());
        team.setType(teamUpdateDto.getType());
        team.setFunctionalArea(teamUpdateDto.getFunctionalArea());
        team.setActive(teamUpdateDto.isActive());

        // Update manager if provided
        if (teamUpdateDto.getManagerId() != null) {
            User manager = userRepository.findById(teamUpdateDto.getManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", teamUpdateDto.getManagerId()));
            team.setManager(manager);
        } else {
            team.setManager(null);
        }

        Team updatedTeam = teamRepository.save(team);
        return mapToDto(updatedTeam);
    }

    @Override
    public void deleteTeam(Long id) {
        if (!teamRepository.existsById(id)) {
            throw new ResourceNotFoundException("Team", "id", id);
        }
        teamRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TeamDto> getAllTeams(Pageable pageable) {
        return teamRepository.findAll(pageable)
                .map(this::mapToDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TeamDto> getTeamsByType(TeamType type) {
        return teamRepository.findByType(type).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TeamDto> getActiveTeams() {
        return teamRepository.findByActiveTrue().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TeamDto> getTeamsByDepartment(String department) {
        return teamRepository.findByDepartment(department).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TeamDto> getTeamsByFunctionalArea(String functionalArea) {
        return teamRepository.findByFunctionalArea(functionalArea).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TeamDto> getTeamsByManager(Long managerId) {
        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", managerId));

        return teamRepository.findByManager(manager).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TeamDto> getTeamsByMember(Long userId) {
        User member = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        return teamRepository.findTeamsByMember(member).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public TeamDto addMemberToTeam(Long teamId, Long userId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team", "id", teamId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (!team.getMembers().contains(user)) {
            team.addMember(user);
            teamRepository.save(team);
        }

        return mapToDto(team);
    }

    @Override
    public TeamDto removeMemberFromTeam(Long teamId, Long userId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team", "id", teamId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        team.removeMember(user);
        teamRepository.save(team);

        return mapToDto(team);
    }

    @Override
    public TeamDto setTeamManager(Long teamId, Long managerId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team", "id", teamId));

        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", managerId));

        team.setManager(manager);
        teamRepository.save(team);

        return mapToDto(team);
    }

    @Override
    public TeamDto activateTeam(Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team", "id", teamId));

        team.setActive(true);
        teamRepository.save(team);

        return mapToDto(team);
    }

    @Override
    public TeamDto deactivateTeam(Long teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team", "id", teamId));

        team.setActive(false);
        teamRepository.save(team);

        return mapToDto(team);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TeamDto> searchTeams(String query, Pageable pageable) {
        return teamRepository.searchTeams(query, pageable)
                .map(this::mapToDto);
    }

    // Helper method to map Team entity to TeamDto
    private TeamDto mapToDto(Team team) {
        TeamDto dto = new TeamDto();
        dto.setId(team.getId());
        dto.setName(team.getName());
        dto.setDescription(team.getDescription());
        dto.setDepartment(team.getDepartment());
        dto.setType(team.getType());
        dto.setFunctionalArea(team.getFunctionalArea());
        dto.setActive(team.isActive());
        dto.setCreatedAt(team.getCreatedAt());
        dto.setUpdatedAt(team.getUpdatedAt());

        if (team.getManager() != null) {
            dto.setManagerId(team.getManager().getId());
            dto.setManagerName(team.getManager().getName());
        }

        dto.setMembers(team.getMembers().stream()
                .map(this::mapToMemberDto)
                .collect(Collectors.toSet()));

        dto.setMemberCount(team.getMembers().size());

        return dto;
    }

    // Helper method to map User entity to TeamMemberDto
    private TeamMemberDto mapToMemberDto(User user) {
        return TeamMemberDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .department(user.getDepartment())
                .jobTitle(user.getJobTitle())
                .build();
    }
}