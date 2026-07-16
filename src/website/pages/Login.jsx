import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { AppContext } from '../../App';

const Login = () => {
  const { CUSTOMER_API, loginCustomer, toast, showLoader, hideLoader } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      showLoader();
      const response = await axios.get(CUSTOMER_API);
      const customer = response.data.find(
        c => c.email.toLowerCase() === formData.email.toLowerCase() && c.password === formData.password
      );

      if (customer) {
        loginCustomer(customer);
        toast(`Welcome back, ${customer.name}!`, "success");
        navigate('/');
      } else {
        toast("Invalid email or password", "error");
      }
    } catch (err) {
      console.error(err);
      toast("Login request failed. Please check backend server.", "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="glass-card p-5 w-100" style={{ maxWidth: '440px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-extrabold mb-1">Customer Login</h2>
          <p className="text-muted small">Sign in to manage shopping cart and orders</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={validated ? 'was-validated' : ''}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-muted">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0"><FiMail size={18} className="text-secondary" /></span>
              <input
                type="email"
                className="form-control form-control-custom border-start-0 ps-0"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
              <div className="invalid-feedback">Please enter your email</div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-muted">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0"><FiLock size={18} className="text-secondary" /></span>
              <input
                type="password"
                className="form-control form-control-custom border-start-0 ps-0"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
              <div className="invalid-feedback">Please enter your password</div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary-custom w-100 py-3 rounded-3 mb-3 d-flex align-items-center justify-content-center gap-2">
            <FiLogIn /> Sign In
          </button>

          <div className="text-center small text-muted">
            Don't have an account yet? <Link to="/signup" className="text-primary fw-bold text-decoration-none">Sign up here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
