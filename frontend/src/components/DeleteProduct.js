import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteProduct } from '../services/apiService';
import './styles/DeleteProduct.css'; // Asegúrate de crear este archivo para los estilos

const DeleteProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteProduct(productId);
    navigate('/store'); // Navega de vuelta a la lista de productos después de eliminar
  };

  const handleCancel = () => {
    navigate('/store'); // Navega de vuelta a la lista de productos si se cancela la eliminación
  };

  return (
    <div className="delete-product-container">
      <h2>Confirmar Eliminación</h2>
      <p>¿Estás seguro de que deseas eliminar este producto?</p>
      <div className="delete-product-actions">
        <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
        <button onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteProduct;
