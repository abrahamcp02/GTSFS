import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deletePerformance } from '../services/apiPerformanceService';
import './styles/DeletePerformance.css'; // Asegúrate de crear este archivo para los estilos

const DeletePerformance = () => {
  const { performanceId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deletePerformance(performanceId);
    navigate('/performances'); 
  };

  const handleCancel = () => {
    navigate('/performances');
  };

  return (
    <div className="delete-performance-container">
      <h2>Confirmar Eliminación</h2>
      <p>¿Estás seguro de que deseas eliminar esta representación?</p>
      <div className="delete-performance-actions">
        <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
        <button onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
      </div>
    </div>
  );
};

export default DeletePerformance;
