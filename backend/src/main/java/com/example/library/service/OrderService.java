package com.example.library.service;

import java.util.List;

import com.example.library.model.Order;
import com.example.library.payload.request.OrderRequest;

public interface OrderService {
    Order placeOrder(String userId, OrderRequest orderRequest);

    List<Order> getUserOrders(String userId);

    List<Order> getAllOrders(); // For admin

    Order updateOrderStatus(String orderId, String status);
}
