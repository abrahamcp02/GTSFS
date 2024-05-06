import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeatConfiguration = () => {
  const [theater, setTheater] = useState({ sectors: [] });

  useEffect(() => {
    // Suponiendo que el id del teatro está disponible de alguna manera (ej: parámetro)
    const theaterId = 1;
    axios.get(`/api/theaters/${theaterId}`).then(response => {
      setTheater(response.data);
    });
  }, []);

  const handleAddSeat = (rowId) => {
    // Funcionalidad para agregar un asiento a una fila específica
    const newSeat = { number: 'Nuevo', rowId: rowId, isReserved: false };
    axios.post('/api/seats', newSeat).then(response => {
      // Actualizar el estado para reflejar el nuevo asiento
      // Debes encontrar la fila correcta y agregar el asiento
    });
  };

  return (
    <div>
      {theater.sectors.map(sector => (
        <div key={sector.id}>
          <h2>Sector {sector.name}</h2>
          {sector.rows.map(row => (
            <div key={row.id}>
              <h3>Fila {row.number}</h3>
              {row.seats.map(seat => (
                <span key={seat.id}>{seat.number} </span>
              ))}
              <button onClick={() => handleAddSeat(row.id)}>Agregar Asiento</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatConfiguration;
