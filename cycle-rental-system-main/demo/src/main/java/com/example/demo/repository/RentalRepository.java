package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.pack1.Rental;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {

    // Find rentals by user ID
    List<Rental> findByUserId(Long userId);

    // Optional: You can add more custom queries if needed, for example:
    // Find all rentals for a specific cycle
    List<Rental> findByCycleId(Long cycleId);
}
