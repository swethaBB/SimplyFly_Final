package com.hexaware.simplyfly.repositories;

import com.hexaware.simplyfly.entities.UserInfo;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


/*Author : Swetha 
Modified On : 27-07-2025
Description : UserInfo Repository interface 
*/

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findByEmail(String email);
    @Transactional
    @Modifying
    @Query("UPDATE UserInfo u SET u.role = :role WHERE u.id = :id")
    void updateUserRoleById(@Param("id") Long id, @Param("role") String role);
    List<UserInfo> findByRole(String role);
}
