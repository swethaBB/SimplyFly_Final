package com.hexaware.simplyfly.dto;

import org.springframework.web.bind.annotation.RequestBody;

import com.hexaware.simplyfly.entities.UserInfo;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*Author : Swetha
Modified On : 29-07-2025
Description : UserInfoDto with basic validation
*/


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {

    @NotBlank(message = "Name is mandatory")
    @Pattern(regexp = "^[A-Z][a-z]{2,}$", 
             message = "Name must start with uppercase followed by lowercase letters")
    private String name;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is mandatory")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$]).{8,}$",
             message = "Password must contain at least 8 characters, one uppercase letter, one digit, and one special character (@, #, $)")
    private String password;

    @NotBlank(message = "Gender is mandatory")
    private String gender;

    @NotBlank(message = "Contact number is mandatory")
    @Pattern(regexp = "^[6-9][0-9]{9}$", 
             message = "Contact number must be a valid 10-digit Indian mobile number")
    private String contactNo;

    @NotBlank(message = "Address is mandatory")
    private String address;

    @NotBlank(message = "Role is mandatory")
    @Pattern(regexp = "^(USER|FLIGHT_OWNER|ADMIN)$", flags = Pattern.Flag.UNICODE_CASE,
             message = "Role must be USER, FLIGHT_OWNER, or ADMIN (case-sensitive)")
    private String role;
    


}
