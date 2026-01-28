package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "city")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class City {
    @Id
    @Column(name = "city_id")
    
    private Integer cityId;

    @Column(name = "cityname", nullable = false)
    private String cityname;
}
