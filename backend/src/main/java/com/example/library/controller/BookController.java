package com.example.library.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.library.model.Book;
import com.example.library.payload.request.BookRequest;
import com.example.library.payload.response.MessageResponse;
import com.example.library.service.BookService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String publisher) {
        if (category != null) {
            return bookService.getBooksByCategory(category);
        }
        if (publisher != null) {
            return bookService.getBooksByPublisher(publisher);
        }
        return bookService.getAllBooks();
    }

    @GetMapping("/featured")
    public List<Book> getFeaturedBooks() {
        return bookService.getFeaturedBooks();
    }

    @GetMapping("/recommended")
    public List<Book> getRecommendedBooks() {
        return bookService.getRecommendedBooks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable String id) {
        Optional<Book> book = bookService.getBookById(id);
        if (book.isPresent()) {
            return ResponseEntity.ok(book.get());
        } else {
            return ResponseEntity.status(404).body(new MessageResponse("Book not found"));
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createBook(@Valid @RequestBody BookRequest bookRequest) {
        Book createdBook = bookService.addBook(bookRequest);
        return ResponseEntity.ok(createdBook);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateBook(@PathVariable String id, @Valid @RequestBody BookRequest bookRequest) {
        Book updatedBook = bookService.updateBook(id, bookRequest);
        if (updatedBook != null) {
            return ResponseEntity.ok(updatedBook);
        } else {
            return ResponseEntity.status(404).body(new MessageResponse("Book not found"));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteBook(@PathVariable String id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok(new MessageResponse("Book deleted successfully"));
    }
}
