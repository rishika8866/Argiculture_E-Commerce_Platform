package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ProductSeller;

public interface ProductSellerRepository extends JpaRepository<ProductSeller, Integer> {

	 List<ProductSeller> findByFarmerUid(int uid);
}
