// EventCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css'; // Estilos CSS

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event-details/${event.performance_id}`);
  };

  return (
    <div className="event-card" onClick={handleClick}>
      <div className="event-date">
        <span className="event-day">{new Date(event.performance_date).getDate()}</span>
        <span className="event-month">{new Date(event.performance_date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
      </div>
      <div className="event-info">
        <h3>{event.performance_title}</h3>
        <p>{event.performance_location}</p>
        <p>{new Date(event.performance_date).toLocaleDateString()} - {event.performance_time}</p>
      </div>
    </div>
  );
};

export default EventCard;
