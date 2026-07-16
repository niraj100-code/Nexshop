import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FiGrid, FiShoppingBag, FiUsers, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';
import { AppContext } from '../../App';

const Dashboard = () => {
  const {
    PRODUCT_API,
    CATEGORY_API,
    CUSTOMER_API,
    CONTACT_API,
    showLoader,
    hideLoader,
    toast
  } = useContext(AppContext);

  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    customers: 0,
    contacts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        showLoader();
        const [prodRes, catRes, custRes, contRes] = await Promise.all([
          axios.get(PRODUCT_API),
          axios.get(CATEGORY_API),
          axios.get(CUSTOMER_API),
          axios.get(CONTACT_API)
        ]);

        setStats({
          products: prodRes.data.length,
          categories: catRes.data.length,
          customers: custRes.data.length,
          contacts: contRes.data.length
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        toast("Failed to load statistics from server", "error");
      } finally {
        setLoading(false);
        hideLoader();
      }
    };
    fetchCounts();
  }, [PRODUCT_API, CATEGORY_API, CUSTOMER_API, CONTACT_API]);

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h2 className="fw-extrabold mb-1">Overview Dashboard</h2>
        <p className="text-muted small">System summary metrics and shop activity status</p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading Stats...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {/* Card Products */}
          <div className="col-sm-6 col-lg-3">
            <div className="glass-card p-4 h-100 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Total Products</span>
                <h3 className="fw-extrabold mb-0">{stats.products}</h3>
              </div>
              <div className="bg-primary-subtle text-primary p-3 rounded-4 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <FiShoppingBag size={24} />
              </div>
            </div>
          </div>

          {/* Card Categories */}
          <div className="col-sm-6 col-lg-3">
            <div className="glass-card p-4 h-100 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Categories</span>
                <h3 className="fw-extrabold mb-0">{stats.categories}</h3>
              </div>
              <div className="bg-success-subtle text-success p-3 rounded-4 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <FiGrid size={24} />
              </div>
            </div>
          </div>

          {/* Card Customers */}
          <div className="col-sm-6 col-lg-3">
            <div className="glass-card p-4 h-100 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Customers</span>
                <h3 className="fw-extrabold mb-0">{stats.customers}</h3>
              </div>
              <div className="bg-info-subtle text-info p-3 rounded-4 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <FiWhiteIconWrapper color="text-info"><FiUsers size={24} /></FiWhiteIconWrapper>
              </div>
            </div>
          </div>

          {/* Card Contacts */}
          <div className="col-sm-6 col-lg-3">
            <div className="glass-card p-4 h-100 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Contact Messages</span>
                <h3 className="fw-extrabold mb-0">{stats.contacts}</h3>
              </div>
              <div className="bg-warning-subtle text-warning p-3 rounded-4 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <FiMessageSquare size={24} />
              </div>
            </div>
          </div>

          {/* Graphical Analytics Placeholder Card */}
          <div className="col-12 mt-5">
            <div className="glass-card p-5 bg-gradient-primary text-white" style={{ border: 'none' }}>
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h3 className="fw-bold mb-2 text-white">System is fully operational</h3>
                  <p className="mb-0 text-light opacity-90 leading-relaxed">
                    JSON Server database connection is verified. Use the admin sidebar panel to manage inventory products, update categories lists, inspect customer registrations, or read incoming customer contact inquires.
                  </p>
                </div>
                <div className="col-md-4 text-center mt-3 mt-md-0">
                  <div className="bg-white bg-opacity-20 p-4 rounded-4 d-inline-flex flex-column align-items-center justify-content-center" style={{ minWidth: '150px' }}>
                    <FiTrendingUp size={36} className="mb-2" />
                    <span className="small fw-semibold d-block">Server Port</span>
                    <span className="fw-extrabold fs-4">3000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple internal helper to avoid icon coloring conflict
const FiWhiteIconWrapper = ({ color, children }) => {
  return <div className={color}>{children}</div>;
};

export default Dashboard;
