import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { AppContext } from '../../App';

const Contact = () => {
  const { CONTACT_API, toast, showLoader, hideLoader } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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
      // Post inquiries to JSON Server
      await axios.post(CONTACT_API, {
        ...formData,
        date: new Date().toISOString()
      });
      toast("Message sent successfully! We'll get back to you soon.", "success");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setValidated(false);
    } catch (err) {
      console.error(err);
      toast("Failed to send message. Please try again.", "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="container py-5">
      {/* Title */}
      <div className="text-center mb-5">
        <span className="text-primary fw-bold text-uppercase tracking-wider small">Get In Touch</span>
        <h1 className="fw-extrabold mb-3">Contact NexShop Support</h1>
        <p className="text-muted col-md-6 mx-auto">
          Have queries about products, order status, or wholesale deals? Send us a message and our service desk will reply within 24 hours.
        </p>
      </div>

      <div className="row g-5 mb-5">
        {/* Info panel */}
        <div className="col-lg-5">
          <div className="glass-card p-5 bg-dark text-white h-100 d-flex flex-column justify-content-between" style={{ border: 'none' }}>
            <div>
              <h3 className="fw-bold mb-4 text-white">Contact Info</h3>
              <p className="text-secondary mb-5">
                We are always open to discuss new opportunities, product recommendations, or support queries.
              </p>

              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary text-white p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px' }}>
                    <FiMapPin size={22} />
                  </div>
                  <div>
                    <span className="text-secondary small d-block">Location</span>
                    <span className="fw-semibold">123 Innovation Boulevard, Tech City</span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary text-white p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px' }}>
                    <FiPhone size={22} />
                  </div>
                  <div>
                    <span className="text-secondary small d-block">Call Us</span>
                    <span className="fw-semibold">+1 (555) 019-2834</span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary text-white p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '54px', height: '54px' }}>
                    <FiMail size={22} />
                  </div>
                  <div>
                    <span className="text-secondary small d-block">Email Support</span>
                    <span className="fw-semibold">support@nexshop.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-top border-secondary opacity-50 small text-secondary">
              Customer support timings: Monday to Friday (9:00 AM - 6:00 PM EST)
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-lg-7">
          <div className="glass-card p-5 h-100">
            <h3 className="fw-bold mb-4">Send a Message</h3>
            <form onSubmit={handleSubmit} noValidate className={validated ? 'was-validated' : ''}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nameInput" className="form-label fw-semibold small text-muted">Full Name</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    id="nameInput"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                  <div className="invalid-feedback">Please enter your name</div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="emailInput" className="form-label fw-semibold small text-muted">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-custom"
                    id="emailInput"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                  <div className="invalid-feedback">Please enter a valid email</div>
                </div>
                <div className="col-12">
                  <label htmlFor="subjectInput" className="form-label fw-semibold small text-muted">Subject</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    id="subjectInput"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                  <div className="invalid-feedback">Please enter a subject</div>
                </div>
                <div className="col-12">
                  <label htmlFor="messageInput" className="form-label fw-semibold small text-muted">Message</label>
                  <textarea
                    className="form-control form-control-custom"
                    id="messageInput"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry details..."
                    required
                  ></textarea>
                  <div className="invalid-feedback">Please enter details of your message</div>
                </div>
                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-primary-custom w-100 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2">
                    <FiSend /> Send Inquiry Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="glass-card overflow-hidden" style={{ height: '400px' }}>
        <iframe
          title="NexShop Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d-122.08408968468021!3d37.42199997982519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425da8f9%3A0x2a9b6c11a9d5f592!2sGoogleplex!5e0!3m2!1sen!2sus!4v1625615784918!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
