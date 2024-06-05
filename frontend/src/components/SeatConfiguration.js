import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRowsByTheaterId, createSeat, createRow, deleteSeat, deleteRow } from '../services/apiSeatService';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import ProcessingPopup from './ProcessingWindow';
import './styles/SeatConfiguration.css';

const SeatConfiguration = () => {
  const { theaterId } = useParams();
  const [rows, setRows] = useState([]);
  const [numRowsToAdd, setNumRowsToAdd] = useState(1);
  const [numSeatsToAdd, setNumSeatsToAdd] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');

  useEffect(() => {
    fetchRows();
  }, [theaterId]);

  const fetchRows = async () => {
    if (!theaterId) return;
    try {
      const response = await getRowsByTheaterId(theaterId);
      const fetchedRows = response.data || [];
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

  const handleAddRows = async () => {
    if (isNaN(numRowsToAdd) || numRowsToAdd <= 0) {
      console.error('Invalid number of rows to add');
      return;
    }
    setIsProcessing(true);
    setProcessingMessage('Añadiendo filas...');
    try {
      const newRows = [];
      for (let i = 0; i < numRowsToAdd; i++) {
        const response = await createRow(theaterId, { number: rows.length + 1 + i });
        const newRow = response.data;
        newRows.push({ ...newRow, seats: [] });
      }
      setRows(prevRows => [...prevRows, ...newRows]);
    } catch (error) {
      console.error('Error adding rows:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddSeats = async (rowId) => {
    if (isNaN(numSeatsToAdd) || numSeatsToAdd <= 0) {
      console.error('Invalid number of seats to add');
      return;
    }
    setIsProcessing(true);
    setProcessingMessage('Añadiendo asientos...');
    try {
      const row = rows.find(row => row.id === rowId);
      if (row) {
        const newSeats = [];
        for (let i = 0; i < numSeatsToAdd; i++) {
          const seatNumber = row.seats.length + 1 + i;
          const response = await createSeat(rowId, { number: seatNumber });
          const newSeat = response.data;
          newSeats.push(newSeat);
        }
        const updatedRows = rows.map(row =>
          row.id === rowId ? { ...row, seats: [...row.seats, ...newSeats].sort((a, b) => a.number - b.number) } : row
        );
        setRows(updatedRows);
      }
    } catch (error) {
      console.error('Error adding seats:', error);
    } finally {
      setIsProcessing(false);
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
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>Número de filas a crear:</Form.Label>
        <Col sm={2}>
          <Form.Control
            type="number"
            value={numRowsToAdd}
            onChange={(e) => setNumRowsToAdd(parseInt(e.target.value, 10) || 1)}
            min="1"
          />
        </Col>
        <Col sm={2}>
          <Button variant="primary" onClick={handleAddRows}>Añadir Filas</Button>
        </Col>
      </Form.Group>
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
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2}>Número de asientos a crear:</Form.Label>
                  <Col sm={2}>
                    <Form.Control
                      type="number"
                      value={numSeatsToAdd}
                      onChange={(e) => setNumSeatsToAdd(parseInt(e.target.value, 10) || 1)}
                      min="1"
                    />
                  </Col>
                  <Col sm={2}>
                    <Button variant="success" onClick={() => handleAddSeats(row.id)}>Añadir Asientos</Button>
                  </Col>
                </Form.Group>
                <Button variant="danger" onClick={() => handleDeleteRow(row.id)}>Eliminar Fila</Button>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <p>No hay filas para mostrar.</p>
      )}
      {isProcessing && <ProcessingPopup show={isProcessing} message={processingMessage} />}
    </Container>
  );
};

export default SeatConfiguration;
