package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid")
    private Integer uid;

    @Column(nullable = false)
    private String uname;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name="contact_no",nullable = false)
    private String contactNo;
    
    @Column
    private String address;

    @ManyToOne
    @JoinColumn(name = "city_id")
    
    private City cityId;

    @ManyToOne
    @JoinColumn(name = "rid")
    private Role rid;
}
