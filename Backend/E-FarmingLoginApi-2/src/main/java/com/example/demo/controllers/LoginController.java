package com.example.demo.controllers;



import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Login;
import com.example.demo.entities.LoginCheck;
import com.example.demo.services.LoginService;
import com.example.demo.services.RegisterService;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api1")
public class LoginController {

	    @Autowired
	    LoginService lservice;
	    
	

	    @PostMapping("/login")
	    public Login checkLogin(@RequestBody LoginCheck lcheck) {
	        return lservice.getLogin(lcheck.getEmail(), lcheck.getPassword());
	        
	        
	    }
	    
	    

	}
