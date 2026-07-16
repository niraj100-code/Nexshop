import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FiTrash2, FiMessageSquare, FiMail, FiCalendar } from 'react-icons/fi';
import { AppContext } from '../../App';

const ManageContacts = () => {
  const { CONTACT_API, toast, showLoader, hideLoader } = useContext(AppContext);
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      showLoader();
      const res = await axios.get(CONTACT_API);
      setContacts(res.data);
    } catch (err) {
      console.error(err);
      toast("Error loading support messages", "error");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [CONTACT_API]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message record?")) return;

    try {
      showLoader();
      await axios.delete(`${CONTACT_API}/${id}`);
      toast("Message entry deleted", "success");
      fetchContacts();
    } catch (err) {
      console.error(err);
      toast("Failed to delete message", "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h2 className="fw-extrabold mb-1">Customer Inquiries</h2>
        <p className="text-muted small">Manage feedback messages and support requests submitted via contact form</p>
      </div>

      <div className="glass-card p-4">
        {contacts.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <FiMessageSquare size={48} className="mb-3 text-secondary opacity-50 d-block mx-auto" />
            <h5>No inquiries recorded</h5>
            <p className="small">Inquiries submitted on the contact page will automatically show up here.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>ID</th>
                  <th style={{ width: '220px' }}>Contact Person</th>
                  <th style={{ width: '220px' }}>Subject</th>
                  <th>Message Body</th>
                  <th style={{ width: '160px' }}>Submitted Date</th>
                  <th style={{ width: '80px' }} className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((msg) => (
                  <tr key={msg.id}>
                    <td>{msg.id}</td>
                    <td>
                      <div>
                        <span className="fw-bold d-block text-dark">{msg.name}</span>
                        <span className="small text-muted d-flex align-items-center gap-1"><FiMail /> {msg.email}</span>
                      </div>
                    </td>
                    <td><span className="fw-semibold text-primary">{msg.subject}</span></td>
                    <td>
                      <p className="small text-dark mb-0 text-wrap leading-relaxed" style={{ minWidth: '240px' }}>
                        {msg.message}
                      </p>
                    </td>
                    <td>
                      <span className="small text-muted d-flex align-items-center gap-1.5">
                        <FiCalendar /> {msg.date ? new Date(msg.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A'}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-outline-danger btn-sm rounded-circle p-2 d-inline-flex align-items-center justify-content-center" onClick={() => handleDelete(msg.id)} style={{ width: '36px', height: '36px' }} title="Delete Inquiry">
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

export default ManageContacts;
export { ManageContacts };
