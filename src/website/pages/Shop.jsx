import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiShoppingBag, FiTrash2, FiPlus, FiMinus, FiX } from 'react-icons/fi';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';

const Shop = () => {
  const {
    customer,
    cart,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    PRODUCT_API,
    CATEGORY_API,
    toast,
    showLoader,
    hideLoader
  } = useContext(AppContext);

  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync with Header navigation to open cart
  useEffect(() => {
    if (location.state && location.state.openCart) {
      setIsCartOpen(true);
      // Clear location state so it doesn't reopen on reload
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Sync category selected from Home page
  useEffect(() => {
    if (location.state && location.state.activeCategory) {
      setSelectedCategory(location.state.activeCategory);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoader();
        const [prodRes, catRes] = await Promise.all([
          axios.get(PRODUCT_API),
          axios.get(CATEGORY_API)
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error('Error fetching catalog data:', err);
        toast('Failed to load shop catalog. Check database connection.', 'error');
      } finally {
        hideLoader();
      }
    };
    fetchData();
  }, [PRODUCT_API, CATEGORY_API]);

  // Filter products based on category and search query
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container py-4 position-relative">
      <div className="row g-4">
        {/* Sidebar Filters */}
        <div className="col-lg-3 col-md-4">
          <div className="glass-card p-4 sticky-top" style={{ top: '100px', zIndex: 10 }}>
            {/* Search Input */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted uppercase">Search Products</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><FiSearch size={18} className="text-secondary" /></span>
                <input
                  type="text"
                  className="form-control form-control-custom border-start-0 ps-0"
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Categories sidebar filter */}
            <div>
              <label className="form-label small fw-bold text-muted uppercase mb-3">Categories</label>
              <div className="d-flex flex-column gap-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`btn text-start rounded-3 px-3 py-2 fw-semibold transition-all ${
                    selectedCategory === 'All'
                      ? 'btn-primary-custom text-white'
                      : 'btn-light text-dark'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`btn text-start rounded-3 px-3 py-2 fw-semibold transition-all ${
                      selectedCategory === cat.name
                        ? 'btn-primary-custom text-white'
                        : 'btn-light text-dark'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Catalog Grid */}
        <div className="col-lg-9 col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-extrabold mb-0">Shop Catalog</h2>
            <span className="badge bg-secondary px-3 py-2 rounded-pill fw-semibold">
              Showing {filteredProducts.length} Products
            </span>
          </div>

          <div className="row g-4">
            {filteredProducts.length === 0 ? (
              <div className="col-12 text-center py-5">
                <div className="glass-card p-5 text-muted col-md-6 mx-auto">
                  <FiSearch size={48} className="text-secondary mb-3 d-block mx-auto" />
                  <h4>No Products Found</h4>
                  <p className="small mb-0">Try adjusting your filters or search keywords.</p>
                </div>
              </div>
            ) : (
              filteredProducts.map((prod) => (
                <div key={prod.id} className="col-lg-4 col-sm-6">
                  <div className="glass-card h-100 d-flex flex-column">
                    <div className="position-relative overflow-hidden bg-light" style={{ height: '200px' }}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-100 h-100 object-fit-cover transition-transform"
                        style={{ transition: 'all 0.5s ease' }}
                      />
                      <span className="position-absolute top-2 start-2 badge bg-dark rounded-pill px-3 py-2 m-2 small">
                        {prod.category}
                      </span>
                    </div>

                    <div className="p-3 d-flex flex-column flex-grow-1">
                      <h6 className="fw-bold mb-2 text-truncate" title={prod.name}>{prod.name}</h6>
                      <p className="text-muted small flex-grow-1 mb-3 line-clamp">{prod.description}</p>
                      
                      <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                        <span className="fw-extrabold text-primary">&#8377;{prod.price.toLocaleString('en-IN')}</span>
                        <div className="d-flex gap-1">
                          <Link to={`/product/${prod.id}`} className="btn btn-outline-custom btn-sm rounded-pill px-2">Details</Link>
                          {customer ? (
                            <button
                              onClick={() => { addToCart(prod); toast(`${prod.name} added to cart!`); }}
                              className="btn btn-primary-custom btn-sm rounded-pill px-2"
                            >
                              Add +
                            </button>
                          ) : (
                            <Link to="/login" className="btn btn-outline-secondary btn-sm rounded-pill px-2 text-decoration-none">
                              Login to Add
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
      </div>

      {/* Floating Shopping Cart Drawer */}
      <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
        <div className="cart-drawer glass-card p-4 d-flex flex-column" onClick={(e) => e.stopPropagation()}>
          <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
            <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
              <FiShoppingBag className="text-primary" /> Shopping Cart
            </h4>
            <button className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center" onClick={() => setIsCartOpen(false)}>
              <FiX size={20} />
            </button>
          </div>

          <div className="flex-grow-1 overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <FiShoppingBag size={48} className="mb-3 d-block mx-auto text-secondary opacity-50" />
                <h5>Your cart is empty</h5>
                <p className="small">Explore our catalog and add items to your cart.</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {cart.map((item) => (
                  <div key={item.id} className="d-flex align-items-center gap-3 p-2 bg-light rounded-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded object-fit-cover"
                      style={{ width: '60px', height: '60px' }}
                    />
                    <div className="flex-grow-1 min-w-0">
                      <h6 className="fw-bold mb-0 text-truncate">{item.name}</h6>
                      <span className="text-primary fw-semibold small">&#8377;{item.price.toLocaleString('en-IN')}</span>
                      <div className="d-flex align-items-center gap-2 mt-1">
                        <button
                          className="btn btn-sm btn-white border rounded-circle p-1 d-flex align-items-center justify-content-center"
                          style={{ width: '24px', height: '24px' }}
                          onClick={() => updateCartQty(item.id, item.quantity - 1)}
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="small fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-white border rounded-circle p-1 d-flex align-items-center justify-content-center"
                          style={{ width: '24px', height: '24px' }}
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                    </div>
                    <button className="btn btn-sm btn-outline-danger border-0 p-2" onClick={() => removeFromCart(item.id)}>
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="mt-4 pt-3 border-top">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold text-muted">Subtotal</span>
                <span className="fs-5 fw-extrabold text-primary">&#8377;{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-danger flex-grow-1 py-2 rounded-3" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="btn btn-primary-custom flex-grow-1 py-2 rounded-3" onClick={() => { toast("Order placed successfully! (Mock checkout completed)", "success"); clearCart(); setIsCartOpen(false); }}>
                  Checkout
                </button>
              </div>
            </div>
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
        .cart-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(4px);
          z-index: 1050;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease-in-out;
        }
        .cart-drawer-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        .cart-drawer {
          position: fixed;
          top: 0;
          right: -420px;
          width: 100%;
          max-width: 400px;
          height: 100vh;
          border-radius: 0;
          border-left: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cart-drawer-overlay.open .cart-drawer {
          right: 0;
        }
        .glass-card:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Shop;
