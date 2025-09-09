package com.hexaware.simplyFly.service;


import static org.junit.jupiter.api.Assertions.*;
import java.util.List;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.hexaware.simplyfly.entities.UserInfo;
import com.hexaware.simplyfly.services.UserInfoServiceImpl;

@SpringBootTest
class UserServiceImplTest {

    @Autowired
    private UserInfoServiceImpl userService;

    @Test
    @Order(1)
    void testRegisterUser() {
        UserInfo user = new UserInfo();
        user.setEmail("newuser@example.com");
        user.setName("New User");
        UserInfo savedUser = userService.addUser(user);
        assertNotNull(savedUser);
        assertEquals("newuser@example.com", savedUser.getEmail());
    }

    @Test
    @Order(2)
    void testGetUserById() {
        UserInfo user = userService.getUserById(1L);
        assertNotNull(user);
        assertEquals(1L, user.getId());
    }

    @Test
    @Order(3)
    void testGetAllUsers() {
        List<UserInfo> users = userService.getAllUsers();
        assertTrue(users.size() > 0);
    }

    @Test
    @Order(4)
    void testDeleteUserById() {
        String result = userService.deleteUser(1L);
        assertEquals("Record deleted successfully", result);
    }
}

