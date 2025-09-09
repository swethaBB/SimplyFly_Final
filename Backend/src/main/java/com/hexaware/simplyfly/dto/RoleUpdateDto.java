package com.hexaware.simplyfly.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class RoleUpdateDto {
    @NotBlank(message = "Role is required")
    @Pattern(regexp = "^(USER|ADMIN|FLIGHT_OWNER)$", message = "Invalid role")
    private String role;

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
