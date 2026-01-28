package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
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
@Table(name = "product")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@ToString

public class Product {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int pid;

	    private String pname;

	    @ManyToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "cat_id")
	    @JsonIgnoreProperties({"category"})
	    private Category category;

}
