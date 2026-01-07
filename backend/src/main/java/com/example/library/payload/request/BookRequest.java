package com.example.library.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String author;

    @NotBlank
    private String description;

    @NotBlank
    private String category;

    @NotNull
    private Double price;

    @NotBlank
    private String imageUrl;

    private String publisher;
    private Boolean isFeatured;
    private Boolean isRecommended;
}
