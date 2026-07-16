import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash2, FiSearch, FiPlusCircle, FiX, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';

const ManageProducts = () => {
  const { PRODUCT_API, CATEGORY_API, toast, showLoader, hideLoader } = useContext(AppContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal Edit states
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    description: ''
  });

  const fetchData = async () => {
    try {
      showLoader();
      const [prodRes, catRes] = await Promise.all([
        axios.get(PRODUCT_API),
        axios.get(CATEGORY_API)
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error(err);
      toast("Error loading products data", "error");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchData();
  }, [PRODUCT_API, CATEGORY_API]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      showLoader();
      await axios.delete(`${PRODUCT_API}/${id}`);
      toast("Product deleted successfully", "success");
      fetchData();
    } catch (err) {
      console.error(err);
      toast("Failed to delete product", "error");
    } finally {
      hideLoader();
    }
  };

  const handleEditClick = (prod) => {
    setEditingProduct(prod);
    setEditForm({
      name: prod.name,
      price: prod.price,
      image: prod.image,
      category: prod.category,
      description: prod.description
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editForm.name.trim() || !editForm.price || !editForm.category.trim()) {
      toast("Please fill in all required fields", "error");
      return;
    }

    try {
      showLoader();
      await axios.put(`${PRODUCT_API}/${editingProduct.id}`, {
        name: editForm.name,
        price: parseFloat(editForm.price),
        image: editForm.image,
        category: editForm.category,
        description: editForm.description
      });
      toast("Product updated successfully", "success");
      setEditingProduct(null);
      fetchData();
    } catch (err) {
      console.error(err);
      toast("Failed to update product", "error");
    } finally {
      hideLoader();
    }
  };

  // Filter products by search query
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid py-4 position-relative">
      <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2 className="fw-extrabold mb-1">Manage Products</h2>
          <p className="text-muted small">Update specs, modify pricing, or delete shop inventory items</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          {/* Search box */}
          <div className="input-group" style={{ maxWidth: '280px' }}>
            <span className="input-group-text bg-white border-end-0 text-muted"><FiSearch /></span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-primary-custom rounded-pill px-4 d-flex align-items-center gap-2" onClick={() => navigate('/admin/add-product')}>
            <FiPlusCircle /> Add Product
          </button>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="glass-card p-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <h5>No matching products found</h5>
            <p className="small">Try adjusting search parameters or create a product.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th style={{ width: '120px' }} className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="rounded object-fit-cover"
                        style={{ width: '48px', height: '48px', backgroundColor: '#f1f5f9' }}
                      />
                    </td>
                    <td><span className="fw-bold text-dark">{prod.name}</span></td>
                    <td><span className="badge bg-secondary rounded-pill px-2.5 py-1.5">{prod.category}</span></td>
                    <td className="fw-extrabold text-primary">&#8377;{prod.price.toLocaleString('en-IN')}</td>
                    <td className="text-muted small text-truncate" style={{ maxWidth: '240px' }}>{prod.description}</td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-outline-primary btn-sm rounded-circle p-2 d-inline-flex align-items-center justify-content-center" onClick={() => handleEditClick(prod)} style={{ width: '36px', height: '36px' }} title="Edit Product">
                          <FiEdit size={16} />
                        </button>
                        <button className="btn btn-outline-danger btn-sm rounded-circle p-2 d-inline-flex align-items-center justify-content-center" onClick={() => handleDelete(prod.id)} style={{ width: '36px', height: '36px' }} title="Delete Product">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inline Modal Edit Overlay */}
      {editingProduct && (
        <div className="modal-overlay d-flex justify-content-center align-items-center">
          <div className="glass-card p-5 w-100 modal-card mx-3" style={{ maxWidth: '640px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
              <h4 className="fw-bold mb-0">Edit Product: {editingProduct.name}</h4>
              <button className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center" onClick={() => setEditingProduct(null)}>
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-muted">Product Name</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-muted">Price (&#8377;)</label>
                  <input
                    type="number"
                    className="form-control form-control-custom"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    min="1"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-muted">Category</label>
                  <select
                    className="form-select form-control-custom"
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    required
                  >
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold text-muted">Image URL</label>
                  <input
                    type="url"
                    className="form-control form-control-custom"
                    name="image"
                    value={editForm.image}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold text-muted">Description</label>
                  <textarea
                    className="form-control form-control-custom"
                    name="description"
                    rows="3"
                    value={editForm.description}
                    onChange={handleEditChange}
                    required
                  ></textarea>
                </div>
                <div className="col-12 mt-4 d-flex gap-2 justify-content-end">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setEditingProduct(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-custom rounded-pill px-4 d-flex align-items-center gap-1">
                    <FiCheck /> Update Details
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1100;
        }
        .modal-card {
          animation: modalSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes modalSlide {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ManageProducts;
