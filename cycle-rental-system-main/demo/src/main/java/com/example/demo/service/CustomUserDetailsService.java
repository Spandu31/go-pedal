package com.example.demo.service;

import com.example.demo.pack1.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Use findByUsername() to get the user from the repository
        User user = userRepository.findByUsername(username);
        
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        // Return custom UserDetails object
        return new CustomUserDetails(user);
    }
}
