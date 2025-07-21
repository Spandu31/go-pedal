package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.pack1.Cycle;
import com.example.demo.service.CycleService;

@RestController
@RequestMapping("/api/cycles")
public class CycleController {

    @Autowired
    private CycleService cycleService;

    @GetMapping("/available")
    public List<Cycle> getAvailableCycles() {
        return cycleService.getAvailableCycles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cycle> getCycleById(@PathVariable Long id) {
        Cycle cycle = cycleService.getCycleById(id);
        return ResponseEntity.ok(cycle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cycle> updateCycle(@PathVariable Long id, @RequestBody Cycle cycle) {
        cycle.setId(id);
        Cycle updatedCycle = cycleService.updateCycle(cycle);
        return ResponseEntity.ok(updatedCycle);
    }
}
