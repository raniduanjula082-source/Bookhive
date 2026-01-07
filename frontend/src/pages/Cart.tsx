import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, total, clearCart } = useContext(CartContext);

    const handleCheckout = () => {
        alert("Checkout functionality would be implemented here! Total: $" + total.toFixed(2));
        clearCart();
    };

    if (cart.length === 0) {
        return (
            <div className="empty-cart container animate-fade-in">
                <h2>Your Cart is Empty</h2>
                <p>Go find some books!</p>
            </div>
        );
    }

    return (
        <div className="container cart-page animate-fade-in">
            <h2 className="section-title">Shopping Cart</h2>
            <div className="cart-content">
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item card">
                            <div className="cart-item-info">
                                <h3>{item.title}</h3>
                                <p>Quantity: {item.quantity}</p>
                                <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="cart-summary card">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Items:</span>
                        <span>{cart.length}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="btn btn-primary full-width" onClick={handleCheckout}>
                        Checkout <FaCheckCircle style={{ marginLeft: '5px' }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
