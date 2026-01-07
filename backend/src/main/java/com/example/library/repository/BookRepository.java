package com.example.library.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.library.model.Book;

public interface BookRepository extends MongoRepository<Book, String> {
    // You can add custom query methods here if needed, e.g. findByCategory
    java.util.List<Book> findByCategory(String category);

    java.util.List<Book> findByPublisher(String publisher);

    java.util.List<Book> findByIsFeaturedTrue();

    java.util.List<Book> findByIsRecommendedTrue();
}
