import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNews } from '../services/apiNewsService';
import './styles/CreateNews.css'; // Asegúrate de crear este archivo para los estilos

const CreateNews = () => {
  const [news, setNews] = useState({ title: '', content: '', image: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNews(news);
      navigate('/');
    } catch (error) {
      console.error('Error creating news:', error);
    }
  };

  return (
    <div className="create-news-container">
      <h2>Crear Noticia</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={news.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenido</label>
          <textarea
            id="content"
            name="content"
            value={news.content}
            onChange={handleChange}
            className="form-control"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">URL de la Imagen</label>
          <input
            type="text"
            id="image"
            name="image"
            value={news.image}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Noticia</button>
      </form>
    </div>
  );
};

export default CreateNews;
