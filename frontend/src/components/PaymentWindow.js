import React, { useState } from 'react';
import './styles/PaymentPopup.css';

const PaymentPopup = ({ onClose, onPayment }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    onPayment();
  };

  return (
    <div className="payment-popup-overlay">
      <div className="payment-popup">
        <h2>Introduce tus datos de pago</h2>
        <form onSubmit={handlePayment}>
          <div className="form-group">
            <label>Dirección:</label>
            <input
              type="text"
              name="address"
              value={paymentInfo.address}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Número de Tarjeta:</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Fecha de Caducidad:</label>
            <input
              type="text"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>CVC:</label>
            <input
              type="text"
              name="cvc"
              value={paymentInfo.cvc}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Completar Pago
          </button>
        </form>
        <button onClick={onClose} className="btn btn-secondary mt-3">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PaymentPopup;
