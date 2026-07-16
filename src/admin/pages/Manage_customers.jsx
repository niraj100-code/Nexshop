import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FiTrash2, FiUser, FiCalendar, FiMail } from 'react-icons/fi';
import { AppContext } from '../../App';

const ManageCustomers = () => {
  const { CUSTOMER_API, toast, showLoader, hideLoader } = useContext(AppContext);
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      showLoader();
      const res = await axios.get(CUSTOMER_API);
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      toast("Error loading customer database", "error");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [CUSTOMER_API]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer account? This action is irreversible.")) return;

    try {
      showLoader();
      await axios.delete(`${CUSTOMER_API}/${id}`);
      toast("Customer account deleted", "success");
      fetchCustomers();
    } catch (err) {
      console.error(err);
      toast("Failed to delete customer profile", "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h2 className="fw-extrabold mb-1">Registered Customers</h2>
        <p className="text-muted small">Overview of client registrations and account details</p>
      </div>

      <div className="glass-card p-4">
        {customers.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <FiUser size={48} className="mb-3 text-secondary opacity-50 d-block mx-auto" />
            <h5>No registered customers found</h5>
            <p className="small">Customers will appear here once they register on the storefront sign-up page.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>ID</th>
                  <th>Customer Name</th>
                  <th>Email Address</th>
                  <th>Date Joined</th>
                  <th style={{ width: '100px' }} className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((cust) => (
                  <tr key={cust.id}>
                    <td>{cust.id}</td>
                    <td>
                      <span className="fw-bold d-flex align-items-center gap-2">
                        <FiUser className="text-secondary" /> {cust.name}
                      </span>
                    </td>
                    <td>
                      <span className="small text-muted d-flex align-items-center gap-2">
                        <FiMail /> {cust.email}
                      </span>
                    </td>
                    <td>
                      <span className="small text-muted d-flex align-items-center gap-2">
                        <FiCalendar /> {cust.dateJoined ? new Date(cust.dateJoined).toLocaleDateString('en-US', { dateStyle: 'medium' }) : 'N/A'}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-outline-danger btn-sm rounded-circle p-2 d-inline-flex align-items-center justify-content-center" onClick={() => handleDelete(cust.id)} style={{ width: '36px', height: '36px' }} title="Delete Customer">
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCustomers;
export { ManageCustomers };
