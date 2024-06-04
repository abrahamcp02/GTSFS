import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/apiService';
import './styles/CreateProduct.css'; // Asegúrate de crear este archivo para los estilos

const CreateProduct = () => {
  const [product, setProduct] = useState({ name: '', price: '', image: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(product);
    navigate('/store'); // Navega de vuelta a la lista de productos después de crear uno nuevo
  };

  return (
    <div className="create-product-container">
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL de la Imagen</label>
          <input
            type="text"
            id="image"
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
        <button type="submit" className="btn btn-primary">Crear Producto</button>
      </form>
    </div>
  );
};

export default CreateProduct;
