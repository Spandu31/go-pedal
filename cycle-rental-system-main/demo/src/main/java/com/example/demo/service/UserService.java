package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.pack1.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Password encoding should be done here for security (using BCryptPasswordEncoder)
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return Optional.of(userRepository.findByEmail(email));
    }
}
