import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash2, FiSave, FiX, FiPlusCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';

const ManageCategories = () => {
  const { CATEGORY_API, toast, showLoader, hideLoader } = useContext(AppContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const fetchCategories = async () => {
    try {
      showLoader();
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      toast("Error loading categories", "error");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [CATEGORY_API]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      showLoader();
      await axios.delete(`${CATEGORY_API}/${id}`);
      toast("Category deleted successfully", "success");
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast("Failed to delete category", "error");
    } finally {
      hideLoader();
    }
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) {
      toast("Category name cannot be empty", "error");
      return;
    }

    try {
      showLoader();
      await axios.put(`${CATEGORY_API}/${id}`, {
        name: editName.trim()
      });
      toast("Category updated successfully", "success");
      setEditingId(null);
      setEditName('');
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast("Failed to update category", "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-extrabold mb-1">Manage Categories</h2>
          <p className="text-muted small">Update classifications or delete obsolete categories</p>
        </div>
        <button className="btn btn-primary-custom rounded-pill px-4 d-flex align-items-center gap-2" onClick={() => navigate('/admin/add-category')}>
          <FiPlusCircle /> Add Category
        </button>
      </div>

      <div className="glass-card p-4">
        {categories.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <h5>No categories registered yet</h5>
            <p className="small">Click "Add Category" above to populate classifications.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>ID</th>
                  <th>Category Name</th>
                  <th style={{ width: '180px' }} className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.id}</td>
                    <td>
                      {editingId === cat.id ? (
                        <input
                          type="text"
                          className="form-control form-control-custom py-1 px-2"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      ) : (
                        <span className="fw-bold">{cat.name}</span>
                      )}
                    </td>
                    <td className="text-end">
                      {editingId === cat.id ? (
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-success btn-sm rounded-3 py-1 px-3 d-flex align-items-center gap-1" onClick={() => handleUpdate(cat.id)}>
                            <FiSave size={14} /> Save
                          </button>
                          <button className="btn btn-outline-secondary btn-sm rounded-3 py-1 px-3 d-flex align-items-center gap-1" onClick={cancelEdit}>
                            <FiX size={14} /> Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-outline-primary btn-sm rounded-circle p-2 d-inline-flex align-items-center justify-content-center" onClick={() => startEdit(cat)} style={{ width: '36px', height: '36px' }} title="Edit Category">
                            <FiEdit size={16} />
                          </button>
                          <button className="btn btn-outline-danger btn-sm rounded-circle p-2 d-inline-flex align-items-center justify-content-center" onClick={() => handleDelete(cat.id)} style={{ width: '36px', height: '36px' }} title="Delete Category">
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      )}
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

export default ManageCategories;
