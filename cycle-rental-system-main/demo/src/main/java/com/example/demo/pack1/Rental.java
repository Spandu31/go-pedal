package com.example.demo.pack1;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rentalId;

    @ManyToOne
    private User user;

    @ManyToOne
    private Cycle cycle;

    private LocalDateTime rentStart;
    private LocalDateTime rentEnd;
    private LocalDate rentalDate;

    // Getters and Setters

    public Long getRentalId() {
        return rentalId;
    }

    public void setRentalId(Long rentalId) {
        this.rentalId = rentalId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Cycle getCycle() {
        return cycle;
    }

    public void setCycle(Cycle cycle) {
        this.cycle = cycle;
    }

    public LocalDateTime getRentStart() {
        return rentStart;
    }

    public void setRentStart(LocalDateTime rentStart) {
        this.rentStart = rentStart;
    }

    public LocalDateTime getRentEnd() {
        return rentEnd;
    }

    public void setRentEnd(LocalDateTime rentEnd) {
        this.rentEnd = rentEnd;
    }

    public LocalDate getRentalDate() {
        return rentalDate;
    }

    public void setRentalDate(LocalDate rentalDate) {
        this.rentalDate = rentalDate;
    }
}
