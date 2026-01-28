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
@Table(name = "category")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString
public class Category {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int cat_id;

	    private String cat_name;
}
