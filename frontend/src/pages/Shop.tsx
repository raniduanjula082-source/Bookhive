import { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookService from '../services/book.service';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import './Shop.css';
import { FaCartPlus, FaHeart, FaRegHeart } from 'react-icons/fa';

interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    publisher?: string;
}

const Shop = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const { addToCart } = useContext(CartContext);
    const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        BookService.getAllBooks().then(
            (response) => {
                setBooks(response.data);
                setFilteredBooks(response.data);
            },
            (error) => {
                console.error("Error fetching books", error);
            }
        );
    }, []);

    useEffect(() => {
        const query = searchParams.get('search')?.toLowerCase() || "";
        const categoryParam = searchParams.get('category')?.toLowerCase();
        const typeParam = searchParams.get('type');

        let results = books;

        // Filter by Category (School, Children, International, etc.)
        if (categoryParam) {
            results = results.filter(book =>
                book.category.toLowerCase() === categoryParam ||
                // Handle special case if 'Publications' matches a specific publisher logic, 
                // but our data uses category="Publications" so the above line covers it.
                (book.publisher && book.publisher.toLowerCase().includes(categoryParam))
            );
        }

        // Filter by Type (e.g. E-Books)
        if (typeParam === 'ebook') {
            results = results.filter(book => book.category === 'E-Books');
        }

        // Filter by Search Query
        if (query) {
            results = results.filter(book =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.category.toLowerCase().includes(query)
            );
        }

        setFilteredBooks(results);
    }, [searchParams, books]);

    const handleAddToCart = (book: Book) => {
        addToCart({
            id: book.id,
            title: book.title,
            price: book.price,
            quantity: 1,
            imageUrl: book.imageUrl
        });
        alert("Added " + book.title + " to cart!");
    };

    const toggleWishlist = (book: Book) => {
        if (isInWishlist(book.id)) {
            removeFromWishlist(book.id);
        } else {
            addToWishlist({
                id: book.id,
                title: book.title,
                price: book.price,
                imageUrl: book.imageUrl
            });
        }
    };

    return (
        <div className="container shop-page animate-fade-in">
            <h2 className="section-title">Our Collection</h2>
            <div className="shop-grid">
                {filteredBooks.map(book => (
                    <div key={book.id} className="book-card card">
                        <div className="book-image">
                            <img src={book.imageUrl || 'https://via.placeholder.com/150?text=No+Image'} alt={book.title} />
                            <button
                                className={`wishlist-btn ${isInWishlist(book.id) ? 'active' : ''}`}
                                onClick={() => toggleWishlist(book)}
                            >
                                {isInWishlist(book.id) ? <FaHeart /> : <FaRegHeart />}
                            </button>
                        </div>
                        <div className="book-info">
                            <span className="book-category">{book.category}</span>
                            <h3>{book.title}</h3>
                            <p className="book-author">by {book.author}</p>
                            <div className="book-footer">
                                <span className="book-price">${book.price.toFixed(2)}</span>
                                <button className="btn btn-outline" onClick={() => handleAddToCart(book)}>
                                    <FaCartPlus /> Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
