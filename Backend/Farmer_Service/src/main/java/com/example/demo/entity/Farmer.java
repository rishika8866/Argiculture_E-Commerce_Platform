package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="user")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString
public class Farmer {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int uid;

	    private String uname;
	    private String email;
	    private String contactNo;
	    private String accNo;
	    private String password;
	    private String address;

	    @ManyToOne
	    @JsonIgnoreProperties({"category"})
	    @JoinColumn(name = "rid")
	    private Role role;

	    @ManyToOne
	    @JoinColumn(name = "city_id")
	    private City city;

}
