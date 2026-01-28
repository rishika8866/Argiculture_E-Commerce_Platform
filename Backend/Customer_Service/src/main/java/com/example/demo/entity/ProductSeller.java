package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_seller")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductSeller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ps_id")
    private Integer psId;

    @ManyToOne
    @JoinColumn(name = "p_id", nullable = false)
    private Product pId;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private int qty;

    @Column(nullable = false)
    private boolean available;
}
