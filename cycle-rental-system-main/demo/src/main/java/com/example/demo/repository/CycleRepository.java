package com.example.demo.repository;

import com.example.demo.pack1.Cycle;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CycleRepository extends JpaRepository<Cycle, Long> {

    List<Cycle> findByIsAvailableTrue();
    // You can add custom query methods here if needed
}
