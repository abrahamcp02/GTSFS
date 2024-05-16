import React from 'react';
import './OrderCard.css'; // Asegúrate de tener estilos para este componente

const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <div className="order-info">
        <h3>{order.name}</h3>
        <p><strong>Descripción:</strong> {order.description}</p>
        <p><strong>Precio:</strong> {order.price}€</p>
        <p><strong>Order Number:</strong> {order.order_number}</p>
        <p><strong>Purchased At:</strong> {new Date(order.purchased_at).toLocaleString()}</p>
      </div>
      <div className="order-image-container">
        <img src={order.image} alt={order.name} className="order-image" />
      </div>
    </div>
  );
};

export default OrderCard;
