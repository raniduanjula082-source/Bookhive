package com.example.library.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.library.model.Order;
import com.example.library.payload.request.OrderRequest;
import com.example.library.payload.response.MessageResponse;
import com.example.library.security.services.UserDetailsImpl;
import com.example.library.service.OrderService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> placeOrder(@Valid @RequestBody OrderRequest orderRequest) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Order order = orderService.placeOrder(userDetails.getId(), orderRequest);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/myorders")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Order> getUserOrders() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return orderService.getUserOrders(userDetails.getId());
    }

    // Admin endpoints
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PutMapping("/admin/{orderId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateOrderStatus(@PathVariable String orderId, @RequestParam String status) {
        Order order = orderService.updateOrderStatus(orderId, status);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.status(404).body(new MessageResponse("Order not found"));
        }
    }
}
