package com.example.library.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "books")
public class Book {
    @Id
    private String id;

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
    private Boolean isFeatured = false;
    private Boolean isRecommended = false;

    public Book(String title, String author, String description, String category, Double price, String imageUrl,
            String publisher) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.category = category;
        this.price = price;
        this.imageUrl = imageUrl;
        this.publisher = publisher;
    }
}
