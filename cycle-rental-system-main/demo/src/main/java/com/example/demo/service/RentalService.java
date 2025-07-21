package com.example.demo.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.pack1.Cycle;
import com.example.demo.pack1.Rental;
import com.example.demo.pack1.User;
import com.example.demo.repository.CycleRepository;
import com.example.demo.repository.RentalRepository;
import com.example.demo.repository.UserRepository;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private CycleRepository cycleRepository;

    @Autowired
    private UserRepository userRepository;

    public Rental rentCycle(Long userId, Long cycleId, LocalDateTime rentStart, LocalDateTime rentEnd) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Cycle cycle = cycleRepository.findById(cycleId).orElseThrow(() -> new RuntimeException("Cycle not found"));
        
        // Check if cycle is available before renting
        if (!cycle.isAvailable()) {
            throw new RuntimeException("Cycle is not available for rent");
        }

        // Create a new rental record
        Rental rental = new Rental();
        rental.setUser(user);
        rental.setCycle(cycle);
        rental.setRentStart(rentStart);
        rental.setRentEnd(rentEnd);
        rental.setRentalDate(LocalDate.now());

        // Set the cycle as not available
        cycle.setAvailable(false);
        cycleRepository.save(cycle);

        return rentalRepository.save(rental);
    }

    public Rental returnCycle(Long rentalId, LocalDateTime returnDate) {
        Rental rental = rentalRepository.findById(rentalId).orElseThrow(() -> new RuntimeException("Rental not found"));
        Cycle cycle = rental.getCycle();
        
        // Set cycle as available again
        cycle.setAvailable(true);
        cycleRepository.save(cycle);

        rental.setRentEnd(returnDate);
        return rentalRepository.save(rental);
    }

    public List<Rental> getRentalHistory(Long userId) {
        return rentalRepository.findByUserId(userId);
    }
}

