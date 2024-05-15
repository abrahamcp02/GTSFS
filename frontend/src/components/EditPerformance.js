import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPerformanceById, updatePerformance } from '../services/apiPerformanceService';
import { getTheaters } from '../services/apiTheaterService';
import './EditPerformance.css';

const EditPerformance = () => {
  const [performance, setPerformance] = useState({
    title: '',
    performance_date: '',
    performance_time: '',
    image: '',
    description: '',
    theater_id: ''
  });
  const [theaters, setTheaters] = useState([]);

  const navigate = useNavigate();
  const { performanceId } = useParams();

  useEffect(() => {
    const getPerformance = async () => {
      const response = await fetchPerformanceById(performanceId);
      setPerformance(response.data);
    };

    const getTheater = async () => {
      const response = await getTheaters();
      setTheaters(response.data);
    };

    getPerformance();
    getTheater();
  }, [performanceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerformance({ ...performance, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePerformance(performanceId, performance);
    navigate('/performances');
  };

  return (
    <div className="edit-performance-container">
      <h2>Editar Representación</h2>
      <form onSubmit={handleSubmit} className="edit-performance-form">
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
        <button type="submit" className="btn btn-success">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditPerformance;
