package com.example.library.service;

import java.util.List;
import java.util.Optional;

import com.example.library.model.Book;
import com.example.library.payload.request.BookRequest;

public interface BookService {
    List<Book> getAllBooks();

    Optional<Book> getBookById(String id);

    Book addBook(BookRequest bookRequest);

    Book updateBook(String id, BookRequest bookRequest);

    void deleteBook(String id);

    List<Book> getBooksByCategory(String category);

    List<Book> getBooksByPublisher(String publisher);

    List<Book> getFeaturedBooks();

    List<Book> getRecommendedBooks();
}
