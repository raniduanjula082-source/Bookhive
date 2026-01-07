import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Link } from 'react-router-dom';
import './Home.css';
import { FaBook, FaChild, FaBookOpen, FaGlobe, FaPencilAlt, FaGraduationCap, FaUser, FaDownload } from 'react-icons/fa';


const Home = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
    };

    return (
        <div className="home-page animate-fade-in">
            {/* Hero Section with Slider */}
            <div className="hero-slider-container">
                <Slider {...sliderSettings}>
                    <div className="hero-slide">
                        <img src="/images/hero-slide-1.png" alt="Mystery & Fantasy" className="hero-slide-img" />
                        <div className="hero-overlay">
                            <h2>The Secret of Secrets</h2>
                            <p>Dive into a world of mystery and magic.</p>
                            <Link to="/shop?category=fantasy" className="btn btn-primary">Discover More</Link>
                        </div>
                    </div>
                    <div className="hero-slide">
                        <img src="/images/hero-slide-2.png" alt="Education" className="hero-slide-img" />
                        <div className="hero-overlay overlay-light">
                            <h2>Back to School</h2>
                            <p>Equip yourself with the best educational resources.</p>
                            <Link to="/shop?category=education" className="btn btn-primary">Shop Now</Link>
                        </div>
                    </div>
                </Slider>
            </div>

            {/* Category Grid Section */}
            <section className="category-section">
                <div className="category-grid">
                    <Link to="/shop?category=fiction" className="category-card cat-fiction">
                        <div className="cat-icon-wrapper"><FaBook /></div>
                        <span>Fiction</span>
                    </Link>
                    <Link to="/shop?category=children" className="category-card cat-children">
                        <div className="cat-icon-wrapper"><FaChild /></div>
                        <span>Children's Books</span>
                    </Link>
                    <Link to="/shop?category=novels" className="category-card cat-novels">
                        <div className="cat-icon-wrapper"><FaBookOpen /></div>
                        <span>Novels</span>
                    </Link>
                    <Link to="/shop?category=translations" className="category-card cat-translations">
                        <div className="cat-icon-wrapper"><FaGlobe /></div>
                        <span>Translations</span>
                    </Link>
                    <Link to="/shop?category=short-story" className="category-card cat-short-story">
                        <div className="cat-icon-wrapper"><FaPencilAlt /></div>
                        <span>Short Story</span>
                    </Link>
                    <Link to="/shop?category=education" className="category-card cat-education">
                        <div className="cat-icon-wrapper"><FaGraduationCap /></div>
                        <span>Educational</span>
                    </Link>
                    <Link to="/shop?category=young-adult" className="category-card cat-young-adult">
                        <div className="cat-icon-wrapper"><FaUser /></div>
                        <span>Young Adult</span>
                    </Link>
                    <Link to="/shop?category=downloads" className="category-card cat-downloads">
                        <div className="cat-icon-wrapper"><FaDownload /></div>
                        <span>Downloads</span>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
