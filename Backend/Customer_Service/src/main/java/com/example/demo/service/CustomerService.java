package com.example.demo.service;

import com.example.demo.dto.OrderRequest;
import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import java.util.List;

public interface CustomerService {
    Order placeOrder(OrderRequest request);
    List<Order> getOrdersByCustomer(int uid);
    String cancelOrder(int oid);
    List<Product> getAllProducts();
}
