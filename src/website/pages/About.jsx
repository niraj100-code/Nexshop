import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiSmile, FiTrendingUp } from 'react-icons/fi';

const TEAM = [
  {
    name: 'Sarah Jenkins',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    bio: 'Sarah leads NexShop with a vision to build the ultimate consumer electronics destination.'
  },
  {
    name: 'David Chen',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: 'David oversees our system architecture and keeps our shop platform lighting fast.'
  },
  {
    name: 'Elena Rostova',
    role: 'Head of Customer Experience',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    bio: 'Elena makes sure our customer assistance and return protocols are completely seamless.'
  }
];

const About = () => {
  return (
    <div className="container py-5">
      {/* Title & Banner */}
      <div className="text-center mb-5">
        <span className="text-primary fw-bold text-uppercase tracking-wider small">Our Story</span>
        <h1 className="fw-extrabold mb-3">About NexShop</h1>
        <p className="text-muted col-md-8 mx-auto lead">
          Founded in 2024, NexShop has grown from a local tech shop into a premier online e-commerce ecosystem serving tech enthusiasts worldwide.
        </p>
      </div>

      {/* Grid of Info */}
      <div className="row align-items-center g-5 mb-5">
        <div className="col-lg-6">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
            alt="Office workspace"
            className="img-fluid rounded-4 shadow-lg"
          />
        </div>
        <div className="col-lg-6">
          <h2 className="fw-bold mb-4">Driving E-Commerce Forward</h2>
          <p className="text-muted">
            We believe that purchasing electronics should be direct, informative, and delightful. At NexShop, we carefully vet each brand and model before listing them on our platform. 
          </p>
          <p className="text-muted">
            Whether you are upgrading your workflow with a new laptop, finding the perfect active-noise canceling headsets, or searching for the latest mobile phone, we provide detailed guides and verified inventory to support your journey.
          </p>

          <div className="row g-3 mt-3">
            <div className="col-6">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary text-white p-2 rounded-3"><FiTrendingUp size={20} /></div>
                <div>
                  <h6 className="fw-bold mb-0">150% +</h6>
                  <span className="text-muted small">Year-on-Year Growth</span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-success text-white p-2 rounded-3"><FiSmile size={20} /></div>
                <div>
                  <h6 className="fw-bold mb-0">99.8%</h6>
                  <span className="text-muted small">Customer Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-5 h-100 bg-gradient-primary text-white"
            style={{ border: 'none' }}
          >
            <h3 className="fw-bold mb-3 text-white">Our Mission</h3>
            <p className="mb-0 text-light opacity-90 leading-relaxed">
              To democratize technology retail by providing seamless, high-quality, and authenticated customer experiences worldwide, ensuring every customer finds tools that empower their daily lives.
            </p>
          </motion.div>
        </div>
        <div className="col-md-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-5 h-100 bg-dark text-white"
            style={{ border: 'none' }}
          >
            <h3 className="fw-bold mb-3 text-white">Our Vision</h3>
            <p className="mb-0 text-secondary leading-relaxed">
              To build a global network of trusted online shops recognized for customer transparency, sustainable shipping logistics, and curated hardware catalogs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats row */}
      <div className="glass-card p-4 mb-5">
        <div className="row text-center g-4">
          <div className="col-md-3 col-6">
            <div className="p-3">
              <h2 className="fw-extrabold text-primary mb-1">50K+</h2>
              <span className="text-muted small fw-semibold">Happy Customers</span>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-3">
              <h2 className="fw-extrabold text-primary mb-1">120+</h2>
              <span className="text-muted small fw-semibold">Top Tech Brands</span>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-3">
              <h2 className="fw-extrabold text-primary mb-1">24/7</h2>
              <span className="text-muted small fw-semibold">Customer Support</span>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-3">
              <h2 className="fw-extrabold text-primary mb-1">15+</h2>
              <span className="text-muted small fw-semibold">Global Warehouses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-5">
        <div className="text-center mb-5">
          <span className="text-primary fw-bold text-uppercase tracking-wider small">The Experts</span>
          <h2 className="fw-extrabold">Meet Our Leadership Team</h2>
        </div>

        <div className="row g-4">
          {TEAM.map((member, index) => (
            <div key={index} className="col-md-4">
              <div className="glass-card h-100 p-4 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-circle mb-3 object-fit-cover shadow"
                  style={{ width: '120px', height: '120px', border: '3px solid var(--primary-color)' }}
                />
                <h5 className="fw-bold mb-1">{member.name}</h5>
                <span className="text-primary small fw-semibold d-block mb-3">{member.role}</span>
                <p className="text-muted small mb-0">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
