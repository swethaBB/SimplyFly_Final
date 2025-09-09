package com.hexaware.simplyfly.services;

import com.hexaware.simplyfly.dto.UserInfoDto;
import com.hexaware.simplyfly.entities.UserInfo;
import com.hexaware.simplyfly.exceptions.*;
import com.hexaware.simplyfly.repositories.UserInfoRepository;
import com.hexaware.simplyfly.security.JwtUtil;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserInfoServiceImpl implements IUserInfoService {

    private final UserInfoRepository repo;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public UserInfoServiceImpl(UserInfoRepository repo, BCryptPasswordEncoder encoder, JwtUtil jwtUtil) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public UserInfo addUser(UserInfo user) {
        repo.findByEmail(user.getEmail()).ifPresent(u -> {
            throw new DuplicateResourceException("Email already registered: " + user.getEmail());
        });
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole(user.getRole() == null ? "USER" : user.getRole());
        return repo.save(user);
    }


    @Override
    public UserInfo getUserById(Long id) {
        return repo.findById(id).orElseThrow(() -> new UserInfoNotFoundException("User with id " + id + " not found"));
    }

    @Override
    public List<UserInfo> getAllUsers() {
        return repo.findAll();
    }

    @Override
    public UserInfo updateUser(Long id, UserInfo user) {
        UserInfo existing = getUserById(id);
        existing.setName(user.getName());
        existing.setGender(user.getGender());
        existing.setContactNo(user.getContactNo());
        existing.setAddress(user.getAddress());
        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            existing.setPassword(encoder.encode(user.getPassword()));
        }
        if (user.getRole() != null) existing.setRole(user.getRole());
        return repo.save(existing);
    }

    @Override
    public String deleteUser(Long id) {
        UserInfo ex = getUserById(id);
        repo.delete(ex);
        return "User deleted successfully";
    }
    
    @Override
    public UserInfo updateUserRole(Long id, String newRole) {
        UserInfo user = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(newRole);
        return repo.save(user);
    }


    @Override
    public String loginAndGetToken(String email, String password) {
        UserInfo user = repo.findByEmail(email)
                .orElseThrow(() -> new UserInfoNotFoundException("Invalid credentials"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new UserInfoNotFoundException("Invalid credentials");
        }

        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }

	@Override
	public UserInfo register(UserInfoDto dto) {
		 repo.findByEmail(dto.getEmail()).ifPresent(u -> {
	            throw new DuplicateResourceException("Email already registered: " + dto.getEmail());
	        });

	        UserInfo user = new UserInfo();
	        user.setName(dto.getName());
	        user.setEmail(dto.getEmail());
	        user.setPassword(encoder.encode(dto.getPassword()));
	        user.setGender(dto.getGender());
	        user.setContactNo(dto.getContactNo());
	        user.setAddress(dto.getAddress());
	        user.setRole("USER");

	        return repo.save(user);
	}

}
