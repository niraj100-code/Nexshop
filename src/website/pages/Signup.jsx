import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiCheckCircle } from 'react-icons/fi';
import { AppContext } from '../../App';

const Signup = () => {
  const { CUSTOMER_API, toast, showLoader, hideLoader } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Custom Validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast("Passwords do not match!", "error");
      return;
    }

    try {
      showLoader();
      
      // Check if user already exists
      const response = await axios.get(CUSTOMER_API);
      const existingUser = response.data.find(c => c.email.toLowerCase() === formData.email.toLowerCase());
      
      if (existingUser) {
        toast("A customer with this email already exists!", "error");
        return;
      }

      // Save customer to JSON Server
      await axios.post(CUSTOMER_API, {
        name: formData.name,
        email: formData.email.toLowerCase(),
        password: formData.password,
        dateJoined: new Date().toISOString()
      });

      toast("Account created successfully! Please login.", "success");
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast("Sign up failed. Please try again.", "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="glass-card p-5 w-100" style={{ maxWidth: '480px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-extrabold mb-1">Create Account</h2>
          <p className="text-muted small">Join NexShop and access premium gadget collections</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={validated ? 'was-validated' : ''}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-muted">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0"><FiUser size={18} className="text-secondary" /></span>
              <input
                type="text"
                className="form-control form-control-custom border-start-0 ps-0"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
              <div className="invalid-feedback">Please enter your name</div>
            </div>
          </div>

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
              <div className="invalid-feedback">Please enter a valid email</div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-semibold text-muted">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0"><FiLock size={18} className="text-secondary" /></span>
              <input
                type="password"
                className="form-control form-control-custom border-start-0 ps-0"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                minLength="6"
                required
              />
              <div className="invalid-feedback">Password must be at least 6 characters</div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-muted">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0"><FiLock size={18} className="text-secondary" /></span>
              <input
                type="password"
                className="form-control form-control-custom border-start-0 ps-0"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
              />
              <div className="invalid-feedback">Please confirm your password</div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary-custom w-100 py-3 rounded-3 mb-3 d-flex align-items-center justify-content-center gap-2">
            <FiCheckCircle /> Register Account
          </button>

          <div className="text-center small text-muted">
            Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
