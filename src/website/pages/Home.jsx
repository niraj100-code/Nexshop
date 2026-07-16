import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi';
import { AppContext } from '../../App';

const HERO_SLIDES = [
  {
    title: 'The Next Generation of Smartphones',
    subtitle: 'Experience Titanium Strength and Pro Cameras',
    description: 'Get the latest iPhone 15 Pro and Samsung Galaxy S24 Ultra with special exchange offers.',
    buttonText: 'Shop Mobiles',
    link: '/shop',
    bg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=60'
  },
  {
    title: 'Supercharged Laptops for Professionals',
    subtitle: 'Power Meets Portability with Apple M3',
    description: 'Work faster, longer, and smarter with the thinnest high-performance notebooks.',
    buttonText: 'Shop Laptops',
    link: '/shop',
    bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60'
  },
  {
    title: 'Studio Quality Audio Everywhere',
    subtitle: 'Industry-Leading Noise Cancellation',
    description: 'Immerse yourself in high-resolution audio with Sony wireless headphones.',
    buttonText: 'Shop Audio',
    link: '/shop',
    bg: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60'
  }
];

const Home = () => {
  const { customer, addToCart, PRODUCT_API, CATEGORY_API, toast } = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Rotate slides automatically
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get(PRODUCT_API),
          axios.get(CATEGORY_API)
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [PRODUCT_API, CATEGORY_API]);

  // Featured: first 3 products, Latest: last 4 products
  const featuredProducts = products.slice(0, 3);
  const latestProducts = [...products].reverse().slice(0, 4);

  return (
    <div className="pb-5">
      {/* Dynamic Hero Slider */}
      <div className="position-relative overflow-hidden mb-5 text-white" style={{ minHeight: '520px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-100 h-100 position-absolute top-0 start-0 d-flex align-items-center"
            style={{ background: HERO_SLIDES[currentSlide].bg }}
          >
            <div className="container py-5">
              <div className="row align-items-center g-4">
                <div className="col-lg-6">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="badge bg-primary px-3 py-2 rounded-pill mb-3"
                  >
                    {HERO_SLIDES[currentSlide].subtitle}
                  </motion.span>
                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="display-4 fw-extrabold mb-3 text-white"
                    style={{ lineHeight: 1.1 }}
                  >
                    {HERO_SLIDES[currentSlide].title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lead opacity-80 mb-4 text-light"
                  >
                    {HERO_SLIDES[currentSlide].description}
                  </motion.p>
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link to={HERO_SLIDES[currentSlide].link} className="btn btn-primary-custom btn-lg rounded-pill d-inline-flex align-items-center gap-2 px-5 py-3 shadow">
                      {HERO_SLIDES[currentSlide].buttonText} <FiArrowRight />
                    </Link>
                  </motion.div>
                </div>
                <div className="col-lg-6 text-center">
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    src={HERO_SLIDES[currentSlide].image}
                    alt={HERO_SLIDES[currentSlide].title}
                    className="img-fluid rounded-4 shadow-lg"
                    style={{ maxHeight: '380px', width: '90%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Indicators */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x pb-4 z-3 d-flex gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              className={`btn p-0 rounded-circle ${currentSlide === idx ? 'bg-white' : 'bg-white opacity-40'}`}
              style={{ width: '12px', height: '12px' }}
              onClick={() => setCurrentSlide(idx)}
            ></button>
          ))}
        </div>
      </div>

      {/* Selling Points Section */}
      <div className="container mb-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="glass-card p-4 h-100 d-flex flex-column align-items-center">
              <div className="bg-primary-subtle text-primary p-3 rounded-circle mb-3"><FiTruck size={28} /></div>
              <h5>Free & Fast Delivery</h5>
              <p className="text-muted small mb-0">Free shipping on all orders over $999 with express delivery services.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card p-4 h-100 d-flex flex-column align-items-center">
              <div className="bg-success-subtle text-success p-3 rounded-circle mb-3"><FiShield size={28} /></div>
              <h5>Secure Payments</h5>
              <p className="text-muted small mb-0">Your transactions are secured with military-grade 256-bit SSL encryption.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card p-4 h-100 d-flex flex-column align-items-center">
              <div className="bg-warning-subtle text-warning p-3 rounded-circle mb-3"><FiRotateCcw size={28} /></div>
              <h5>Easy Returns</h5>
              <p className="text-muted small mb-0">Not satisfied? Return any product within 14 days for a full refund.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="text-primary fw-bold text-uppercase tracking-wider small">Browse Categories</span>
            <h2 className="mb-0 fw-extrabold">Shop by Category</h2>
          </div>
        </div>

        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center py-4"><div className="spinner-border text-primary" /></div>
          ) : categories.length === 0 ? (
            <div className="col-12 text-center text-muted">No categories found</div>
          ) : (
            categories.map((cat, index) => {
              const gradients = [
                'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                'linear-gradient(135deg, #06b6d4 0%, #0d9488 100%)',
                'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
                'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              ];
              const grad = gradients[index % gradients.length];
              return (
                <div key={cat.id} className="col-6 col-md-3">
                  <Link
                    to="/shop"
                    state={{ activeCategory: cat.name }}
                    className="text-decoration-none"
                  >
                    <div
                      className="glass-card p-4 text-center text-white h-100 d-flex flex-column justify-content-center align-items-center cursor-pointer"
                      style={{ background: grad, border: 'none', minHeight: '160px' }}
                    >
                      <h4 className="fw-bold mb-2 text-white">{cat.name}</h4>
                      <span className="small bg-white bg-opacity-25 px-3 py-1 rounded-pill">Explore</span>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container mb-5">
        <div className="text-center mb-5">
          <span className="text-primary fw-bold text-uppercase tracking-wider small">Top Picks</span>
          <h2 className="fw-extrabold mb-2">Featured Products</h2>
          <p className="text-muted col-md-6 mx-auto">Explore our highest rated and hand-picked hardware chosen just for you.</p>
        </div>

        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center py-4"><div className="spinner-border text-primary" /></div>
          ) : featuredProducts.length === 0 ? (
            <div className="col-12 text-center text-muted">No products available</div>
          ) : (
            featuredProducts.map((prod) => (
              <div key={prod.id} className="col-md-4">
                <div className="glass-card h-100 d-flex flex-column">
                  <div className="position-relative overflow-hidden bg-light" style={{ height: '260px' }}>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-100 h-100 object-fit-cover transition-transform"
                      style={{ transition: 'all 0.5s ease' }}
                    />
                    <span className="position-absolute top-3 start-3 badge bg-danger rounded-pill px-3 py-2 m-2">Featured</span>
                  </div>
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <span className="text-secondary small mb-1">{prod.category}</span>
                    <h5 className="fw-bold mb-2">{prod.name}</h5>
                    <p className="text-muted small flex-grow-1 line-clamp">{prod.description}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                      <span className="fs-5 fw-extrabold text-primary">&#8377;{prod.price.toLocaleString('en-IN')}</span>
                      <div className="d-flex gap-2">
                        <Link to={`/product/${prod.id}`} className="btn btn-outline-custom btn-sm rounded-pill px-3">Details</Link>
                        {customer ? (
                          <button
                            onClick={() => { addToCart(prod); toast(`${prod.name} added to cart!`); }}
                            className="btn btn-primary-custom btn-sm rounded-pill px-3"
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <Link to="/login" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
                            Login to Buy
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Latest Products Section */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="text-primary fw-bold text-uppercase tracking-wider small">New Arrivals</span>
            <h2 className="mb-0 fw-extrabold">Latest Products</h2>
          </div>
          <Link to="/shop" className="btn btn-link text-primary fw-bold text-decoration-none d-flex align-items-center gap-1">
            See All Products <FiArrowRight />
          </Link>
        </div>

        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center py-4"><div className="spinner-border text-primary" /></div>
          ) : latestProducts.length === 0 ? (
            <div className="col-12 text-center text-muted">No products available</div>
          ) : (
            latestProducts.map((prod) => (
              <div key={prod.id} className="col-md-3 col-sm-6">
                <div className="glass-card h-100 d-flex flex-column">
                  <div className="position-relative overflow-hidden bg-light" style={{ height: '200px' }}>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-100 h-100 object-fit-cover"
                    />
                    <span className="position-absolute top-2 start-2 badge bg-success rounded-pill px-2 py-1 m-2 small">New</span>
                  </div>
                  <div className="p-3 d-flex flex-column flex-grow-1">
                    <span className="text-secondary small mb-1">{prod.category}</span>
                    <h6 className="fw-bold mb-2 text-truncate">{prod.name}</h6>
                    <p className="text-muted small flex-grow-1 text-truncate mb-2">{prod.description}</p>
                    <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
                      <span className="fw-bold text-primary">&#8377;{prod.price.toLocaleString('en-IN')}</span>
                      <div className="d-flex gap-1">
                        <Link to={`/product/${prod.id}`} className="btn btn-outline-primary btn-sm rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} title="View details">
                          <FiArrowRight size={14} />
                        </Link>
                        {customer ? (
                          <button
                            onClick={() => { addToCart(prod); toast(`${prod.name} added to cart!`); }}
                            className="btn btn-primary btn-sm rounded-circle p-1 d-flex align-items-center justify-content-center"
                            style={{ width: '32px', height: '32px' }}
                            title="Add to cart"
                          >
                            <FiShoppingBag size={14} />
                          </button>
                        ) : (
                          <Link
                            to="/login"
                            className="btn btn-outline-secondary btn-sm rounded-circle p-1 d-flex align-items-center justify-content-center"
                            style={{ width: '32px', height: '32px' }}
                            title="Login to buy"
                          >
                            <FiShoppingBag size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <style>{`
        .line-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .glass-card:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Home;
