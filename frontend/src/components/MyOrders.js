import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../services/apiOrderService';
import { jwtDecode } from 'jwt-decode';
import OrderCard from './OrderCard'; // Asegúrate de importar el componente OrderCard
import './MyOrders.css'; // Asegúrate de tener estilos para este componente

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        const response = await getMyOrders(userId);
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="my-orders container">
      <h2 className="mb-4">Mis Pedidos</h2>
      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p>No hay pedidos disponibles.</p>
      )}
    </div>
  );
};

export default MyOrders;
