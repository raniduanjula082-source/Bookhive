package com.example.library.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.library.model.Book;
import com.example.library.payload.request.BookRequest;
import com.example.library.repository.BookRepository;
import com.example.library.service.BookService;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> getBookById(String id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book addBook(BookRequest bookRequest) {
        Book book = new Book(
                bookRequest.getTitle(),
                bookRequest.getAuthor(),
                bookRequest.getDescription(),
                bookRequest.getCategory(),
                bookRequest.getPrice(),
                bookRequest.getImageUrl(),
                bookRequest.getPublisher() != null ? bookRequest.getPublisher() : "Unknown");

        if (bookRequest.getIsFeatured() != null)
            book.setIsFeatured(bookRequest.getIsFeatured());
        if (bookRequest.getIsRecommended() != null)
            book.setIsRecommended(bookRequest.getIsRecommended());

        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(String id, BookRequest bookRequest) {
        Optional<Book> bookData = bookRepository.findById(id);
        if (bookData.isPresent()) {
            Book book = bookData.get();
            book.setTitle(bookRequest.getTitle());
            book.setAuthor(bookRequest.getAuthor());
            book.setDescription(bookRequest.getDescription());
            book.setCategory(bookRequest.getCategory());
            book.setPrice(bookRequest.getPrice());
            book.setImageUrl(bookRequest.getImageUrl());
            if (bookRequest.getPublisher() != null)
                book.setPublisher(bookRequest.getPublisher());
            if (bookRequest.getIsFeatured() != null)
                book.setIsFeatured(bookRequest.getIsFeatured());
            if (bookRequest.getIsRecommended() != null)
                book.setIsRecommended(bookRequest.getIsRecommended());
            return bookRepository.save(book);
        }
        return null; // Or throw exception
    }

    @Override
    public void deleteBook(String id) {
        bookRepository.deleteById(id);
    }

    @Override
    public List<Book> getBooksByCategory(String category) {
        return bookRepository.findByCategory(category);
    }

    @Override
    public List<Book> getBooksByPublisher(String publisher) {
        return bookRepository.findByPublisher(publisher);
    }

    @Override
    public List<Book> getFeaturedBooks() {
        return bookRepository.findByIsFeaturedTrue();
    }

    @Override
    public List<Book> getRecommendedBooks() {
        return bookRepository.findByIsRecommendedTrue();
    }
}
