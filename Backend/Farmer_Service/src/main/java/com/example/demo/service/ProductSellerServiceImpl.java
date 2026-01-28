package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.ProductSeller;
import com.example.demo.repository.ProductSellerRepository;

@Service
public class ProductSellerServiceImpl implements ProductSellerService {

    @Autowired
    private ProductSellerRepository productSellerRepository;

    @Override
    public ProductSeller addProductListing(ProductSeller ps) {
        return productSellerRepository.save(ps);
    }

    @Override
    public List<ProductSeller> getProductsByFarmer(int uid) {
        return productSellerRepository.findByFarmerUid(uid);
    }

   
    @Override
    public ProductSeller getById(int psId) {
        return productSellerRepository.findById(psId).orElse(null);
    }
    
    
    @Override
    public ProductSeller updateProductListing(ProductSeller updated) {
        ProductSeller existing = productSellerRepository.findById(updated.getPsId()).orElse(null);
        if (existing != null) {
            existing.setPrice(updated.getPrice());
            existing.setQty(updated.getQty());
            return productSellerRepository.save(existing);
        }
        return null;
    }
}
