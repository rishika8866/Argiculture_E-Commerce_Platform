package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductSellerDTO {
    private String categoryName;
    private String productName;
    private String userName;
    private Integer price;
    private int qty;
}
