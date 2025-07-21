package com.example.demo.pack1;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")  // Optional: table name in DB
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
     // Add this field if needed

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private boolean blocked;  // ✅ for blocking/unblocking users

    @ManyToOne
    @JoinColumn(name = "role_id")  // Foreign key column
    private Role role;

    // 🔽 Constructors
    public User() {
    }

    public User(String name, String email, String password, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.blocked = false;  // default to not blocked
    }

    // 🔽 Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
    private String username;

    // Getter and Setter
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    


}
