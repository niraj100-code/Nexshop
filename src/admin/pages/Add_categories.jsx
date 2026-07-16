import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPlusCircle, FiList } from 'react-icons/fi';
import { AppContext } from '../../App';

const AddCategories = () => {
  const { CATEGORY_API, toast, showLoader, hideLoader } = useContext(AppContext);
  const navigate = useNavigate();
  const [catName, setCatName] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!catName.trim()) {
      setValidated(true);
      return;
    }

    try {
      showLoader();
      
      // Check duplicate
      const checkRes = await axios.get(CATEGORY_API);
      const exists = checkRes.data.find(c => c.name.toLowerCase() === catName.trim().toLowerCase());
      if (exists) {
        toast("Category already exists!", "error");
        return;
      }

      await axios.post(CATEGORY_API, {
        name: catName.trim()
      });

      toast(`Category "${catName}" added!`, "success");
      setCatName('');
      setValidated(false);
      navigate('/admin/manage-category');
    } catch (err) {
      console.error(err);
      toast("Failed to add category", "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-extrabold mb-1">Create Category</h2>
          <p className="text-muted small">Define new classification for shop merchandise catalog</p>
        </div>
        <button className="btn btn-outline-custom rounded-pill px-4 d-flex align-items-center gap-2" onClick={() => navigate('/admin/manage-category')}>
          <FiList /> View Categories List
        </button>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="glass-card p-5">
            <h4 className="fw-bold mb-4">Add New Category</h4>
            <form onSubmit={handleSubmit} noValidate className={validated ? 'was-validated' : ''}>
              <div className="mb-4">
                <label htmlFor="catNameInput" className="form-label fw-semibold small text-muted">Category Name</label>
                <input
                  type="text"
                  className="form-control form-control-custom"
                  id="catNameInput"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Smartwatches, Smart Home..."
                  required
                />
                <div className="invalid-feedback">Please type a category name</div>
              </div>

              <button type="submit" className="btn btn-primary-custom px-5 py-3 rounded-3 d-inline-flex align-items-center gap-2 shadow">
                <FiPlusCircle /> Save Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
