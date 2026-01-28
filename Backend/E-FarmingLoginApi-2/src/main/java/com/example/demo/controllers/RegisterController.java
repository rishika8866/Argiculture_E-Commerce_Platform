package com.example.demo.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Login;
import com.example.demo.services.RegisterService;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api2")
@RestController
public class RegisterController {

    @Autowired
    private RegisterService regService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Login login) {
        try {
            int rid = login.getRid().getRid();  
            regService.registerLogin(login, rid);
            return ResponseEntity.ok(Map.of("message", "Registration successful"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(Map.of("message", "Registration failed: " + e.getMessage()));
        }
    }
}
