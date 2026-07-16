import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiShoppingBag, FiPlus, FiMinus, FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi';
import { AppContext } from '../../App';

const ShopSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customer, PRODUCT_API, addToCart, toast, showLoader, hideLoader } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        showLoader();
        const res = await axios.get(`${PRODUCT_API}/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product details:', err);
        toast('Product not found or database error.', 'error');
        navigate('/shop');
      } finally {
        hideLoader();
      }
    };
    fetchProduct();
  }, [id, PRODUCT_API, navigate]);

  const handleQtyChange = (val) => {
    if (val < 1) return;
    setQuantity(val);
  };

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Back button */}
      <div className="mb-4">
        <Link to="/shop" className="btn btn-light rounded-pill px-4 d-inline-flex align-items-center gap-2 shadow-sm">
          <FiArrowLeft /> Back to Shop Catalog
        </Link>
      </div>

      <div className="row g-5">
        {/* Product Image */}
        <div className="col-md-6">
          <div className="glass-card overflow-hidden bg-white p-3 d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded-4 object-fit-contain w-100"
              style={{ maxHeight: '420px' }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div>
            <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">{product.category}</span>
            <h1 className="fw-extrabold mb-3 text-gradient d-inline-block">{product.name}</h1>
            
            {/* Reviews Placeholder for Aesthetics */}
            <div className="d-flex align-items-center gap-2 mb-4">
              <div className="text-warning">
                &#9733;&#9733;&#9733;&#9733;&#9733;
              </div>
              <span className="small text-muted fw-semibold">(4.9 out of 5 based on 32 reviews)</span>
            </div>

            <h2 className="fw-extrabold text-dark mb-4">&#8377;{product.price.toLocaleString('en-IN')}</h2>

            <h5 className="fw-bold mb-2">Description</h5>
            <p className="text-muted leading-relaxed mb-4">{product.description}</p>
          </div>

          <div>
            {/* Quantity Selector & Add to Cart */}
            <div className="d-flex flex-wrap align-items-center gap-4 mb-5">
              <div className="d-flex align-items-center gap-2 bg-light p-2 rounded-3 border">
                <button
                  className="btn btn-sm btn-white border rounded-circle p-1 d-flex align-items-center justify-content-center"
                  style={{ width: '32px', height: '32px' }}
                  onClick={() => handleQtyChange(quantity - 1)}
                >
                  <FiMinus />
                </button>
                <span className="px-3 fw-bold fs-5">{quantity}</span>
                <button
                  className="btn btn-sm btn-white border rounded-circle p-1 d-flex align-items-center justify-content-center"
                  style={{ width: '32px', height: '32px' }}
                  onClick={() => handleQtyChange(quantity + 1)}
                >
                  <FiPlus />
                </button>
              </div>

              {customer ? (
                <button
                  className="btn btn-primary-custom btn-lg rounded-pill px-5 py-3 d-flex align-items-center gap-2 shadow"
                  onClick={() => { addToCart(product, quantity); toast(`${quantity} x ${product.name} added to cart!`); }}
                >
                  <FiShoppingBag /> Add To Cart
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-outline-custom btn-lg rounded-pill px-5 py-3 d-inline-flex align-items-center gap-2 text-decoration-none"
                >
                  <FiShoppingBag /> Login to Purchase
                </Link>
              )}
            </div>

            {/* Small Selling Points */}
            <div className="row g-3 pt-4 border-top">
              <div className="col-4">
                <div className="d-flex align-items-center gap-2 small text-muted">
                  <FiTruck className="text-primary flex-shrink-0" size={16} />
                  <span>Free shipping</span>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center gap-2 small text-muted">
                  <FiShield className="text-primary flex-shrink-0" size={16} />
                  <span>1 Year Warranty</span>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center gap-2 small text-muted">
                  <FiRotateCcw className="text-primary flex-shrink-0" size={16} />
                  <span>14-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSingle;
