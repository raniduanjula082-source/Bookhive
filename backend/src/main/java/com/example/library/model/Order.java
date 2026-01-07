package com.example.library.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "orders")
public class Order {
    @Id
    private String id;

    @DBRef
    private User user;

    private List<OrderItem> orderItems;

    private Double totalAmount;

    private String status; // "PENDING", "COMPLETED", "CANCELLED"

    private LocalDateTime createdAt;

    public Order(User user, List<OrderItem> orderItems, Double totalAmount, String status) {
        this.user = user;
        this.orderItems = orderItems;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }
}
