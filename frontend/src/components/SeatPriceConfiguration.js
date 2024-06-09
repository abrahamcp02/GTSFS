import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRowsByTheaterId } from '../services/apiSeatService';
import { getPricesByPerformanceId, createOrUpdateSeatPrice } from '../services/apiSeatPriceService';
import ProcessingPopup from './ProcessingWindow';
import './styles/SeatPriceConfiguration.css';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const SeatPriceConfiguration = () => {
  const { performanceId, theaterId } = useParams();
  const [rows, setRows] = useState([]);
  const [rowPrices, setRowPrices] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [allSeatsPrice, setAllSeatsPrice] = useState('');

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

      rows.forEach(row => {
        row.seats = row.seats || [];
        row.number = row.row_number || row.number || 'Sin número';
      });

      rows.forEach(row => {
        row.seats.forEach(seat => {
          const priceInfo = prices.find(price => price.seat_id === seat.id);
          seat.price = priceInfo ? priceInfo.price : 0;
        });
      });

      setRows(rows);
    } catch (error) {
      console.error('Error fetching rows or prices:', error);
    }
  };

  const handleUpdateSeatPrice = async (seatId, price) => {
    const parsedPrice = parseFloat(price) || 0;
    setIsProcessing(true);
    setProcessingMessage('Actualizando precio del asiento...');
    try {
      await createOrUpdateSeatPrice(seatId, performanceId, parsedPrice);
      const updatedRows = rows.map(row => ({
        ...row,
        seats: row.seats.map(seat => seat.id === seatId ? { ...seat, price: parsedPrice } : seat)
      }));
      setRows(updatedRows);
    } catch (error) {
      console.error('Error updating seat price:', error);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);
    }
  };

  const handleUpdateRowPrices = async (rowId, price) => {
    const parsedPrice = parseFloat(price) || 0;
    setIsProcessing(true);
    setProcessingMessage('Actualizando precios de la fila...');
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
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);
    }
  };

  const handleRowPriceChange = (rowId, price) => {
    setRowPrices(prevPrices => ({ ...prevPrices, [rowId]: price }));
  };

  const handleUpdateAllPrices = async (price) => {
    const parsedPrice = parseFloat(price) || 0;
    setIsProcessing(true);
    setProcessingMessage('Actualizando precios de todos los asientos...');
    try {
      const updatePromises = [];
      rows.forEach(row => {
        row.seats.forEach(seat => {
          updatePromises.push(createOrUpdateSeatPrice(seat.id, performanceId, parsedPrice));
        });
      });
      await Promise.all(updatePromises);

      const updatedRows = rows.map(row => ({
        ...row,
        seats: row.seats.map(seat => ({ ...seat, price: parsedPrice }))
      }));
      setRows(updatedRows);
    } catch (error) {
      console.error('Error updating all seat prices:', error);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);
    }
  };

  return (
    <Container>
      <Form.Group className="d-flex justify-content-between mb-4">
        <Form.Control
          type="number"
          placeholder="Asignar precio a todos los asientos"
          value={allSeatsPrice}
          onChange={(e) => setAllSeatsPrice(e.target.value)}
          onBlur={(e) => handleUpdateAllPrices(e.target.value)}
        />
        <Button variant="primary" onClick={() => handleUpdateAllPrices(allSeatsPrice)}>
          Asignar a todos
        </Button>
      </Form.Group>
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
                          value={seat.price || 0}
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
      {isProcessing && <ProcessingPopup message={processingMessage} />}
    </Container>
  );
};

export default SeatPriceConfiguration;
