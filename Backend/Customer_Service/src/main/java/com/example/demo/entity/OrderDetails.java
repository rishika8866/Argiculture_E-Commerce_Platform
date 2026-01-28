package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "order_details")
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "odid")
    private int odid;

    @Column
    private int quantity;
    @Column
    private double amt;

    @ManyToOne
    @JoinColumn(name = "oid")
    @JsonBackReference
    private Order order;

    @ManyToOne
    @JoinColumn(name = "ps_id")
    private ProductSeller productSeller;
    
    @Column
    private Integer pid;

	
}
