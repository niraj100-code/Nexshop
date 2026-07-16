import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin, FiShoppingBag } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4">
          {/* Brand & Description */}
          <div className="col-lg-4 col-md-6">
            <Link className="d-flex align-items-center gap-2 text-decoration-none text-white mb-3" to="/">
              <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                <FiShoppingBag size={18} />
              </div>
              <span className="fw-bold fs-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Nex<span className="text-primary">Shop</span>
              </span>
            </Link>
            <p className="text-secondary small">
              Experience the best online shopping with curated collections of premium gadgets, electronics, and accessories. Premium quality, lightning-fast delivery.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}><FiFacebook size={16} /></a>
              <a href="#" className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}><FiTwitter size={16} /></a>
              <a href="#" className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}><FiInstagram size={16} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>Quick Links</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/" className="text-secondary text-decoration-none hover-light">Home</Link></li>
              <li><Link to="/about" className="text-secondary text-decoration-none hover-light">About Us</Link></li>
              <li><Link to="/shop" className="text-secondary text-decoration-none hover-light">Shop Catalog</Link></li>
              <li><Link to="/contact" className="text-secondary text-decoration-none hover-light">Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>Contact Us</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 small text-secondary">
              <li className="d-flex align-items-center gap-2">
                <FiMapPin className="text-primary flex-shrink-0" />
                <span>123 Innovation Boulevard, Tech City</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <FiPhone className="text-primary flex-shrink-0" />
                <span>+1 (555) 019-2834</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <FiMail className="text-primary flex-shrink-0" />
                <span>support@nexshop.com</span>
              </li>
            </ul>
          </div>

          {/* Admin Redirect Option */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>Staff Portal</h5>
            <p className="text-secondary small">Are you a manager or shop administrator?</p>
           
          </div>
        </div>

        <hr className="my-4 border-secondary opacity-25" />

        <div className="row small text-secondary">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">&copy; {new Date().getFullYear()} NexShop. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
            <a href="#" className="text-secondary text-decoration-none me-3">Privacy Policy</a>
            <a href="#" className="text-secondary text-decoration-none">Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        .hover-light:hover {
          color: white !important;
          padding-left: 4px;
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
