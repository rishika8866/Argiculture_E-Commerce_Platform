package com.example.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Login;
import com.example.demo.repositories.LoginRepository;

@Service
public class LoginService {

	   @Autowired
	    LoginRepository lrepo;

	    public Login getLogin(String email, String password) {
	        return lrepo.getLogin(email, password).orElse(null);
	    }
	
}
