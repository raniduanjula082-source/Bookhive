package com.example.library.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.library.model.Order;
import com.example.library.model.User;
import com.example.library.payload.request.OrderRequest;
import com.example.library.repository.OrderRepository;
import com.example.library.repository.UserRepository;
import com.example.library.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Order placeOrder(String userId, OrderRequest orderRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Double totalAmount = orderRequest.getOrderItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();

        Order order = new Order(user, orderRequest.getOrderItems(), totalAmount, "PENDING");
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getUserOrders(String userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order updateOrderStatus(String orderId, String status) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setStatus(status);
            return orderRepository.save(order);
        }
        return null;
    }
}
