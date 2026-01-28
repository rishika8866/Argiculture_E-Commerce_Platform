package com.example.demo.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
    private Integer pid;        // product id
    private Integer quantity;   // quantity
    
    
    
    public Integer getPid() { return pid; }
    public void setPid(Integer pid) { this.pid = pid; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
