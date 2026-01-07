package com.example.library.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.library.model.Order;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserId(String userId);
}
