package com.hexaware.simplyfly.security;

import com.hexaware.simplyfly.entities.UserInfo;
import com.hexaware.simplyfly.repositories.UserInfoRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

/*Author : Swetha
Modified On : 9-08-2025
Description : CustomerUserDetailsService implemented
*/

@Service
@Primary
public class CustomerUserDetailsService implements UserDetailsService {

    private final UserInfoRepository repo;

    public CustomerUserDetailsService(UserInfoRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserInfo user = repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
        );
    }
}
