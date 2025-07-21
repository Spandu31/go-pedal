package com.example.demo.pack1;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Cycle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String model;
    private boolean isAvailable;
    private String powerSource; // e.g., "Electric", "Solar", or "Both"
    private int batteryLevel;   // in percentage
    private LocalDate lastServiceDate;
    private String status;      // e.g., "Good", "Needs Maintenance"

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public String getPowerSource() {
        return powerSource;
    }

    public void setPowerSource(String powerSource) {
        this.powerSource = powerSource;
    }

    public int getBatteryLevel() {
        return batteryLevel;
    }

    public void setBatteryLevel(int batteryLevel) {
        this.batteryLevel = batteryLevel;
    }

    public LocalDate getLastServiceDate() {
        return lastServiceDate;
    }

    public void setLastServiceDate(LocalDate lastServiceDate) {
        this.lastServiceDate = lastServiceDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
