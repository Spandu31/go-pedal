package com.example.demo.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.pack1.Rental;
import com.example.demo.service.RentalService;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @PostMapping("/rent")
    public ResponseEntity<Rental> rentCycle(@RequestParam Long userId, @RequestParam Long cycleId, 
                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime rentStart, 
                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime rentEnd) {
        Rental rental = rentalService.rentCycle(userId, cycleId, rentStart, rentEnd);
        return ResponseEntity.status(HttpStatus.CREATED).body(rental);
    }

    @PostMapping("/return/{rentalId}")
    public ResponseEntity<Rental> returnCycle(@PathVariable Long rentalId, 
                                              @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime returnDate) {
        Rental rental = rentalService.returnCycle(rentalId, returnDate);
        return ResponseEntity.ok(rental);
    }

    @GetMapping("/history/{userId}")
    public List<Rental> getRentalHistory(@PathVariable Long userId) {
        return rentalService.getRentalHistory(userId);
    }
}

