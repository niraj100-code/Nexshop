import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit2, FiSave, FiX, FiCheckCircle } from 'react-icons/fi';
import { AppContext } from '../../App';

const Profile = () => {
  const { customer, loginCustomer, CUSTOMER_API, toast, showLoader, hideLoader } = useContext(AppContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '', // read-only
  });
  const [validated, setValidated] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!customer) {
      toast("Please login to view your profile", "error");
      navigate('/login');
    } else {
      setFormData({
        name: customer.name || '',
        phone: customer.phone || '',
        address: customer.address || '',
        email: customer.email || ''
      });
    }
  }, [customer, navigate, toast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      showLoader();
      
      const updatedCustomer = {
        ...customer,
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      };

      await axios.put(`${CUSTOMER_API}/${customer.id}`, updatedCustomer);
      
      // Update local storage and context state
      loginCustomer(updatedCustomer);
      toast("Profile updated successfully!", "success");
      setIsEditing(false);
      setValidated(false);
    } catch (err) {
      console.error('Error updating customer profile:', err);
      toast("Failed to update profile", "error");
    } finally {
      hideLoader();
    }
  };

  if (!customer) return null;

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="text-primary fw-bold text-uppercase tracking-wider small">Account Portal</span>
        <h1 className="fw-extrabold mb-2">Customer Profile</h1>
        <p className="text-muted">Manage your personal details and shipping information</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="glass-card p-5">
            {/* Header info */}
            <div className="d-flex align-items-center justify-content-between mb-4 pb-4 border-bottom flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary text-white rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                  <FiUser size={30} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-dark">{customer.name}</h3>
                  <span className="text-muted small">Customer ID: #{customer.id}</span>
                </div>
              </div>
              
              {!isEditing ? (
                <button className="btn btn-outline-custom rounded-pill px-4 d-flex align-items-center gap-2" onClick={() => setIsEditing(true)}>
                  <FiEdit2 size={16} /> Edit Profile
                </button>
              ) : (
                <button className="btn btn-outline-secondary rounded-pill px-4 d-flex align-items-center gap-2" onClick={() => { setIsEditing(false); setValidated(false); }}>
                  <FiX size={16} /> Cancel
                </button>
              )}
            </div>

            {/* Profile Form */}
            <form onSubmit={handleUpdate} noValidate className={validated ? 'was-validated' : ''}>
              <div className="row g-4">
                {/* Full Name */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><FiUser size={18} className="text-secondary" /></span>
                    <input
                      type="text"
                      className="form-control form-control-custom border-start-0 ps-0"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Your full name"
                      required
                    />
                    <div className="invalid-feedback">Please enter your name</div>
                  </div>
                </div>

                {/* Email (Read Only) */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Email Address (Cannot change)</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><FiMail size={18} className="text-secondary" /></span>
                    <input
                      type="email"
                      className="form-control form-control-custom border-start-0 ps-0 bg-light-subtle"
                      name="email"
                      value={formData.email}
                      disabled
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><FiPhone size={18} className="text-secondary" /></span>
                    <input
                      type="tel"
                      className="form-control form-control-custom border-start-0 ps-0"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="e.g. +91 9876543210"
                    />
                  </div>
                </div>

                {/* Date Joined */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Registration Date</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><FiCalendar size={18} className="text-secondary" /></span>
                    <input
                      type="text"
                      className="form-control form-control-custom border-start-0 ps-0 bg-light-subtle"
                      value={customer.dateJoined ? new Date(customer.dateJoined).toLocaleDateString('en-US', { dateStyle: 'long' }) : 'N/A'}
                      disabled
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="col-12">
                  <label className="form-label fw-semibold small text-muted">Shipping Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 align-self-start pt-3"><FiMapPin size={18} className="text-secondary" /></span>
                    <textarea
                      className="form-control form-control-custom border-start-0 ps-0"
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your street address, city, state, pincode"
                    ></textarea>
                  </div>
                </div>

                {isEditing && (
                  <div className="col-12 mt-4 text-end">
                    <button type="submit" className="btn btn-primary-custom px-5 py-3 rounded-3 d-inline-flex align-items-center gap-2 shadow">
                      <FiSave /> Save Changes
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
export { Profile };
