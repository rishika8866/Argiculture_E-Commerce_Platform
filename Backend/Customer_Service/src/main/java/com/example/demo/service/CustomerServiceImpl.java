package com.example.demo.service;

import com.example.demo.dto.OrderItemDTO;
import com.example.demo.dto.OrderRequest;
import com.example.demo.entity.*;
import com.example.demo.repository.*;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

	private final CustomerRepository customerRepository;
	private final ProductSellerRepository productSellerRepository;
	private final ProductRepository productRepository;
	private final OrderRepository orderRepository;
	private final OrderDetailsRepository orderDetailsRepository;

	public CustomerServiceImpl(CustomerRepository customerRepository, ProductSellerRepository productSellerRepository,
			ProductRepository productRepository, OrderRepository orderRepository,
			OrderDetailsRepository orderDetailsRepository) {
		this.customerRepository = customerRepository;
		this.productSellerRepository = productSellerRepository;
		this.productRepository = productRepository;
		this.orderRepository = orderRepository;
		this.orderDetailsRepository = orderDetailsRepository;
	}

//	@Override
//	public Order placeOrder(OrderRequest request) {
//		// Get customer id from request
//		Integer customerId = request.getUid();
//
//		if (customerId == null) {
//			throw new RuntimeException("Customer ID (uid) is required");
//		}
//
//		Customer customer = customerRepository.findById(customerId)
//				.orElseThrow(() -> new RuntimeException("Customer not found"));
//
//		Order order = new Order();
//		order.setCustomer(customer);
//		order.setODate(LocalDate.now());
//		order.setStatus("Placed");
//
//		List<OrderDetails> orderDetailsList = new ArrayList<>();
//		double totalAmount = 0;
//
//		for (OrderItemDTO item : request.getItems()) {
//			Product product = productRepository.findById(item.getPid())
//					.orElseThrow(() -> new RuntimeException("Product not found"));
//
//			// Get ProductSeller for this product
//			ProductSeller productSeller = productSellerRepository.findAll().stream()
//					.filter(ps -> ps.getPId().getPid().equals(item.getPid()) && ps.isAvailable()).findFirst()
//					.orElseThrow(() -> new RuntimeException("Product not available from any seller"));
//
//			OrderDetails orderDetails = new OrderDetails();
//			orderDetails.setQuantity(item.getQuantity());
//			double amount = productSeller.getPrice() * item.getQuantity();
//			orderDetails.setAmt(amount);
//			orderDetails.setOrder(order);
//			orderDetails.setProductSeller(productSeller);
//			orderDetails.setPid(product.getPid());
//
//			totalAmount += amount;
//			orderDetailsList.add(orderDetails);
//		}
//
//		order.setTotalAmount((int) totalAmount);
//		order.setOrderDetails(orderDetailsList);
//
//		return orderRepository.save(order);
//	}

	@Override
	@Transactional
	public Order placeOrder(OrderRequest request) {
	    Integer customerId = request.getUid();

	    if (customerId == null) {
	        throw new RuntimeException("Customer ID (uid) is required");
	    }

	    Customer customer = customerRepository.findById(customerId)
	        .orElseThrow(() -> new RuntimeException("Customer not found"));

	    Order order = new Order();
	    order.setCustomer(customer);
	    order.setODate(LocalDate.now());
	    order.setStatus("Placed");

	    List<OrderDetails> orderDetailsList = new ArrayList<>();
	    double totalAmount = 0;

	    for (OrderItemDTO item : request.getItems()) {
	        Product product = productRepository.findById(item.getPid())
	                .orElseThrow(() -> new RuntimeException("Product not found"));

	        ProductSeller productSeller = productSellerRepository.findAll().stream()
	                .filter(ps -> ps.getPId().getPid().equals(item.getPid()) && ps.isAvailable() && ps.getQty() >= item.getQuantity())
	                .findFirst()
	                .orElseThrow(() -> new RuntimeException("Product not available or insufficient quantity"));

	        // Deduct quantity from product seller stock
	        productSeller.setQty(productSeller.getQty() - item.getQuantity());
	        productSellerRepository.save(productSeller);

	        OrderDetails orderDetails = new OrderDetails();
	        orderDetails.setQuantity(item.getQuantity());
	        double amount = productSeller.getPrice() * item.getQuantity();
	        orderDetails.setAmt(amount);
	        orderDetails.setOrder(order);
	        orderDetails.setProductSeller(productSeller);
	        orderDetails.setPid(product.getPid());

	        totalAmount += amount;
	        orderDetailsList.add(orderDetails);
	    }

	    order.setTotalAmount((int) Math.round(totalAmount)); // Prefer double or BigDecimal if possible
	    order.setOrderDetails(orderDetailsList);

	    // Save order along with order details if cascade ALL enabled
	    Order savedOrder = orderRepository.save(order);

	    // If cascade is not enabled, save orderDetails explicitly:
	    // orderDetailsRepository.saveAll(orderDetailsList);

	    return savedOrder;
	}

	
	@Override
	public List<Order> getOrdersByCustomer(int uid) {
		return orderRepository.findByCustomer_Uid(uid);
	}

	@Override
	public String cancelOrder(int oid) {
		Order order = orderRepository.findById(oid).orElseThrow(() -> new RuntimeException("Order not found"));

		order.setStatus("Cancelled");
		orderRepository.save(order);
		return "Order cancelled successfully";
	}

	@Override
	public List<Product> getAllProducts() {
		List<ProductSeller> availableProducts = productSellerRepository.findByAvailableTrue();
		List<Product> products = new ArrayList<>();
		for (ProductSeller ps : availableProducts) {
			products.add(ps.getPId());
		}
		return products;
	}
}
