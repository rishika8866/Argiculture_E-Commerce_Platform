package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Login;
import com.example.demo.repositories.LoginRepository;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private LoginRepository repo;

    // For Spring Security
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Login user = repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),         // username
                user.getPassword(),      // password
                Collections.emptyList()  // no authorities for now
        );
    }

    // For our controller (to get role, etc.)
    public Login loadLoginEntityByEmail(String email) {
        return repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
}
