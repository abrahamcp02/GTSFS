import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPerformanceById, updatePerformance } from '../services/apiPerformanceService';
import { getTheaters } from '../services/apiTheaterService';
import './styles/EditPerformance.css';

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
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { performanceId } = useParams();

  useEffect(() => {
    const getPerformance = async () => {
      try {
        const response = await fetchPerformanceById(performanceId);
        if (response.data && response.data.length > 0) {
          const performanceData = response.data[0];
          const performanceDate = new Date(performanceData.performance_date).toISOString().slice(0, 16);
          setPerformance({ ...performanceData, performance_date: performanceDate });
        }
      } catch (error) {
        console.error('Error fetching performance:', error);
      } finally {
        setLoading(false);
      }
    };

    const getTheater = async () => {
      try {
        const response = await getTheaters();
        setTheaters(response.data);
      } catch (error) {
        console.error('Error fetching theaters:', error);
      }
    };

    if (performanceId) {
      getPerformance();
      getTheater();
    }
  }, [performanceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerformance({ ...performance, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePerformance(performanceId, performance);
      navigate('/performances');
    } catch (error) {
      console.error('Error updating performance:', error);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

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
