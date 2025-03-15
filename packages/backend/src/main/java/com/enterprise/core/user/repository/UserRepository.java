// File: backend/src/main/java/com/enterprise/core/user/repository/UserRepository.java
package com.enterprise.core.user.repository;

import com.enterprise.core.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByDepartment(String department);

    List<User> findByManager(User manager);

    @Query("SELECT u FROM User u WHERE u.manager IS NULL")
    List<User> findUsersWithoutManager();

    @Query("SELECT u FROM User u WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<User> searchUsers(@Param("query") String query);

    List<User> findByActiveTrue();
}