package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Login;
import com.example.demo.entities.Role;
import com.example.demo.repositories.LoginRepository;
import com.example.demo.repositories.RoleRepository;

@Service
public class RegisterService {

    @Autowired
    LoginRepository loginRepo;

    @Autowired
    RoleRepository roleRepo;

    public String registerLogin(Login login, int rid) {
        if (loginRepo.existsByEmail(login.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Role role = roleRepo.findById(rid).orElseThrow(() -> new RuntimeException("Invalid role ID"));
        login.setRid(role);

        loginRepo.save(login);
        return "Registration successful";
    }
}
