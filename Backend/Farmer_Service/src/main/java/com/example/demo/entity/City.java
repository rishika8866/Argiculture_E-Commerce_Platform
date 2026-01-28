package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "city")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString
public class City {


	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int cityid;

	    private String cityname;

	    
	

}
