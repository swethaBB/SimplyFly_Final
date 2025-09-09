package com.hexaware.simplyfly.services;

import com.hexaware.simplyfly.dto.UserInfoDto;
import com.hexaware.simplyfly.entities.UserInfo;
import java.util.List;

public interface IUserInfoService {
    UserInfo addUser(UserInfo user);
    UserInfo getUserById(Long id);
    List<UserInfo> getAllUsers();
    UserInfo updateUser(Long id, UserInfo user);
    String deleteUser(Long id);
    UserInfo register(UserInfoDto dto);
    String loginAndGetToken(String email, String password);
    UserInfo updateUserRole(Long id, String newRole);

}

