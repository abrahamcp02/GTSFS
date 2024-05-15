import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPerformances, deletePerformance, updatePerformance } from '../services/apiPerformanceService';
import { jwtDecode } from 'jwt-decode';
import './PerformanceList.css';

const PerformanceList = () => {
  const [performances, setPerformances] = useState([]);
  const navigate = useNavigate();
  let role;

  useEffect(() => {
    const getPerformances = async () => {
      const response = await fetchPerformances();
      setPerformances(response.data);
    };
    getPerformances();
  }, []);

  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  const handleDelete = async (id) => {
    await deletePerformance(id);
    setPerformances(performances.filter(performance => performance.id !== id));
  };

  const handleEdit = (performance) => {
    navigate(`/edit-performance/${performance.id}`);
  };

  return (
    <div className="performance-list-container">
      {role === "admin" && (
        <div className="create-performance-button-container">
          <button
            className="btn btn-success"
            onClick={() => navigate('/create-performance')}
          >
            Crear Representación
          </button>
        </div>
      )}
      {performances.map(performance => (
        <div key={performance.id} className="performance-item">
          <div className="performance-image-container">
            <img src={performance.image} alt={performance.name} className="performance-image" />
          </div>
          <div className="performance-details">
            <Link to={`/performances/${performance.id}`} className="performance-name">
              {performance.title}
            </Link>
            <p className="performance-date">{new Date(performance.performance_date).toLocaleDateString()}</p>
            <p className="performance-hour">{new Date(performance.performance_date).toLocaleTimeString()}</p>
            {role === "admin" && (
              <div className="performance-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(performance)}
                >
                  ✏️
                </button>
                <button
                  className="delete-button"
                  onClick={() => navigate(`/delete-performance/${performance.id}`)}
                >
                  🗑️
                </button>
                <Link className="nav-link" to={`/configure-seat-prices/${performance.id}/${performance.theater_id}`}>💲</Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceList;
