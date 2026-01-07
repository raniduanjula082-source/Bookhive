import { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { FaTrash, FaCartPlus, FaHeartBroken } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Cart.css'; // Reusing Cart CSS for consistency

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (item: any) => {
        addToCart({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: 1,
            imageUrl: item.imageUrl
        });
        removeFromWishlist(item.id);
    };

    if (wishlist.length === 0) {
        return (
            <div className="container cart-page empty-cart animate-fade-in">
                <FaHeartBroken className="empty-cart-icon" />
                <h2>Your wishlist is empty</h2>
                <p>Save items you want to buy later!</p>
                <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container cart-page animate-fade-in">
            <h2 className="section-title">My Wishlist</h2>
            <div className="cart-items">
                {wishlist.map(item => (
                    <div key={item.id} className="cart-item card">
                        <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3>{item.title}</h3>
                            <p className="item-price">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="cart-item-actions">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleAddToCart(item)}
                                title="Move to Cart"
                            >
                                <FaCartPlus /> Move to Cart
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => removeFromWishlist(item.id)}
                                title="Remove from Wishlist"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
