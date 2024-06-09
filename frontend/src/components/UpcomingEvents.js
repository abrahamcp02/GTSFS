import React, { useState, useEffect } from 'react';
import { fetchPerformances } from '../services/apiPerformanceService';
import { fetchAvailableSeats } from '../services/apiSeatService';
import './styles/UpcomingEvents.css';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [availableSeats, setAvailableSeats] = useState({});

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetchPerformances();
        const eventsData = response.data;
        setEvents(eventsData);

        const seatsPromises = eventsData.map(event => fetchAvailableSeats(event.id));
        const seats = await Promise.all(seatsPromises);
        const seatsData = eventsData.reduce((acc, event, index) => {
          acc[event.id] = seats[index];
          return acc;
        }, {});
        setAvailableSeats(seatsData);
      } catch (error) {
        console.error('Error fetching events or seats:', error);
      }
    };
    getEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = events.reduce((acc, event) => {
        acc[event.id] = calculateCountdown(event.performance_date);
        return acc;
      }, {});
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  const calculateCountdown = (date) => {
    const eventDate = new Date(date).getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      return "Evento terminado";
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="upcoming-events">
      {events.length > 0 ? (
        events.filter(event => countdowns[event.id] !== "Evento terminado").map(event => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <div className="event-image-container">
              <img src={event.image} alt={event.image} className="event-image" />
            </div>
            <p className="eventt-date">📅 {new Date(event.performance_date).toLocaleDateString()}</p>
            <p className="countdown">Quedan: {countdowns[event.id]}</p>
            <a href={`/performances/${event.id}`} className="event-details-link">
              Entradas {availableSeats[event.id] !== undefined ? `(${availableSeats[event.id]} libres)` : ''}
            </a>
          </div>
        ))
      ) : (
        <p>No hay eventos próximos.</p>
      )}
    </div>
  );
};

export default UpcomingEvents;
