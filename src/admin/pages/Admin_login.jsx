import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiCpu, FiLogIn } from 'react-icons/fi';
import { AppContext } from '../../App';

const AdminLogin = () => {
  const { admin, loginAdmin, ADMIN_API, toast, showLoader, hideLoader } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validated, setValidated] = useState(false);

  // If already logged in, auto-redirect to dashboard
  useEffect(() => {
    if (admin) {
      navigate('/admin/dashboard');
    }
  }, [admin, navigate]);

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
      const response = await axios.get(ADMIN_API);
      const matchedAdmin = response.data.find(
        a => a.email.toLowerCase() === formData.email.toLowerCase() && a.password === formData.password
      );

      if (matchedAdmin) {
        loginAdmin(matchedAdmin);
        toast("Admin logged in successfully!", "success");
        navigate('/admin/dashboard');
      } else {
        toast("Invalid Admin credentials", "error");
      }
    } catch (err) {
      console.error(err);
      toast("Admin authentication failed. Ensure JSON Server is running.", "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center py-5 px-3">
      <div className="glass-card p-5 w-100 bg-dark bg-opacity-70 text-white" style={{ maxWidth: '440px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="text-center mb-4">
          <div className="bg-primary text-white p-3 rounded-4 d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{ width: '56px', height: '56px' }}>
            <FiCpu size={28} />
          </div>
          <h2 className="fw-extrabold mb-1 text-white">Admin Console</h2>
          <p className="text-secondary small">Access shop management controls</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={validated ? 'was-validated' : ''}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Admin Email</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary border-end-0 text-secondary"><FiMail size={18} /></span>
              <input
                type="email"
                className="form-control bg-dark border-secondary text-white border-start-0 ps-0"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@gmail.com"
                style={{ outline: 'none', boxShadow: 'none' }}
                required
              />
              <div className="invalid-feedback text-danger">Please enter a valid email</div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary border-end-0 text-secondary"><FiLock size={18} /></span>
              <input
                type="password"
                className="form-control bg-dark border-secondary text-white border-start-0 ps-0"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter admin password"
                style={{ outline: 'none', boxShadow: 'none' }}
                required
              />
              <div className="invalid-feedback text-danger">Please enter password</div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary-custom w-100 py-3 rounded-3 mb-2 d-flex align-items-center justify-content-center gap-2">
            <FiLogIn /> Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
