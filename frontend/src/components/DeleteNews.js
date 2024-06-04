import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteNews } from '../services/apiNewsService';
import './styles/DeleteNews.css';

const DeleteNews = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteNews(newsId);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="delete-news-container">
      <h2>Confirmar Eliminación</h2>
      <p>¿Estás seguro de que deseas eliminar este newso?</p>
      <div className="delete-news-actions">
        <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
        <button onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteNews;
