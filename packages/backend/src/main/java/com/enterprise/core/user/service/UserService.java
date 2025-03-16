package com.enterprise.core.user.service;

import com.enterprise.core.user.dto.UserCreateDto;
import com.enterprise.core.user.dto.UserDto;
import com.enterprise.core.user.dto.UserUpdateDto;
import com.enterprise.core.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
    Optional<UserDto> getUserByEmail(String email);
    UserDto createUser(UserCreateDto userCreateDto);
    UserDto updateUser(Long id, UserUpdateDto userUpdateDto);
    boolean deleteUser(Long id);
    List<UserDto> getUsersByDepartment(String department);
    List<UserDto> searchUsers(String query);
}