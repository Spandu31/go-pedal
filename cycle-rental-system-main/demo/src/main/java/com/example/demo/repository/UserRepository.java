package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.pack1.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // Declare the query method — Spring will implement it automatically
    User findByEmail(String email);
    User findByUsername(String username);

}
