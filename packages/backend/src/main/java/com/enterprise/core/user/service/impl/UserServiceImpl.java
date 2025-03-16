package com.enterprise.core.user.service.impl;

import com.enterprise.core.common.exception.ResourceNotFoundException;
import com.enterprise.core.user.dto.UserCreateDto;
import com.enterprise.core.user.dto.UserDto;
import com.enterprise.core.user.dto.UserUpdateDto;
import com.enterprise.core.user.entity.User;
import com.enterprise.core.user.repository.UserRepository;
import com.enterprise.core.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return convertToDto(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserDto> getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::convertToDto);
    }

    @Override
    public UserDto createUser(UserCreateDto userCreateDto) {
        // Check if email already exists
        if (userRepository.findByEmail(userCreateDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists: " + userCreateDto.getEmail());
        }

        User user = new User();
        user.setName(userCreateDto.getName());
        user.setEmail(userCreateDto.getEmail());
        user.setPassword(userCreateDto.getPassword()); // In real app, encrypt this
        user.setDepartment(userCreateDto.getDepartment());
        user.setJobTitle(userCreateDto.getJobTitle());
        user.setPhoneNumber(userCreateDto.getPhoneNumber());
        user.setActive(true);

        // Set manager if provided
        if (userCreateDto.getManagerId() != null) {
            User manager = userRepository.findById(userCreateDto.getManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", userCreateDto.getManagerId()));
            user.setManager(manager);
        }

        // Set creation and update timestamps
        LocalDateTime now = LocalDateTime.now();
        user.setCreatedAt(now);
        user.setUpdatedAt(now);

        User savedUser = userRepository.save(user);
        return convertToDto(savedUser);
    }

    @Override
    public UserDto updateUser(Long id, UserUpdateDto userUpdateDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        // Update fields if provided
        if (userUpdateDto.getName() != null) {
            user.setName(userUpdateDto.getName());
        }

        if (userUpdateDto.getEmail() != null) {
            // Check if email already exists for another user
            Optional<User> existingUser = userRepository.findByEmail(userUpdateDto.getEmail());
            if (existingUser.isPresent() && !existingUser.get().getId().equals(id)) {
                throw new IllegalArgumentException("Email already exists: " + userUpdateDto.getEmail());
            }
            user.setEmail(userUpdateDto.getEmail());
        }

        if (userUpdateDto.getDepartment() != null) {
            user.setDepartment(userUpdateDto.getDepartment());
        }

        if (userUpdateDto.getJobTitle() != null) {
            user.setJobTitle(userUpdateDto.getJobTitle());
        }

        if (userUpdateDto.getPhoneNumber() != null) {
            user.setPhoneNumber(userUpdateDto.getPhoneNumber());
        }

        if (userUpdateDto.getManagerId() != null) {
            User manager = userRepository.findById(userUpdateDto.getManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", userUpdateDto.getManagerId()));
            user.setManager(manager);
        }

        if (userUpdateDto.getActive() != null) {
            user.setActive(userUpdateDto.getActive());
        }

        // Update timestamp
        user.setUpdatedAt(LocalDateTime.now());

        User updatedUser = userRepository.save(user);
        return convertToDto(updatedUser);
    }

    @Override
    public boolean deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            return false;
        }

        userRepository.deleteById(id);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getUsersByDepartment(String department) {
        return userRepository.findByDepartment(department).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> searchUsers(String query) {
        return userRepository.searchUsers(query).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Helper method to convert User entity to UserDto
    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setDepartment(user.getDepartment());
        dto.setJobTitle(user.getJobTitle());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setProfileImage(user.getProfileImage());
        dto.setActive(user.isActive());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());

        if (user.getManager() != null) {
            dto.setManagerId(user.getManager().getId());
            dto.setManagerName(user.getManager().getName());
        }

        return dto;
    }
}