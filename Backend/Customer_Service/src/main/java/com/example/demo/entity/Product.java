package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pid")
    private Integer pid;

    @Column(nullable = false)
    private String pname;

    @ManyToOne
    @JoinColumn(name = "cat_id", nullable = false)
    private Category CatId;

	
}
