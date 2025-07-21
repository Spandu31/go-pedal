package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/connection")
    public String testConnection() {
        try {
            long userCount = userRepository.count();  // Try to fetch data to test DB connection
            return "Database connection successful. User count: " + userCount;
        } catch (Exception e) {
            return "Database connection failed: " + e.getMessage();
        }
    }
}
