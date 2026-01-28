package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Product;
import com.example.demo.entity.Category;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	@Query("SELECT p FROM Product p WHERE p.pname = :pname AND p.category = :category")
	Optional<Product> findByPnameAndCategory(@Param("pname") String pname, @Param("category") Category category);

}
