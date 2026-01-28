package com.example.demo.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
	
	
	    
    private Integer uid; // customer ID
    private List<OrderItemDTO> items;
    
    public Integer getUid() { return uid; }
    public void setUid(Integer uid) { this.uid = uid; }

    public List<OrderItemDTO> getItems() { return items; }
    public void setItems(List<OrderItemDTO> items) { this.items = items; }
    
    
    
}
