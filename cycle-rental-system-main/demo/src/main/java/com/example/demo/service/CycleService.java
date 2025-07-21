package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.pack1.Cycle;
import com.example.demo.repository.CycleRepository;

@Service
public class CycleService {

    @Autowired
    private CycleRepository cycleRepository;

    public List<Cycle> getAvailableCycles() {
        return cycleRepository.findByIsAvailableTrue();
    }

    public Cycle getCycleById(Long id) {
        return cycleRepository.findById(id).orElseThrow(() -> new RuntimeException("Cycle not found"));
    }

    public Cycle updateCycle(Cycle cycle) {
        return cycleRepository.save(cycle);
    }
}
