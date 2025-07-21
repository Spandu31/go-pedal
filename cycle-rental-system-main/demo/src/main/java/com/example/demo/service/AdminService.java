package com.example.demo.service;

import com.example.demo.pack1.Cycle;
import com.example.demo.pack1.User;
import com.example.demo.pack1.Role;
import com.example.demo.repository.CycleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CycleRepository cycleRepository;

    // Create Admin
    public User createAdmin(String name, String email, String password) {
        Role adminRole = roleRepository.findByName("ADMIN");
        if (adminRole == null) {
            adminRole = new Role("ADMIN");
            roleRepository.save(adminRole);
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(adminRole);
        user.setBlocked(false);

        return userRepository.save(user);
    }

    // Add Cycle
    public Cycle addCycle(Cycle cycle) {
        return cycleRepository.save(cycle);
    }

    // Remove Cycle
    public void removeCycle(Long id) {
        cycleRepository.deleteById(id);
    }

    // Update Cycle
    public Cycle updateCycle(Cycle updatedCycle) {
        return cycleRepository.save(updatedCycle);
    }

    // Block User
    public void blockUser(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setBlocked(true);
            userRepository.save(user);
        }
    }

    // Get All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
