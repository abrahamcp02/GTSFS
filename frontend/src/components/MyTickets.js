// MyTickets.js
import React, { useState, useEffect } from 'react';
import { getMyTickets } from '../services/apiTicketService';
import { jwtDecode } from 'jwt-decode';
import './MyTickets.css'; // Asegúrate de tener estilos para este componente

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        const response = await getMyTickets(userId);
        setTickets(response.data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  return (
    <div className="my-tickets">
      <h2>Mis Tickets</h2>
      {tickets.length > 0 ? (
        <div className="ticket-list">
          {tickets.map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-info">
                <h3>{ticket.performance_name}</h3>
                <p>Asiento: {ticket.seat_number} Fila: {ticket.row_id}</p>
                <p>Fecha: {new Date(ticket.performance_date).toLocaleDateString()}</p>
                <p>Hora: {ticket.performance_time}</p>
                <p>Precio: {ticket.price}€</p>
                <p>Identificador: {ticket.serial_number}</p>
                <p>Comprado el: {new Date(ticket.purchased_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay tickets disponibles.</p>
      )}
    </div>
  );
};

export default MyTickets;
