import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link aquí
import { fetchPerformances, deletePerformance, updatePerformance } from '../services/apiPerformanceService';
import './PerformanceList.css';

const PerformanceList = () => {
  const [performances, setPerformances] = useState([]);
  const [editingPerformanceId, setEditingPerformanceId] = useState(null);
  const [editedPerformance, setEditedPerformance] = useState({ name: '', price: '' });

  useEffect(() => {
    const getPerformances = async () => {
      const response = await fetchPerformances();
      setPerformances(response.data);
    };
    getPerformances();
  }, []);

  const handleDelete = async (id) => {
    await deletePerformance(id);
    setPerformances(performances.filter(performance => performance.id !== id));
  };

  const handleEdit = (performance) => {
    setEditingPerformanceId(performance.id);
    setEditedPerformance({ name: performance.name, price: performance.price });
  };

  const handleSave = async () => {
    await updatePerformance(editingPerformanceId, editedPerformance);
    setPerformances(performances.map(performance => {
      if (performance.id === editingPerformanceId) {
        return { ...performance, name: editedPerformance.name, price: editedPerformance.price };
      }
      return performance;
    }));
    setEditingPerformanceId(null);
  };

  return (
    <div className="performance-list-container">
      {performances.map(performance => (
        <div key={performance.id} className="performance-item">
          <div className="performance-image-container">
            <img src={performance.image} alt={performance.name} className="performance-image" />
          </div>
          <div className="performance-details">
            <Link to={`/performances/${performance.id}`} className="performance-name">
              {performance.title}
            </Link>
            <p className="performance_date">{new Date(performance.performance_date).toLocaleDateString()}</p>
            <p className="performance_hour">{new Date(performance.performance_date).toLocaleTimeString()}</p>
            <div className="performance-actions">
              <button className="edit-button">✏️</button>
              <button className="delete-button">🗑️</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceList;
