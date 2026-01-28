package com.example.demo.controller;

import com.example.demo.dto.OrderRequest;
import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductSeller;
import com.example.demo.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
//@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // 1️ Place an order
    @PostMapping("/place-order")
    public ResponseEntity<Order> placeOrder(@RequestBody OrderRequest orderRequest) {
        Order order = customerService.placeOrder(orderRequest);
        return ResponseEntity.ok(order);
    }


    // 2️ Get all orders by customer ID
    @GetMapping("/orders/{uid}")
    public ResponseEntity<List<Order>> getOrders(@PathVariable int uid) {
        return ResponseEntity.ok(customerService.getOrdersByCustomer(uid));
    }

    // 3️ Cancel an order
    @PutMapping("/cancel-order/{oid}")
    public ResponseEntity<String> cancelOrder(@PathVariable int oid) {
        return ResponseEntity.ok(customerService.cancelOrder(oid));
    }

    // 4️ Get all available products (from ProductSeller table)
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(customerService.getAllProducts());
    }
}
