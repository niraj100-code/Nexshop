import React, { useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FiGrid, FiPlusCircle, FiList, FiUsers, FiMessageSquare, FiLogOut, FiShoppingBag, FiCpu } from 'react-icons/fi';
import { AppContext } from '../../App';

const AHeader = () => {
  const { admin, logoutAdmin, toast } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutAdmin();
    toast("Logged out from admin panel", "success");
    navigate('/admin');
  };

  // Convert current path into a human readable title
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin/dashboard': return 'Admin Dashboard';
      case '/admin/add-category': return 'Create Category';
      case '/admin/manage-category': return 'Manage Categories';
      case '/admin/add-product': return 'Create Product';
      case '/admin/manage-product': return 'Manage Products';
      case '/admin/manage-customer': return 'Manage Customers';
      case '/admin/manage-contact': return 'Inquiries & Messages';
      default: return 'Admin Console';
    }
  };

  return (
    <div className="col-md-3 col-lg-2 admin-sidebar d-flex flex-column justify-content-between py-4 sticky-top" style={{ top: 0, height: '100vh' }}>
      <div>
        {/* Brand */}
        <div className="px-4 mb-4 d-flex align-items-center gap-2">
          <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
            <FiCpu size={18} />
          </div>
          <span className="fw-bold fs-5 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Nex<span className="text-primary">Admin</span>
          </span>
        </div>

        <hr className="border-secondary opacity-25 mx-3 mb-4" />

        {/* Navigation */}
        <nav className="d-flex flex-column gap-1">
          <NavLink to="/admin/dashboard" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <FiGrid size={18} /> Dashboard
          </NavLink>
          
          <div className="px-4 py-2 mt-2 text-uppercase text-secondary fw-bold small" style={{ fontSize: '0.7rem' }}>Categories</div>
          <NavLink to="/admin/add-category" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <FiPlusCircle size={18} /> Add Category
          </NavLink>
          <NavLink to="/admin/manage-category" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <FiList size={18} /> Manage Categories
          </NavLink>

          <div className="px-4 py-2 mt-2 text-uppercase text-secondary fw-bold small" style={{ fontSize: '0.7rem' }}>Inventory</div>
          <NavLink to="/admin/add-product" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <FiPlusCircle size={18} /> Add Product
          </NavLink>
          <NavLink to="/admin/manage-product" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <FiList size={18} /> Manage Products
          </NavLink>

          <div className="px-4 py-2 mt-2 text-uppercase text-secondary fw-bold small" style={{ fontSize: '0.7rem' }}>Users & Feed</div>
          <NavLink to="/admin/manage-customer" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <FiUsers size={18} /> Customers
          </NavLink>
          <NavLink to="/admin/manage-contact" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <FiMessageSquare size={18} /> Messages
          </NavLink>
        </nav>
      </div>

      {/* Admin Session Profile & Logout */}
      <div className="px-3">
        <hr className="border-secondary opacity-25 mb-4" />
        {admin && (
          <div className="bg-white bg-opacity-5 rounded-3 p-3 mb-3">
            <span className="text-secondary small d-block">Logged in as</span>
            <span className="text-white small fw-bold text-truncate d-block">{admin.email}</span>
          </div>
        )}
        <button className="btn btn-outline-danger w-100 rounded-3 py-2 d-flex align-items-center justify-content-center gap-2" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default AHeader;
export { AHeader };
