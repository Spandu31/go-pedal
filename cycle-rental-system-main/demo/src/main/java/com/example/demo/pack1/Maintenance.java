package com.example.demo.pack1;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Maintenance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long maintenanceId;

    @ManyToOne
    private Cycle cycle;

    private LocalDate serviceDate;
    private String description;

    // Getters and Setters
    public Long getMaintenanceId() {
        return maintenanceId;
    }

    public void setMaintenanceId(Long maintenanceId) {
        this.maintenanceId = maintenanceId;
    }

    public Cycle getCycle() {
        return cycle;
    }

    public void setCycle(Cycle cycle) {
        this.cycle = cycle;
    }

    public LocalDate getServiceDate() {
        return serviceDate;
    }

    public void setServiceDate(LocalDate serviceDate) {
        this.serviceDate = serviceDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
