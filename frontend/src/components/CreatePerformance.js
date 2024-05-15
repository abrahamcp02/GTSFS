import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPerformance } from '../services/apiPerformanceService';
import { getTheaters } from '../services/apiTheaterService';
import './CreatePerformance.css';

const CreatePerformance = () => {
  const [performance, setPerformance] = useState({
    title: '',
    performance_date: '',
    image: '',
    description: ''
  });
  const [theaters, setTheaters] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getTheater = async () => {
      const response = await getTheaters();
      setTheaters(response.data);
    };
    getTheater();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerformance({ ...performance, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPerformance(performance);
    navigate('/performances');
  };

  return (
    <div className="create-performance-container">
      <h2>Crear Representación</h2>
      <form onSubmit={handleSubmit} className="create-performance-form">
      <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={performance.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha y Hora</label>
          <input
            type="datetime-local"
            name="performance_date"
            value={performance.performance_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Imagen</label>
          <input
            type="text"
            name="image"
            value={performance.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Video</label>
          <input
            type="text"
            name="video"
            value={performance.video}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={performance.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Teatro</label>
          <select
            name="theater_id"
            value={performance.theater_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un teatro</option>
            {theaters.map(theater => (
              <option key={theater.id} value={theater.id}>{theater.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success">Crear</button>
      </form>
    </div>
  );
};

export default CreatePerformance;
