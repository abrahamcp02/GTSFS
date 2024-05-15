import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/apiService';
import {jwtDecode} from 'jwt-decode';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  let role;

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      setProducts(response.data);
    };
    getProducts();
  }, []);

  const token = localStorage.getItem('token');

  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  return (
    <div className="product-list-container">
      {role === "admin" && (
        <div className="create-product-button-container">
          <button
            className="btn btn-success"
            onClick={() => navigate('/create-product')}
          >
            Crear Producto
          </button>
        </div>
      )}
      {products.map(product => (
        <div key={product.id} className="product-item">
          <div className="product-image-container">
            <img src={product.image} alt={product.name} className="product-image" />
          </div>
          <div className="product-details">
            <Link to={`/products/${product.id}`} className="product-name">
              {product.name}
            </Link>
            <p className="product-price">{product.price} €</p>
            {role === "admin" && (
              <div className="product-actions">
                <button
                  className="edit-button"
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                >
                  ✏️
                </button>
                <button
                  className="delete-button"
                  onClick={() => navigate(`/delete-product/${product.id}`)}
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
