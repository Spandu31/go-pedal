package com.example.demo.controller;

import com.example.demo.pack1.Cycle;
import com.example.demo.pack1.User;
import com.example.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Add a new cycle
    @PostMapping("/addCycle")
    public Cycle addCycle(@RequestBody Cycle cycle) {
        return adminService.addCycle(cycle);
    }

    // Remove a cycle by ID
    @DeleteMapping("/removeCycle/{id}")
    public String removeCycle(@PathVariable Long id) {
        adminService.removeCycle(id);
        return "Cycle removed with ID: " + id;
    }

    // Update an existing cycle
    @PutMapping("/updateCycle")
    public Cycle updateCycle(@RequestBody Cycle cycle) {
        return adminService.updateCycle(cycle);
    }

    // Block a user by ID
    @PutMapping("/blockUser/{userId}")
    public String blockUser(@PathVariable Long userId) {
        adminService.blockUser(userId);
        return "User blocked with ID: " + userId;
    }

    // Get list of all users
    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }
}
