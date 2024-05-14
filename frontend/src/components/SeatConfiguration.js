import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRowsByTheaterId, createSeat, createRow, deleteSeat, deleteRow } from '../services/apiSeatService';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
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
        number: row.row_number,
        seats: (row.seats || []).map(seat => ({
          id: seat.id,
          number: seat.number,
          row_id: seat.row_id,
          theater_id: seat.theater_id,
          category: seat.category,
          is_reserved: seat.is_reserved
        })).sort((a, b) => a.number - b.number)
      })).sort((a, b) => a.number - b.number);
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
    <Container className="mt-4">
      <Button variant="primary" onClick={handleAddRow} className="mb-3">Añadir Fila</Button>
      {rows.length > 0 ? (
        rows.map(row => {
          if (!row.id || !row.number) {
            console.warn('Row without valid id or number:', row);
            return null;
          }
          return (
            <Card key={row.id} className="mb-3">
              <Card.Body>
                <Card.Title>Fila {row.number}</Card.Title>
                <Row className="seat-container mb-3">
                  {row.seats.map(seat => {
                    if (!seat.id || !seat.number) {
                      console.warn('Seat without valid id or number:', seat);
                      return null;
                    }
                    return (
                      <Col key={seat.id} xs="auto" className="mb-2">
                        <div className="seat">
                          {seat.number}
                          <Button
                            variant="white"
                            size="sm"
                            className="ms-2"
                            onClick={() => handleDeleteSeat(row.id, seat.id)}
                          >
                            🗑️
                          </Button>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
                <Button variant="success" onClick={() => handleAddSeat(row.id)} className="me-2">Añadir Asiento</Button>
                <Button variant="danger" onClick={() => handleDeleteRow(row.id)}>Eliminar Fila</Button>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <p>No hay filas para mostrar.</p>
      )}
    </Container>
  );
};

export default SeatConfiguration;
