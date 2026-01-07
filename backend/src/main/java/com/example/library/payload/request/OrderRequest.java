package com.example.library.payload.request;

import java.util.List;

import com.example.library.model.OrderItem;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class OrderRequest {
    @NotEmpty
    private List<OrderItem> orderItems;
}
