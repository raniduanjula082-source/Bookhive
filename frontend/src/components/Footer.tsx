import { Link } from 'react-router-dom';
import {
    FaTruck, FaShieldAlt, FaTags, FaShippingFast,
    FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaYoutube, FaInstagram,
    FaMapMarkerAlt, FaPhoneAlt, FaEnvelope
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            {/* Promotional Banners Section */}
            <div className="promotional-banners">
                <div className="promo-banner sarasavi-banner">
                    <div className="promo-content">
                        <h3>Sarasavi <br /> Publications</h3>
                        <p>"Discover new horizons with Sarasavi <br /> Publications - Your gateway to knowledge.</p>
                        <Link to="/shop?publisher=sarasavi" className="btn-shop">SHOP NOW</Link>
                    </div>
                    <div className="promo-image">
                        <img src="/images/promo-sarasavi.png" alt="Sarasavi Publications" />
                    </div>
                </div>
                <div className="promo-banner sumitha-banner">
                    <div className="promo-content">
                        <h3>Sumitha <br /> Publications</h3>
                        <p>Unlock your creativity with Sumitha <br /> Publications - Where imagination meets innovation.</p>
                        <Link to="/shop?publisher=sumitha" className="btn-shop">SHOP NOW</Link>
                    </div>
                    <div className="promo-image">
                        <img src="/images/promo-sumitha.png" alt="Sumitha Publications" />
                    </div>
                </div>
            </div>

            {/* Top Feature Banner */}
            <div className="footer-features">
                <div className="container feature-grid">
                    <div className="feature-item">
                        <FaTruck className="feature-icon" />
                        <div className="feature-text">
                            <h4>Islandwide Delivery</h4>
                            <p>Ensuring convenience</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <FaShieldAlt className="feature-icon" />
                        <div className="feature-text">
                            <h4>Secure Payments</h4>
                            <p>Safe and efficient</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <FaTags className="feature-icon" />
                        <div className="feature-text">
                            <h4>Best Price</h4>
                            <p>Ultimate affordability</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <FaShippingFast className="feature-icon" />
                        <div className="feature-text">
                            <h4>Fast Delivery</h4>
                            <p>Customer focused</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="container footer-grid">
                    {/* Newsletter Section */}
                    <div className="footer-section newsletter">
                        <h3>Receive The Latest Offers & Updates Via Email</h3>
                        <p>Signup To Be The First To Hear About Exclusive Deals, Special Offers And Upcoming Collections</p>
                        <form className="subscribe-form">
                            <input type="email" placeholder="Enter Your Email" required />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>

                    {/* Links Columns */}
                    <div className="footer-links-group">
                        <div className="footer-column">
                            <h4>Categories</h4>
                            <ul>
                                <li><Link to="/shop?category=fiction">Fiction</Link></li>
                                <li><Link to="/shop?category=non-fiction">Non-Fiction</Link></li>
                                <li><Link to="/shop?category=children">Children's Books</Link></li>
                                <li><Link to="/shop?category=education">Educational</Link></li>
                                <li><Link to="/shop?category=gift-packs">Gift Packs</Link></li>
                                <li><Link to="/shop?category=new-arrivals">New Arrivals</Link></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/shop">Shop</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/login">Sign Up / Login</Link></li>
                                <li><Link to="/wishlist">Wishlist</Link></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Information</h4>
                            <ul>
                                <li><Link to="/policy">Shipping & Return Policy</Link></li>
                                <li><Link to="/privacy">Privacy Policy</Link></li>
                                <li><Link to="/terms">Terms & Conditions</Link></li>
                                <li><Link to="/payment-policy">Payment Policy</Link></li>
                                <li><Link to="/faq">FAQ</Link></li>
                            </ul>
                        </div>

                        <div className="footer-column contact-info">
                            <h4>Contact Details</h4>
                            <ul>
                                <li>
                                    <FaMapMarkerAlt className="contact-icon" />
                                    <span>No.30, Main Street, Library City, Wordland, 10250</span>
                                </li>
                                <li>
                                    <FaPhoneAlt className="contact-icon" />
                                    <span>+94 71 123 4567</span>
                                </li>
                                <li>
                                    <FaEnvelope className="contact-icon" />
                                    <span>support@bookhive.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="footer-bottom">
                <div className="container bottom-content">
                    <div className="social-links">
                        <a href="#" className="social-icon facebook"><FaFacebookF /></a>
                        <a href="#" className="social-icon twitter"><FaTwitter /></a>
                        <a href="#" className="social-icon linkedin"><FaLinkedinIn /></a>
                        <a href="#" className="social-icon pinterest"><FaPinterestP /></a>
                        <a href="#" className="social-icon youtube"><FaYoutube /></a>
                        <a href="#" className="social-icon instagram"><FaInstagram /></a>
                    </div>

                    <div className="footer-logo">
                        <h3>BookHive</h3>
                    </div>

                    <div className="payment-methods">
                        {/* Using placeholder spans for payment icons since we don't have images handy, 
                            or we can use text or simplistic CSS shapes. For a real app, these would be imgs. */}
                        <span className="pay-icon">VISA</span>
                        <span className="pay-icon">MasterCard</span>
                        <span className="pay-icon">PayPal</span>
                        <span className="pay-icon">Amex</span>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; 2024 BookHive. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
