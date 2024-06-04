import React, { useState, useEffect } from 'react';
import { getTheaters, createTheater } from '../services/apiTheaterService';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Dropdown, DropdownButton, Container, Row, Col, Alert } from 'react-bootstrap';
import './styles/TheaterSelection.css';

const TheaterSelection = () => {
  const [theaters, setTheaters] = useState([]);
  const [newTheaterName, setNewTheaterName] = useState('');
  const [newTheaterAddress, setNewTheaterAddress] = useState('');
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      const response = await getTheaters();
      setTheaters(response.data);
    } catch (error) {
      console.error('Failed to fetch theaters:', error);
    }
  };

  const handleSelectTheater = (theaterId) => {
    navigate(`/configure-seats/${theaterId}`);
  };

  const handleCreateTheater = async () => {
    try {
      const response = await createTheater({ name: newTheaterName, address: newTheaterAddress });
      const newTheater = response.data;
      navigate(`/configure-seats/${newTheater.id}`);
    } catch (error) {
      console.error('Failed to create theater:', error);
      setShowAlert(true);
    }
  };

  return (
    <Container className="theater-selection-container">
      <h2 className="text-center my-4">Editar o Crear Teatro</h2>

      {showAlert && <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        Error al crear el teatro. Por favor, inténtelo de nuevo.
      </Alert>}

      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <h3>Editar Teatro</h3>
          <DropdownButton
            id="dropdown-basic-button"
            title={selectedTheater ? selectedTheater.name : "Teatros"}
            onSelect={(eventKey) => {
              const theater = theaters.find(t => t.id.toString() === eventKey);
              setSelectedTheater(theater);
              handleSelectTheater(theater.id);
            }}
          >
            {theaters.map(theater => (
              <Dropdown.Item key={theater.id} eventKey={theater.id.toString()}>
                {theater.name} ({theater.address})
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <h3>Crear Nuevo Teatro</h3>
          <Form>
            <Form.Group controlId="formTheaterName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nombre del Teatro"
                value={newTheaterName}
                onChange={(e) => setNewTheaterName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formTheaterAddress" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Dirección del Teatro"
                value={newTheaterAddress}
                onChange={(e) => setNewTheaterAddress(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleCreateTheater}>
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TheaterSelection;
