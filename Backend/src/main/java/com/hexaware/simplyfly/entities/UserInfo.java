package com.hexaware.simplyfly.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import java.time.LocalDateTime;

/*Author : Swetha 
Modified On : 25-07-2025
Description : UserInfo entity class 
*/

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Email
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private String gender;
    private String contactNo;
    private String address;
    private String role = "USER"; 
    private LocalDateTime createdAt = LocalDateTime.now();
}
