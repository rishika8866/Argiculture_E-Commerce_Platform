package com.example.demo.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Login;
import com.example.demo.entities.Role;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.services.RegisterService;


@RestController
@RequestMapping("/api1/reg")
public class RegisterController {

    @Autowired
    private RegisterService regService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    RoleRepository rolerepo;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Login login) {
        try {

            int rid = login.getRid().getRid();
            Optional<Role> byId = rolerepo.findById(rid);
            Role role = byId.get();
            login.setRid(role);
            login.setPassword(passwordEncoder.encode(login.getPassword()));
            regService.registerLogin(login);
            return ResponseEntity.ok(Map.of("message", "Registration successful"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(Map.of("message", "Registration failed: " + e.getMessage()));
        }
    }
}
