import React from 'react';
import './styles/LoadingSpinner.css'; // Asegúrate de tener los estilos para el spinner

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
