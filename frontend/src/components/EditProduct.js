import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../services/apiService';
import './styles/EditProduct.css';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', image: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchProductById(productId);
        if (response.data && response.data.length > 0) {
          setProduct(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateProduct(productId, product);
      navigate('/store');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="edit-product-container">
      <h2>Editar Producto</h2>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Precio:</label>
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Imagen (URL):</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Descripción:</label>
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button onClick={handleSave} className="btn btn-primary-edit">
        Guardar
      </button>
    </div>
  );
};

export default EditProduct;
