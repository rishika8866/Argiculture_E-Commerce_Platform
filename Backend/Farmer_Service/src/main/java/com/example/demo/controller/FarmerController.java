package com.example.demo.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.ProductSellerDTO;
import com.example.demo.entity.Category;
import com.example.demo.entity.Farmer;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductSeller;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.FarmerRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ProductSellerRepository;
import com.example.demo.service.ProductSellerService;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/farmer")
public class FarmerController {

    @Autowired
    private ProductSellerService productSellerService;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private FarmerRepository farmerRepo;
    
    @Autowired
    private CategoryRepository categoryRepo;
    
    @Autowired
    private ProductSellerRepository productSellerRepo;

    
    @Autowired
    private ProductSellerRepository productSellerRepository;

    @GetMapping("/products/{uid}")
    public List<ProductSeller> getProducts(@PathVariable int uid) {
        return productSellerService.getProductsByFarmer(uid);
    }

//    @PostMapping("/add-product")
//    public ProductSeller addProduct(@RequestBody ProductSellerDTO dto) {
//
//        // 1. Find product by name
//        Product product = productRepo.findByPname(dto.getProductName())
//                .orElseGet(() -> {
//                    // If product not found, create it
//                    Product newProduct = new Product();
//                    newProduct.setPname(dto.getProductName());
//                    newProduct.setCatId(dto.getCatId()); // you'll need cat_id in DTO
//                    return productRepo.save(newProduct);
//                });
//
//        // 2. Get farmer (user)
//        Farmer farmer = farmerRepo.findById(dto.getUid()).orElse(null);
//        if (farmer == null) {
//            throw new RuntimeException("Farmer not found with ID: " + dto.getUid());
//        }
//
//        // 3. Create ProductSeller entry
//        ProductSeller ps = new ProductSeller();
//        ps.setPrice(dto.getPrice());
//        ps.setQty(dto.getQty());
//        ps.setAvailable(dto.isAvailable());
//        ps.setProduct(product);
//        ps.setFarmer(farmer);
//
//        return productSellerService.addProductListing(ps);
//    }

    @PostMapping("/add-product")
    public ProductSeller addProduct(@RequestBody ProductSellerDTO dto) {

        // 1. Get or create category
        Category category = categoryRepo.findByCatName(dto.getCategoryName())
            .orElseGet(() -> {
                Category newCategory = new Category();
                newCategory.setCat_name(dto.getCategoryName()); // match entity field name
                return categoryRepo.save(newCategory);
            });

        // 2. Always create a new product under the category
        Product product = new Product();
        product.setPname(dto.getProductName());
        product.setCategory(category);
        product = productRepo.save(product);

        // 3. Find farmer by username
        Farmer farmer = farmerRepo.findByUname(dto.getUserName())
            .orElseThrow(() -> new RuntimeException("Farmer not found: " + dto.getUserName()));

        // 4. Create ProductSeller
        ProductSeller ps = new ProductSeller();
        ps.setPrice(dto.getPrice());
        ps.setQty(dto.getQty());
        ps.setAvailable(true); // default to available
        ps.setProduct(product);
        ps.setFarmer(farmer);

        return productSellerService.addProductListing(ps);
    }
    
    
    @PutMapping("/product-availability/{psid}")
    public ResponseEntity<String> updateAvailability(@PathVariable int psid, @RequestParam boolean available) {
        ProductSeller ps = productSellerService.getById(psid);
        if (ps != null) {
            ps.setAvailable(available);
            productSellerService.addProductListing(ps);
            return ResponseEntity.ok("Product availability updated.");
        }
        return ResponseEntity.badRequest().body("Product not found.");
    }

    
    
    @PutMapping("/update-product")
    public ResponseEntity<ProductSeller> updateProduct(@RequestBody ProductSeller updatedProduct) {
        Optional<ProductSeller> productOpt = productSellerRepository.findById(updatedProduct.getPsId());

        if (productOpt.isPresent()) {
            ProductSeller product = productOpt.get();
            product.setPrice(updatedProduct.getPrice());
            product.setQty(updatedProduct.getQty());
            product.setAvailable(updatedProduct.isAvailable());
            return ResponseEntity.ok(productSellerRepository.save(product));
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    
    
//    @DeleteMapping("/delete-product/{psid}")
//    public ResponseEntity<String> deleteProduct(@PathVariable int psid) {
//        productSellerService.deleteProduct(psid);
//        return ResponseEntity.ok("ProductSeller with psid " + psid + " deleted successfully.");
//    }

    @GetMapping("/test")
    public String test() {
        return "API Working ✅";
    }
}