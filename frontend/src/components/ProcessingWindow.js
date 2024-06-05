import React from 'react';
import './styles/ProcessingPopup.css';

const ProcessingPopup = ({ message }) => {
  return (
    <div className="processing-popup-overlay">
      <div className="processing-popup">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only"></span>
        </div>
        <h2>{message}</h2>
      </div>
    </div>
  );
};

export default ProcessingPopup;
