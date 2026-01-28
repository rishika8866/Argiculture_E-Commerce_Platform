package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.ProductSeller;

public interface ProductSellerService {

	  ProductSeller addProductListing(ProductSeller ps);
	    List<ProductSeller> getProductsByFarmer(int uid);
	   
	    ProductSeller getById(int psId);
	    
	    
	    ProductSeller updateProductListing(ProductSeller ps);
	    
	    
	
}
