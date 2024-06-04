// MyTickets.js
import React, { useState, useEffect } from 'react';
import { getMyTickets } from '../services/apiTicketService';
import { jwtDecode } from 'jwt-decode';
import TicketCard from './TicketCard'; // Asegúrate de importar el componente TicketCard
import './styles/MyTickets.css'; // Asegúrate de tener estilos para este componente

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
    <div className="my-tickets container">
      <h2 className="mb-4">Mis Tickets</h2>
      {tickets.length > 0 ? (
        <div className="ticket-list">
          {tickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <p>No hay tickets disponibles.</p>
      )}
    </div>
  );
};

export default MyTickets;
