import React from 'react';
import './styles/ProcessingPopup.css';

const ProcessingPopup = ({ onClose }) => {
  return (
    <div className="processing-popup-overlay">
      <div className="processing-popup">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
        <h2>Procesando Pago...</h2>
      </div>
    </div>
  );
};

export default ProcessingPopup;
