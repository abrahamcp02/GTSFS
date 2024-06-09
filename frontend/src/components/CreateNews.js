import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNews } from '../services/apiNewsService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles/CreateNews.css';

const CreateNews = () => {
  const [news, setNews] = useState({ title: '', content: '', image: '' });
  const navigate = useNavigate();

  const handleChange = (name, value) => {
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
            onChange={(e) => handleChange('title', e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenido</label>
          <ReactQuill
            value={news.content}
            onChange={(value) => handleChange('content', value)}
            className="form-control"
            theme="snow"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL de la Imagen</label>
          <input
            type="text"
            id="image"
            name="image"
            value={news.image}
            onChange={(e) => handleChange('image', e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Noticia</button>
      </form>
    </div>
  );
};

export default CreateNews;
