import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiUser, FiLogOut, FiMenu } from 'react-icons/fi';
import { AppContext } from '../../App';

const Header = () => {
  const { cart, customer, logoutCustomer } = useContext(AppContext);
  const navigate = useNavigate();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top glass-navbar py-3">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="bg-gradient-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            <FiShoppingBag size={20} />
          </div>
          <span className="fw-extrabold fs-4 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Nex<span className="text-primary">Shop</span>
          </span>
        </Link>

        {/* Hamburger Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FiMenu size={24} />
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-4">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-semibold px-2 ${isActive ? 'text-primary' : 'text-secondary'}`} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-semibold px-2 ${isActive ? 'text-primary' : 'text-secondary'}`} to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-semibold px-2 ${isActive ? 'text-primary' : 'text-secondary'}`} to="/shop">
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-semibold px-2 ${isActive ? 'text-primary' : 'text-secondary'}`} to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Action Items */}
          <div className="d-flex align-items-center gap-3">
            {/* Cart Button */}
            <Link to="/shop" onClick={(e) => { e.preventDefault(); navigate('/shop', { state: { openCart: true } }); }} className="position-relative btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '42px', height: '42px' }}>
              <FiShoppingBag size={20} className="text-dark" />
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white" style={{ fontSize: '0.7rem' }}>
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Customer Session Display */}
            {customer ? (
              <div className="dropdown">
                <button
                  className="btn btn-light rounded-pill px-3 py-2 d-flex align-items-center gap-2 dropdown-toggle shadow-sm"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FiUser className="text-primary" />
                  <span className="fw-semibold text-truncate" style={{ maxWidth: '100px' }}>{customer.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end border-0 shadow mt-2 p-2 rounded-3" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item rounded-2 d-flex align-items-center gap-2 py-2" to="/profile">
                      <FiUser /> My Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider opacity-25" /></li>
                  <li>
                    <button className="dropdown-item rounded-2 text-danger d-flex align-items-center gap-2 py-2" onClick={logoutCustomer}>
                      <FiLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="btn btn-light rounded-pill px-4 fw-semibold shadow-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary-custom rounded-pill px-4">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
