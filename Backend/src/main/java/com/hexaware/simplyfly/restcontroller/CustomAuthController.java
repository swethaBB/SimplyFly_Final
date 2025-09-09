package com.hexaware.simplyfly.restcontroller;

import com.hexaware.simplyfly.dto.AuthRequestDto;
import com.hexaware.simplyfly.dto.AuthResponseDto;
import com.hexaware.simplyfly.services.IUserInfoService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/v1/custom-auth")
public class CustomAuthController {

    private final IUserInfoService userService;

    public CustomAuthController(IUserInfoService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public AuthResponseDto login(@RequestBody AuthRequestDto request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            throw new IllegalArgumentException("Email and password must not be null");
        }

        String token = userService.loginAndGetToken(request.getEmail(), request.getPassword());
        return new AuthResponseDto(token);
    }
}
