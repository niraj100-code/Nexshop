import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPlusCircle, FiList } from 'react-icons/fi';
import { AppContext } from '../../App';

const AddProducts = () => {
  const { PRODUCT_API, CATEGORY_API, toast, showLoader, hideLoader } = useContext(AppContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    description: ''
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get(CATEGORY_API);
        setCategories(res.data);
        if (res.data.length > 0) {
          setFormData(prev => ({ ...prev, category: res.data[0].name }));
        }
      } catch (err) {
        console.error(err);
        toast("Failed to load categories list", "error");
      }
    };
    fetchCats();
  }, [CATEGORY_API]);

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

    if (categories.length === 0) {
      toast("Please add a category first!", "error");
      return;
    }

    try {
      showLoader();
      await axios.post(PRODUCT_API, {
        name: formData.name,
        price: parseFloat(formData.price),
        image: formData.image || 'https://via.placeholder.com/300',
        category: formData.category,
        description: formData.description
      });

      toast(`Product "${formData.name}" added successfully!`, "success");
      setFormData({
        name: '',
        price: '',
        image: '',
        category: categories[0]?.name || '',
        description: ''
      });
      setValidated(false);
      navigate('/admin/manage-product');
    } catch (err) {
      console.error(err);
      toast("Failed to save product", "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-extrabold mb-1">Create Product</h2>
          <p className="text-muted small">Publish new items to the client e-commerce store catalog</p>
        </div>
        <button className="btn btn-outline-custom rounded-pill px-4 d-flex align-items-center gap-2" onClick={() => navigate('/admin/manage-product')}>
          <FiList /> View Products List
        </button>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="glass-card p-5">
            <h4 className="fw-bold mb-4">Product Details</h4>
            <form onSubmit={handleSubmit} noValidate className={validated ? 'was-validated' : ''}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="prodName" className="form-label fw-semibold small text-muted">Product Name</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    id="prodName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. iPad Air, Sony Speaker"
                    required
                  />
                  <div className="invalid-feedback">Please provide product name</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="prodPrice" className="form-label fw-semibold small text-muted">Price (&#8377;)</label>
                  <input
                    type="number"
                    className="form-control form-control-custom"
                    id="prodPrice"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 45000"
                    min="1"
                    required
                  />
                  <div className="invalid-feedback">Please provide valid price</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="prodCat" className="form-label fw-semibold small text-muted">Category</label>
                  <select
                    className="form-select form-control-custom"
                    id="prodCat"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    {categories.length === 0 ? (
                      <option value="">No categories available - Add one first</option>
                    ) : (
                      categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)
                    )}
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="prodImage" className="form-label fw-semibold small text-muted">Product Image URL</label>
                  <input
                    type="url"
                    className="form-control form-control-custom"
                    id="prodImage"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                  <div className="invalid-feedback">Please provide a valid image URL</div>
                </div>

                <div className="col-12">
                  <label htmlFor="prodDesc" className="form-label fw-semibold small text-muted">Description</label>
                  <textarea
                    className="form-control form-control-custom"
                    id="prodDesc"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter details, specs, and features of the product..."
                    required
                  ></textarea>
                  <div className="invalid-feedback">Please enter product description</div>
                </div>

                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-primary-custom px-5 py-3 rounded-3 d-inline-flex align-items-center gap-2 shadow">
                    <FiPlusCircle /> Add Product to Catalog
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
