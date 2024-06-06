import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../services/apiOrderService';
import { jwtDecode } from 'jwt-decode';
import OrderCard from './OrderCard'; // Asegúrate de importar el componente OrderCard
import './styles/MyOrders.css'; // Asegúrate de tener estilos para este componente

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
        const groupedOrders = groupOrdersByDateTime(response.data);
        setOrders(groupedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const groupOrdersByDateTime = (orders) => {
    const grouped = orders.reduce((acc, order) => {
      const dateTime = new Date(order.purchased_at).toLocaleString(); // Agrupa por fecha y hora exacta
      if (!acc[dateTime]) {
        acc[dateTime] = [];
      }
      acc[dateTime].push(order);
      return acc;
    }, {});
    
    return Object.entries(grouped).map(([dateTime, orders]) => ({ dateTime, orders }));
  };

  return (
    <div className="my-orders container">
      <h2 className="mb-4">Mis Pedidos</h2>
      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map((group, index) => (
            <OrderCard key={index} dateTime={group.dateTime} orders={group.orders} />
          ))}
        </div>
      ) : (
        <p>No hay pedidos disponibles.</p>
      )}
    </div>
  );
};

export default MyOrders;
