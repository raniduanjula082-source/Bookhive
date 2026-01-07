import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBookOpen, FaSearch, FaHeart } from 'react-icons/fa';
import AuthService from '../services/auth.service';
import { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState<any>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
        navigate("/login");
        window.location.reload();
    };

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className="header-container">
            {/* 1. Top Bar */}
            <div className="top-bar">
                <div className="container top-bar-content">
                    <div className="top-contact">
                        <span>Call us for Web Orders: +94 71 123 4567</span>
                        <span className="separator">|</span>
                        <span>Email: support@bookhive.com</span>
                    </div>
                    <div className="top-actions">
                        <Link to="/advanced-search" className="top-link">Advanced Search</Link>
                        {currentUser && currentUser.roles && currentUser.roles.includes("ROLE_ADMIN") && (
                            <Link to="/admin" className="top-link" style={{ color: '#ff4d4d', fontWeight: 'bold' }}>Admin Panel</Link>
                        )}
                        {currentUser ? (
                            <div className="user-menu-top">
                                <span className="user-name"><FaUser /> {currentUser.username}</span>
                                <button onClick={logOut} className="btn-logout-text">Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" className="top-link">Sign Up / Login</Link>
                        )}
                        <span className="currency-selector">LKR</span>
                    </div>
                </div>
            </div>

            {/* 2. Middle Header */}
            <div className="middle-header">
                <div className="container middle-header-content">
                    <Link to="/" className="navbar-logo">
                        <FaBookOpen className="logo-icon" />
                        <span className="brand-name">BookHive</span>
                        <span className="brand-tagline">THE BOOKSHOP</span>
                    </Link>

                    <Link to="/" className="home-icon-link">
                        <FaBookOpen />
                    </Link>

                    <form className="search-bar-main" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="search-btn">
                            <FaSearch />
                        </button>
                    </form>

                    <div className="header-icons">
                        <Link to="/wishlist" className="icon-link">
                            <FaHeart />
                            <span className="icon-count">0</span>
                        </Link>
                        <Link to="/cart" className="icon-link">
                            <FaShoppingCart />
                            <span className="icon-count">0</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 3. Bottom Navigation */}
            <nav className="bottom-nav">
                <div className="container bottom-nav-content">
                    <ul className="nav-menu">
                        <li><Link to="/shop?category=school" className="nav-link">SCHOOL LIST</Link></li>
                        <li><Link to="/shop?category=publications" className="nav-link">BOOKHIVE PUBLICATIONS</Link></li>
                        <li><Link to="/shop?category=children" className="nav-link">CHILDREN</Link></li>
                        <li><Link to="/shop?category=international" className="nav-link">INTERNATIONAL SCHOOL BOOKS</Link></li>
                        <li><Link to="/request-book" className="nav-link">REQUEST A BOOK</Link></li>
                        <li><Link to="/shop?type=ebook" className="nav-link">E-BOOKS</Link></li>
                        <li><Link to="/locations" className="nav-link">BRANCH NETWORK</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
