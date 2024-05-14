import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRowsByTheaterId } from '../services/apiSeatService';
import { getPricesByPerformanceId, createOrUpdateSeatPrice } from '../services/apiSeatPriceService';
import './SeatPriceConfiguration.css';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const SeatPriceConfiguration = () => {
  const { performanceId, theaterId } = useParams();
  const [rows, setRows] = useState([]);
  const [rowPrices, setRowPrices] = useState({});

  useEffect(() => {
    fetchRowsAndPrices();
  }, [performanceId, theaterId]);

  const fetchRowsAndPrices = async () => {
    try {
      const [rowsResponse, pricesResponse] = await Promise.all([
        getRowsByTheaterId(theaterId),
        getPricesByPerformanceId(performanceId)
      ]);

      const rows = Array.isArray(rowsResponse.data) ? rowsResponse.data : [];
      const prices = Array.isArray(pricesResponse) ? pricesResponse : [];

      // Ensure each row has a seats array and a number
      rows.forEach(row => {
        row.seats = row.seats || [];
        row.number = row.row_number || row.number || 'Sin número'; // Añadir una asignación de número
      });

      // Merge seat prices into rows
      rows.forEach(row => {
        row.seats.forEach(seat => {
          const priceInfo = prices.find(price => price.seat_id === seat.id);
          seat.price = priceInfo ? priceInfo.price : 0; // Set price to 0 if not assigned
        });
      });

      setRows(rows);
    } catch (error) {
      console.error('Error fetching rows or prices:', error);
    }
  };

  const handleUpdateSeatPrice = async (seatId, price) => {
    const parsedPrice = parseFloat(price) || 0;
    try {
      await createOrUpdateSeatPrice(seatId, performanceId, parsedPrice);
      const updatedRows = rows.map(row => ({
        ...row,
        seats: row.seats.map(seat => seat.id === seatId ? { ...seat, price: parsedPrice } : seat)
      }));
      setRows(updatedRows);
    } catch (error) {
      console.error('Error updating seat price:', error);
    }
  };

  const handleUpdateRowPrices = async (rowId, price) => {
    const parsedPrice = parseFloat(price) || 0;
    try {
      const row = rows.find(row => row.id === rowId);
      if (row) {
        const updatePromises = row.seats.map(seat => createOrUpdateSeatPrice(seat.id, performanceId, parsedPrice));
        await Promise.all(updatePromises);

        const updatedRows = rows.map(row => 
          row.id === rowId 
            ? { ...row, seats: row.seats.map(seat => ({ ...seat, price: parsedPrice })) }
            : row
        );
        setRows(updatedRows);
        setRowPrices(prevPrices => ({ ...prevPrices, [rowId]: parsedPrice }));
      }
    } catch (error) {
      console.error('Error updating row prices:', error);
    }
  };

  const handleRowPriceChange = (rowId, price) => {
    setRowPrices(prevPrices => ({ ...prevPrices, [rowId]: price }));
  };

  return (
    <Container>
      {rows.length > 0 ? (
        rows.map(row => (
          <Card key={row.id} className="mb-4">
            <Card.Body>
              <Card.Title>Fila {row.number}</Card.Title>
              <Row className="mb-3">
                {row.seats.map(seat => (
                  <Col key={seat.id} xs={6} sm={4} md={3} lg={2}>
                    <Card className="mb-2">
                      <Card.Body>
                        <Card.Text>Asiento {seat.number}</Card.Text>
                        <Form.Control
                          type="number"
                          value={seat.price || 0}  // Ensure value is never undefined
                          onChange={(e) => handleUpdateSeatPrice(seat.id, e.target.value)}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Form.Group className="d-flex justify-content-between">
                <Form.Control
                  type="number"
                  placeholder="Asignar precio a la fila"
                  value={rowPrices[row.id] || ''}
                  onChange={(e) => handleRowPriceChange(row.id, e.target.value)}
                  onBlur={(e) => handleUpdateRowPrices(row.id, e.target.value)}
                />
                <Button variant="primary" onClick={() => handleUpdateRowPrices(row.id, rowPrices[row.id] || 0)}>
                  Asignar
                </Button>
              </Form.Group>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div>No hay filas para mostrar.</div>
      )}
    </Container>
  );
};

export default SeatPriceConfiguration;
