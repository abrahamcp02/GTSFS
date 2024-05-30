import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../services/apiService';
import './EditProduct.css';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', image: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetchProductById(productId);
      setProduct(response.data);
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSave = async () => {
    await updateProduct(productId, product);
    navigate('/store');
  };

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
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.decription}
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
