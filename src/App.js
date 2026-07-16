import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { FiX, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

// Customer Components & Pages
import Header from './website/component/Header';
import Footer from './website/component/Footer';
import Home from './website/pages/Home';
import About from './website/pages/About';
import Contact from './website/pages/Contact';
import Login from './website/pages/Login';
import Signup from './website/pages/Signup';
import Shop from './website/pages/Shop';
import ShopSingle from './website/pages/Shop-single';
import Profile from './website/pages/Profile';

// Admin Components & Pages
import AHeader from './admin/component/AHeader';
import AFooter from './admin/component/AFooter';
import AdminLogin from './admin/pages/Admin_login';
import Dashboard from './admin/pages/Dashboard';
import AddCategories from './admin/pages/Add_categories';
import ManageCategories from './admin/pages/Manage_categories';
import AddProducts from './admin/pages/Add_products';
import ManageProducts from './admin/pages/Manage_products';
import ManageCustomers from './admin/pages/Manage_customers';
import ManageContacts from './admin/pages/Manage_contacts';

// Create AppContext
export const AppContext = createContext();

// API Configuration
const PRODUCT_API = "http://localhost:3000/products";
const CATEGORY_API = "http://localhost:3000/categories";
const CONTACT_API = "http://localhost:3000/contacts";
const CUSTOMER_API = "http://localhost:3000/customers";
const ADMIN_API = "http://localhost:3000/admins";

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  // Verify Admin Authentication Guard
  const isLocalStorageAdminValid = () => {
    try {
      const savedAdmin = localStorage.getItem('nexshop_admin');
      return savedAdmin ? JSON.parse(savedAdmin) : null;
    } catch {
      return null;
    }
  };

  const adminSession = isLocalStorageAdminValid();

  // If trying to access admin subpages without being logged in, redirect to login
  if (isAdminPath && location.pathname !== '/admin' && !adminSession) {
    return <Navigate to="/admin" replace />;
  }

  // Double Layout Wrapper
  if (isAdminPath) {
    // Admin login page has its own standalone dark background layout
    if (location.pathname === '/admin') {
      return <AdminLogin />;
    }

    // Standard Admin Dashboard panel layout with sidebar and content container
    return (
      <div className="container-fluid">
        <div className="row">
          <AHeader />
          <div className="col-md-9 col-lg-10 bg-light min-vh-100 d-flex flex-column p-0">
            {/* Topbar Info banner */}
            <header className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0 text-dark">NexShop Admin Console</h5>
              <div className="small text-muted fw-semibold">
                Session Active: {adminSession?.email}
              </div>
            </header>
            
            {/* Pages Mount Point */}
            <main className="flex-grow-1 p-4">
              <Routes>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/add-category" element={<AddCategories />} />
                <Route path="/admin/manage-category" element={<ManageCategories />} />
                <Route path="/admin/add-product" element={<AddProducts />} />
                <Route path="/admin/manage-product" element={<ManageProducts />} />
                <Route path="/admin/manage-customer" element={<ManageCustomers />} />
                <Route path="/admin/manage-contact" element={<ManageContacts />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </main>
            <AFooter />
          </div>
        </div>
      </div>
    );
  }

  // Standard Client-Facing Website Layout
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ShopSingle />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  // Global States
  const [customer, setCustomer] = useState(() => {
    const saved = localStorage.getItem('nexshop_customer');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('nexshop_admin');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('nexshop_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Sync Cart state in localStorage
  useEffect(() => {
    localStorage.setItem('nexshop_cart', JSON.stringify(cart));
  }, [cart]);

  // Loading triggers
  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  // Toast notifier trigger helper
  const triggerToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto-remove toast after 4.5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auth Operations
  const loginCustomer = (user) => {
    setCustomer(user);
    localStorage.setItem('nexshop_customer', JSON.stringify(user));
  };

  const logoutCustomer = () => {
    setCustomer(null);
    localStorage.removeItem('nexshop_customer');
    triggerToast("Logged out from client account", "success");
  };

  const loginAdmin = (adminUser) => {
    setAdmin(adminUser);
    localStorage.setItem('nexshop_admin', JSON.stringify(adminUser));
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem('nexshop_admin');
  };

  // Cart Operations
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    triggerToast("Item removed from shopping cart", "success");
  };

  const updateCartQty = (productId, qty) => {
    if (qty < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => item.id === productId ? { ...item, quantity: qty } : item)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider value={{
      PRODUCT_API,
      CATEGORY_API,
      CONTACT_API,
      CUSTOMER_API,
      ADMIN_API,
      customer,
      admin,
      cart,
      isLoading,
      loginCustomer,
      logoutCustomer,
      loginAdmin,
      logoutAdmin,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      toast: triggerToast,
      showLoader,
      hideLoader
    }}>
      <BrowserRouter>
        {/* Loading Spinner Screen */}
        {isLoading && (
          <div className="spinner-overlay">
            <div className="spinner-border text-primary" style={{ width: '3.5rem', height: '3.5rem' }} role="status">
              <span className="visually-hidden">Loading system database...</span>
            </div>
          </div>
        )}

        {/* Global Floating Toasts */}
        <div className="toast-container-custom">
          {toasts.map(t => (
            <div key={t.id} className={`toast-custom ${t.type}`}>
              <div className="d-flex align-items-center gap-2">
                {t.type === 'success' ? (
                  <FiCheckCircle size={20} className="text-success" />
                ) : (
                  <FiAlertCircle size={20} className="text-danger" />
                )}
                <span className="fw-semibold text-dark small">{t.message}</span>
              </div>
              <button className="btn btn-sm btn-light border-0 p-1" onClick={() => removeToast(t.id)}>
                <FiX size={16} />
              </button>
            </div>
          ))}
        </div>

        <AppContent />
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
export { App };
