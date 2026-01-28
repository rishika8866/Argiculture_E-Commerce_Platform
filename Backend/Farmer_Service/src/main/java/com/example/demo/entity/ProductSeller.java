package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_seller")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ProductSeller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int psId;

    private int price;
    private int qty;

    @ManyToOne
    @JoinColumn(name = "p_id", referencedColumnName = "pid") // FK to product table
    private Product product;

    @ManyToOne
    @JoinColumn(name = "u_id", referencedColumnName = "uid") // FK to farmer/user table
    private Farmer farmer;

    @Column(name = "available")
    private boolean available = true;
    // Getters and setters
}
