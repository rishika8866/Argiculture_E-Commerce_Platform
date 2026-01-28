package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @Column(name = "oid")
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer oid;

    @ManyToOne
    @JoinColumn(name = "uid", nullable = false)
    private Customer customer;

    @Column(name = "o_date", nullable = false)
    private LocalDate oDate;

    @Column(name = "status")
    private String status;
    
    @Column(name = "total_amount", nullable = false)
    private Integer totalAmount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderDetails> orderDetails;
}
