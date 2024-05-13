import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link aquí
import { fetchProducts, deleteProduct, updateProduct } from '../services/apiService';
import { jwtDecode } from "jwt-decode";
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: '', price: '' });
  const userToken = localStorage.getItem('token');


  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      setProducts(response.data);
    };
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditedProduct({ name: product.name, price: product.price });
  };

  const handleSave = async () => {
    await updateProduct(editingProductId, editedProduct);
    setProducts(products.map(product => {
      if (product.id === editingProductId) {
        return { ...product, name: editedProduct.name, price: editedProduct.price };
      }
      return product;
    }));
    setEditingProductId(null);
  };

  const token = localStorage.getItem('token');

  if (token) {
    const decoded = jwtDecode(token);
    const role=decoded.role;
    console.log(role);
    if(role==="admin"){
      return (
        <div className="product-list-container">
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
                <div className="product-actions">
                  <button className="edit-button" onClick={handleEdit}>✏️</button>
                  <button className="delete-button">🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    else{
      return (
        <div className="product-list-container">
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
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
};

export default ProductList;
