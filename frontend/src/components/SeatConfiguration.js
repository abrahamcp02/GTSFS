import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRowsByTheaterId, createSeat, createRow, deleteSeat, deleteRow } from '../services/apiSeatService';
import './SeatConfiguration.css';

const SeatConfiguration = () => {
  const { theaterId } = useParams();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchRows();
  }, [theaterId]);

  const fetchRows = async () => {
    if (!theaterId) return;
    try {
      const response = await getRowsByTheaterId(theaterId);
      const fetchedRows = response.data || [];
      console.log('Fetched rows:', fetchedRows);
      const mappedRows = fetchedRows.map(row => ({
        id: row.id,
        number: row.row_number, // Cambiar row_number a number
        seats: (row.seats || []).map(seat => ({
          id: seat.id,
          number: seat.number, // Asegurarse de que estamos usando la propiedad correcta
          row_id: seat.row_id,
          theater_id: seat.theater_id,
          category: seat.category,
          is_reserved: seat.is_reserved
        })).sort((a, b) => a.number - b.number) // Ordenar asientos por número
      })).sort((a, b) => a.number - b.number); // Ordenar filas por número
      setRows(mappedRows);
    } catch (error) {
      console.error('Failed to fetch rows:', error);
      setRows([]);
    }
  };

  const handleAddRow = async () => {
    try {
      const response = await createRow(theaterId, { number: rows.length + 1 });
      const newRow = response.data;
      console.log('New row:', newRow);
      setRows(prevRows => [...prevRows, { ...newRow, seats: [] }]);
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const handleAddSeat = async (rowId) => {
    try {
      const row = rows.find(row => row.id === rowId);
      if (row) {
        const seatNumber = row.seats.length + 1;
        console.log(`Creating seat for row ${rowId} with number ${seatNumber}`);
        const response = await createSeat(rowId, { number: seatNumber });
        const newSeat = response.data;
        console.log('New seat:', newSeat);
        const updatedRows = rows.map(row =>
          row.id === rowId ? { ...row, seats: [...row.seats, newSeat].sort((a, b) => a.number - b.number) } : row
        );
        setRows(updatedRows);
      }
    } catch (error) {
      console.error('Error adding seat:', error);
    }
  };

  const handleDeleteRow = async (rowId) => {
    try {
      await deleteRow(rowId);
      setRows(rows.filter(row => row.id !== rowId));
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const handleDeleteSeat = async (rowId, seatId) => {
    try {
      await deleteSeat(seatId);
      const updatedRows = rows.map(row =>
        row.id === rowId ? { ...row, seats: row.seats.filter(seat => seat.id !== seatId).sort((a, b) => a.number - b.number) } : row
      );
      setRows(updatedRows);
    } catch (error) {
      console.error('Error deleting seat:', error);
    }
  };

  return (
    <div>
      <button onClick={handleAddRow}>Añadir Fila</button>
      {rows.length > 0 ? (
        rows.map(row => {
          if (!row.id || !row.number) {
            console.warn('Row without valid id or number:', row);
            return null; // Skip rendering this row if it doesn't have a valid id or number
          }
          console.log(`Rendering row: ${row.id} with number ${row.number}`);
          return (
            <div key={row.id} className="row-container">
              <div className="seat-container">
                <h5>Fila {row.number}</h5>
                {row.seats.map(seat => {
                  if (!seat.id || !seat.number) {
                    console.warn('Seat without valid id or number:', seat);
                    return null; // Skip rendering this seat if it doesn't have a valid id or number
                  }
                  console.log(`Rendering seat: ${seat.id} with number ${seat.number} in row ${row.id}`);
                  return (
                    <div key={seat.id} className="seat">
                      <div>{seat.number}</div>
                      <button onClick={() => handleDeleteSeat(row.id, seat.id)}>🗑️</button>
                    </div>
                  );
                })}
              </div>
              <div className="button-container">
                <button onClick={() => handleAddSeat(row.id)}>+</button>
                <button onClick={() => handleDeleteRow(row.id)}>🗑️</button>
              </div>
            </div>
          );
        })
      ) : (
        <div>No hay filas para mostrar.</div>
      )}
    </div>
  );
};

export default SeatConfiguration;
