package com.example.demo.service;

import com.example.demo.pack1.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private User user;

    // Constructor to initialize the user object
    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // This can be adjusted to return roles/authorities for your user
        // For now, we are returning an empty list of authorities
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER")); // Adjust role if necessary
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword(); // Return the user's password
    }

    @Override
    public String getUsername() {
        return user.getName(); // Return the user's username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Adjust if you want to implement account expiration logic
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Implement logic for locked accounts if necessary
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Implement if you have a credentials expiration policy
    }

    @Override
    public boolean isEnabled() {
        return true; // Implement if you want to handle account enabling/disabling logic
    }

    // Additional methods to access the user object (optional)
    public User getUser() {
        return user;
    }
}
