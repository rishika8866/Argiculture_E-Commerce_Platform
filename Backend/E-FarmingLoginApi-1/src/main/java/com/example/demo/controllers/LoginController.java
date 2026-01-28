package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Login;
import com.example.demo.entities.LoginCheck;
import com.example.demo.security.JwtUtil;
import com.example.demo.services.CustomUserDetailsService;



@RestController
@RequestMapping("/api1")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> generateToken(@RequestBody LoginCheck loginRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), 
                    loginRequest.getPassword()
                )
            );
        } catch (BadCredentialsException e) {
           
            return ResponseEntity.status(401).body(
                Map.of("success", false, "message", "Invalid credentials")
            );
        }

       
        Login loginUser = customUserDetailsService.loadLoginEntityByEmail(loginRequest.getEmail());
        String token = jwtUtil.generateToken(loginUser.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("uname", loginUser.getEmail());
        response.put("role", loginUser.getRid().getRid()); // ✅ role ID


        return ResponseEntity.ok(response);
    }
}
